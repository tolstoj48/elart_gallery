"use strict";

// Main and single self-invoking function
function mainGallery() {
  function oneColumn() {
    for (let i = 0; i < document.getElementsByClassName("col").length; i++) {
      let element = document.getElementsByClassName("col")[i];
      element.style.display = "block";
      element.style.flex = "50%";
      element.style.maxWidth = "50%";
    }
  }

  // Showing images in the main gallery based on specific category
function showHideImages() {
  const category = document.getElementsByClassName("active_galerie")[0].innerHTML;
  for (let i = 0; i < document.getElementsByTagName("img").length; i++) {
    let image = document.getElementsByTagName("img")[i];
    if (category == "Všechny kategorie") {
      image.parentNode.classList.add("show");
      image.parentNode.classList.remove("hide");
    } else if (!image.classList.contains(category)) {
      image.parentNode.classList.add("hide");
      image.parentNode.classList.remove("show");
    } else {
      image.parentNode.classList.add("show");
      image.parentNode.classList.remove("hide");
      oneColumn();
    }
  }
}

// Setting the flag of active gallery after the category link clicked
function setActiveGalleryAndButton(event) {
  document.getElementsByClassName("active_galerie")[0].classList.remove("active_galerie");
  event.target.classList.add("active_galerie");
  showHideImages();
}

// Returns the index of image node in the passed nodelist
function getIndexOfImg(image, array) {
  for (let i = 0; i < array.length; i ++) {
    if (array[i].alt == image.alt) {
      return i;
    }
  }
}

  // Switching image information div
function infoSwitch() {
  document.querySelector(".info_about_img").remove();
  let newInfoDiv = createElement(
    "div",
    "i",
    ["info_about_img"],
    []
  );
  let wrapper = document.getElementById("inner_img_wrapper");
  wrapper.appendChild(newInfoDiv);
  addListenerImgInfo();
}

// Switches detail view image backward or forward depending of the actual value of "where" parameter
function switchImg(where) {
  let arrayAllImgs = document.querySelectorAll(".show img");
  let toBeReplacedImg = document.querySelector("#inner_img_wrapper img");
  let index = getIndexOfImg(toBeReplacedImg, arrayAllImgs);
  let newImg;
  // If back image switch button pressed
  if (where == "back") {
    if (index > 0) {
      newImg = arrayAllImgs[index - 1].cloneNode(true);
      toBeReplacedImg.parentNode.replaceChild(newImg, toBeReplacedImg);
      document.querySelector("#inner_img_wrapper img").classList.add("window_gallery_img");
      document.querySelector(".info").innerHTML = index + " / " + arrayAllImgs.length;
    };
  // If forward image switch button pressed
  } else {
    if (index < arrayAllImgs.length - 1) {
      newImg = arrayAllImgs[index + 1].cloneNode(true);
      toBeReplacedImg.parentNode.replaceChild(newImg, toBeReplacedImg);
      document.querySelector("#inner_img_wrapper img").classList.add("window_gallery_img");
      document.querySelector(".info").innerHTML = (index + 2) + " / " + arrayAllImgs.length;
    }
  }
  // Switching image information div
  infoSwitch();
}

// Function to handle keypresses on detail of an image in the gallery
const changeImageWithKeyPress = function (e) {
  switch (e.keyCode) {
    case 37:
      switchImg("back");
      break;
    case 39:
      switchImg("forward");
      break;
    case 27:
      toggleDetail();
      break;
  }
}

// Creating the elements of the detail of an image in gallery
function createElement(elementTag, textContent, classesToAdd, listenersToAdd) {
  let element = document.createElement(elementTag);
  element.innerHTML = textContent;
  for (let i = 0; i < classesToAdd.length; i ++) {
    element.classList.add(classesToAdd[i]);
  };
  if (listenersToAdd.length){
  element.addEventListener(listenersToAdd[0], listenersToAdd
    [1]);
  window.addEventListener("keydown", changeImageWithKeyPress);
  };
  return element;
}

// Adds all the controls to the detail view of the gallery, except for the close cross
function addControlsGallery(wrapper, imgForGettingNumber) {
  let containerControls;
  let myButtonBack;
  let numberOfImg;
  let myButtonForward;
  let detailOfImg;
  let wrapperOfImgAndControls = document.querySelector("#detail_img");
  let arrayAllImgs = document.querySelectorAll(".show img");
  let positionOfImg;
  // Back button
  myButtonBack = createElement(
    "div", 
    "<", 
    ["window_gallery_btn", "pointer"],
    ["click", function () {switchImg("back")}]
  );
  // Position of detailed image in the current gallery
  positionOfImg = getIndexOfImg(imgForGettingNumber, arrayAllImgs);
  // Info about the position of detailed image
  numberOfImg = createElement(
    "div", 
    (positionOfImg + 1) + " / " + arrayAllImgs.length,
    ["window_gallery_btn", "info"],
    []
  );
  // Forward button
  myButtonForward = createElement(
    "div", 
    ">",
    ["window_gallery_btn", "pointer"],
    ["click", function () {switchImg("forward")}]
  );
  // Info about the name of the current img
  detailOfImg = createElement(
    "div",
    "i",
    ["info_about_img"],
    []
  );
  // Controls container
  containerControls = createElement(
    "div",
    "",
    ["container_controls"],
    []
  );
  containerControls.appendChild(myButtonBack);
  containerControls.appendChild(numberOfImg);
  containerControls.appendChild(myButtonForward);
  wrapper.appendChild(detailOfImg);
  wrapperOfImgAndControls.appendChild(containerControls);
}

// Adds listener to "i" - info div for the display of name of the image on the detail
function addListenerImgInfo() {
  document.querySelector(".info_about_img").addEventListener("click", (e) => {
    e.target.innerHTML = document.querySelector(".window_gallery_img").name;
    e.target.style.margin= "0 2% 0 2%";
    e.target.style.width="96%";
  })
  document.querySelector("#inner_img_wrapper").addEventListener("mouseleave", (e) => {
    let infoAboutImg = document.querySelector(".info_about_img");
    infoAboutImg.innerHTML = "i";
    infoAboutImg.style.margin= "0 2% 0 90%";
    infoAboutImg.style.width="";
  })
}

// Adds the toggling of the detail view of an image clicked in the gallery 
function toggleDetail() {
  if (window.matchMedia("(min-width: 200px)").matches) {
    let detailImg = document.getElementById("detail");
    let wrapper = document.getElementById("inner_img_wrapper");
    let wrapperOfImgAndControls = document.getElementById("detail_img");
    if (!detailImg.classList.contains("active")) {
      let clone = this.childNodes[1].cloneNode(true);
      clone.classList.add("window_gallery_img");
      if (!wrapper) {
        wrapper = createElement(
          "div",
          "",
          [],
          []
        );
        wrapper.id = "inner_img_wrapper";
        wrapperOfImgAndControls.appendChild(wrapper);
      }
      wrapper.appendChild(clone);
      detailImg.classList.add("active")
      addControlsGallery(wrapper, this.childNodes[1]);
      addListenerImgInfo();
    } else {
      while(wrapperOfImgAndControls.firstChild) {
        wrapperOfImgAndControls.removeChild(wrapperOfImgAndControls.lastChild);
      };
      detailImg.classList.remove("active");
      window.removeEventListener("keydown", changeImageWithKeyPress);
  }
  }
  }

document.getElementById("close").addEventListener("click", toggleDetail);

// Adds event listener for adding flag of the chosen category on the category buttons in the gallery
for (let i = 0; i < document.getElementsByClassName("btn_galerie_filter").length; i++) {
  document
    .getElementsByClassName("btn_galerie_filter")
    [i].addEventListener("click", setActiveGalleryAndButton);
}

// Adds eventlistener to image containers for the detail view toggling
let imgContainerArr = document.getElementsByClassName("img_container");
for (let i = 0; i < imgContainerArr.length; i++) {
  let imgContainer = imgContainerArr[i];
  imgContainer.addEventListener("click", toggleDetail);
}
};