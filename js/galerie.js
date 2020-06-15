"use strict";

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

  function setActiveGalleryAndButton(event) {
    document.getElementsByClassName("active_galerie")[0].classList.remove("active_galerie");
    event.target.classList.add("active_galerie");
    showHideImages();
  }

  function toggleDetail() {
    if (window.matchMedia("(min-width: 600px)").matches) {
    let on = document.getElementById("detail");
    let wrapper = document.getElementById("wrap");
    if (on.style.display == "none") {
      let clone = this.childNodes[1].cloneNode(true);
      on.style.display = "block";
      clone.style.maxWidth = "80%";
      clone.classList.add("window_gallery_img");
      wrapper.appendChild(clone);
    } else {
      on.style.display = "none";
      wrapper.removeChild(wrapper.lastChild);
    }
  }
  }
  
  document.getElementById("detail").style.display = "none";
  document.getElementById("close").addEventListener("click", toggleDetail);

  for (let i = 0; i < document.getElementsByClassName("btn_galerie_filter").length; i++) {
    document
      .getElementsByClassName("btn_galerie_filter")
      [i].addEventListener("click", setActiveGalleryAndButton);
  }

  let imgContainerArr = document.getElementsByClassName("img_container");
  for (let i = 0; i < imgContainerArr.length; i++) {
    let imgContainer = imgContainerArr[i];
    imgContainer.addEventListener("click", toggleDetail);
  }
  

})();
