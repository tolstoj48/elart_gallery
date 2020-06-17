"use strict";

//Main and single self-invoking function
(function main() {
  function oneColumn() {
    for (let i = 0; i < document.getElementsByClassName("col").length; i++) {
      let element = document.getElementsByClassName("col")[i];
      element.style.display = "block";
      element.style.flex = "50%";
      element.style.maxWidth = "50%";
    }
  }

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

  //Setting the flag of active gallery after the category link clicked
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

  //Switches detail view image backward or forward depending of the actual value of "where" parameter
  function switchImg(where) {
    let arrayAllImgs = document.querySelectorAll(".show img");
    let toBeReplacedImg = document.querySelector("#detail_img img");
    let index = getIndexOfImg(toBeReplacedImg, arrayAllImgs);
    if (where == "back") {
      if (index > 0) {
        let newImg = arrayAllImgs[index - 1].cloneNode(true);
        toBeReplacedImg.parentNode.replaceChild(newImg, toBeReplacedImg);
        document.querySelector("#detail_img img").classList.add("window_gallery_img");
        document.querySelector(".info").innerHTML = index + " / " + arrayAllImgs.length;
      };
    } else {
      if (index < arrayAllImgs.length - 1) {
        let newImg = arrayAllImgs[index + 1].cloneNode(true);
        toBeReplacedImg.parentNode.replaceChild(newImg, toBeReplacedImg);
        document.querySelector("#detail_img img").classList.add("window_gallery_img");
        document.querySelector(".info").innerHTML = (index + 2) + " / " + arrayAllImgs.length;
      }
    }
  }

  //Adds all the controls to the detail view of the gallery, except for the close cross
  function addControlsGallery(wrapper, imgForGettingNumber) {
    let containerControls = document.createElement("div");
    let myButtonBack = document.createElement("div");
    let numberOfImg = document.createElement("div");
    let myButtonForward = document.createElement("div");
    let arrayAllImgs = document.querySelectorAll(".show img");
    let positionOfImg;
    myButtonBack.innerHTML = "<";
    myButtonBack.classList.add("window_gallery_btn");
    myButtonBack.classList.add("pointer");
    myButtonBack.addEventListener("click", function () {switchImg("back")});
    containerControls.appendChild(myButtonBack);
    positionOfImg = getIndexOfImg(imgForGettingNumber, arrayAllImgs);
    numberOfImg.innerHTML = (positionOfImg + 1) + " / " + arrayAllImgs.length;
    numberOfImg.classList.add("window_gallery_btn", "info");
    containerControls.appendChild(numberOfImg);
    myButtonForward.innerHTML = ">";
    myButtonForward.classList.add("window_gallery_btn");
    myButtonForward.classList.add("pointer");
    myButtonForward.addEventListener("click", function () {switchImg("forward")});
    containerControls.appendChild(myButtonForward);
    wrapper.appendChild(containerControls);
  }

  //Adds the toggling of the detail view of an image clicked in the gallery 
  function toggleDetail() {
    if (window.matchMedia("(min-width: 600px)").matches) {
    let detailImg = document.getElementById("detail");
    let wrapper = document.getElementById("detail_img");
    if (!detailImg.classList.contains("active")) {
      let clone = this.childNodes[1].cloneNode(true);
      clone.style.maxWidth = "80%";
      clone.classList.add("window_gallery_img");
      wrapper.appendChild(clone);
      detailImg.classList.add("active")
      addControlsGallery(wrapper, this.childNodes[1]);
    } else {
      while(wrapper.firstChild) {
      wrapper.removeChild(wrapper.lastChild);
      };
      detailImg.classList.remove("active");
    }
  }
  }
  
  document.getElementById("close").addEventListener("click", toggleDetail);

  //Adds event listener for adding flag of the chosen category on the category buttons in the gallery
  for (let i = 0; i < document.getElementsByClassName("btn_galerie_filter").length; i++) {
    document
      .getElementsByClassName("btn_galerie_filter")
      [i].addEventListener("click", setActiveGalleryAndButton);
  }

  //Adds eventlistener to image containers for the detail view toggling
  let imgContainerArr = document.getElementsByClassName("img_container");
  for (let i = 0; i < imgContainerArr.length; i++) {
    let imgContainer = imgContainerArr[i];
    imgContainer.addEventListener("click", toggleDetail);
  }
})();