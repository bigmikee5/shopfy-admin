document.addEventListener("DOMContentLoaded", function () {
  // Section 1: Notification and Collection Handling
  const notificationBell = document.querySelector(".notification-bell");
  const accountInfo = document.querySelector(".account");
  const notifications = document.querySelector(".alert");
  const collectionDiv = document.querySelector(".collection");

  notificationBell.addEventListener("click", function () {
    notifications.classList.toggle("show");
    collectionDiv.classList.remove("show");
  });

  accountInfo.addEventListener("click", function () {
    collectionDiv.classList.toggle("show");
    notifications.classList.remove("show");
  });

  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".notification-bell") &&
      !event.target.closest(".account")
    ) {
      notifications.classList.remove("show");
      collectionDiv.classList.remove("show");
    }
  });

  // Section 2: Plan, Arrow, and Bottom Container Handling
  let closePlan = document.querySelector(".close");
  let plan = document.querySelector(".plan");
  let arrowUpButton = document.querySelector(".arrow-up");
  let arrowDownButton = document.querySelector(".arrow-down");
  let bottomContainer = document.querySelector(".bottom-container");

  closePlan.addEventListener("click", function () {
    plan.style.display = "none";
  });

  arrowDownButton.addEventListener("click", toggleBottomContainer);
  arrowUpButton.addEventListener("click", toggleBottomContainer);

  function toggleBottomContainer() {
    bottomContainer.style.display =
      bottomContainer.style.display === "block" ||
      bottomContainer.style.display === ""
        ? "none"
        : "block";

    arrowDownButton.style.display =
      arrowDownButton.style.display === "block" ? "none" : "block";
    arrowUpButton.style.display =
      arrowUpButton.style.display === "block" ? "none" : "block";
  }

  // Section 3: Guides and Progress Handling
  let guides = document.querySelectorAll(".guides");
  let hide = document.querySelectorAll(".hide");
  let show = document.querySelectorAll(".show");
  let checkedElements = document.querySelectorAll(".checked");
  let progressBar = document.getElementById("progress-bar");
  let progressText = document.querySelector(".progress-section p span");
  let completeText = document.getElementById("completeText");

  let totalGuides = checkedElements.length;
  let currentProgress = 0;

  progressText.textContent = `${currentProgress}/${totalGuides}`;

  guides.forEach(function (guide, index) {
    guide.addEventListener("click", function () {
      resetGuidesAndContents();
      setClickedGuideState(guide, index);
    });

    if (index === 0) {
      setClickedGuideState(guide, index);
    }
  });

  checkedElements.forEach(function (checkedElement) {
    checkedElement.addEventListener("click", function () {
      toggleProgressState(checkedElement);
    });

    if (
      checkedElement.querySelector(".guide-circle").style.display === "none"
    ) {
      currentProgress++;
    }
  });

  function resetGuidesAndContents() {
    guides.forEach(function (otherGuide) {
      otherGuide.classList.remove("active-content");
      otherGuide.classList.add("content");

      hide.forEach(function (content) {
        content.classList.remove("show");
        content.classList.add("hide");
      });
    });
  }

  function setClickedGuideState(clickedGuide, clickedIndex) {
    clickedGuide.classList.add("active-content");
    clickedGuide.classList.remove("content");

    let clickedHide = clickedGuide.querySelectorAll(".hide");
    clickedHide.forEach(function (content) {
      content.classList.remove("hide");
      content.classList.add("show");
    });

    guides.forEach(function (otherGuide, otherIndex) {
      if (otherIndex !== clickedIndex) {
        let otherShow = otherGuide.querySelectorAll(".show");
        otherShow.forEach(function (content) {
          content.classList.remove("show");
          content.classList.add("hide");
        });
      }
    });
  }

  function toggleProgressState(checkedElement) {
    let guideCircle = checkedElement.querySelector(".guide-circle");
    let selectedSvg = checkedElement.querySelector(".selected");
    let loadingSvg = checkedElement.querySelector(".loading");

    if (
      guideCircle.style.display === "block" ||
      guideCircle.style.display === ""
    ) {
      loadingSvg.style.display = "block";
      guideCircle.style.display = "none";

      setTimeout(function () {
        loadingSvg.style.display = "none";
        selectedSvg.style.display = "block";

        currentProgress++;

        let progressWidth = (currentProgress / totalGuides) * 100;
        progressBar.style.width = progressWidth + "%";

        progressText.textContent =
          currentProgress === totalGuides
            ? "Done"
            : `${currentProgress}/${totalGuides}`;

        completeText.style.display =
          currentProgress === totalGuides ? "none" : "inline";
      }, 500);
    } else {
      guideCircle.style.display = "block";
      selectedSvg.style.display = "none";

      currentProgress--;
      currentProgress = Math.max(currentProgress, 0);

      let progressWidth = (currentProgress / totalGuides) * 100;
      progressBar.style.width = progressWidth + "%";

      progressText.textContent =
        currentProgress === totalGuides
          ? "Done"
          : `${currentProgress}/${totalGuides}`;

      completeText.style.display =
        currentProgress === totalGuides ? "none" : "inline";
    }
  }
});
