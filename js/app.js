"use strict";

const UICTRL = (function() {

  const UISelectors = {
    htmlContainer: document.querySelector("main"),
  }

  const htmlCode = {
    index: `<div class="my_container">
    <div class="filler col-l-4 col-m-4 first_img_back">
      <div class="image_frame">
        <img
          class="main_page_image"
          src="foto/pages/atlantic_puffin.jpg"
          alt="Puffin"
        />
      </div>
    </div>
    <div class="my_row first_text_cont col-l-8 col-m-8">
      <span class="cover first_cover"> Galerie</span>
      <div class="title">
        <h2><a href="">Tvorové</a></h2>
        <div class="underline"></div>
      </div>
      Soubor tvorby znázorňující různé druhy tvorstva tohoto světa. Bytosti
      existující i neexistující.
      <div class="more">
        <a href=""><i class="far fa-eye"></i></a>
      </div>
    </div>
  </div>
  <div class="my_container">
    <div class="my_row second_text_cont col-l-8 col-m-8">
      <span class="cover second_cover"> Galerie</span>
      <div class="title">
        <h2><a href="">Předměty</a></h2>
        <div class="underline"></div>
      </div>
      Každý předmět může být k něčemu dobrý. Některé jsou chutné, jinými se
      dá bít vše kolem.
      <div class="more">
        <a href=""><i class="far fa-eye"></i></a>
      </div>
    </div>
    <div class="filler col-l-4 col-m-4 second_img_back">
      <div class="image_frame">
        <img
          class="main_page_image"
          src="foto/pages/nuk.jpg"
          alt="Puffin"
        />
      </div>
    </div>
  </div>
  <div class="my_container">
    <div class="filler col-l-4 col-m-4 third_img_back">
      <div class="image_frame">
        <img
          class="main_page_image"
          src="foto/pages/vengeful_sun.jpg"
          alt="Puffin"
        />
      </div>
    </div>
    <div class="my_row third_text_cont col-l-8 col-m-8">
      <span class="cover second_cover"> Galerie</span>
      <div class="title">
        <h2><a href="">Abstrakta</a></h2>
        <div class="underline"></div>
      </div>
      Když abstrahuji od konkrétního a zasním-li se, připadají mi věci kolem
      mě trochu méně určité, avšak o to více inspirující.
      <div class="more">
        <a href=""><i class="far fa-eye"></i></a>
      </div>
    </div>
  </div>`, about: 
    `<div class="text_container center tm_3">
    <div class="tm_1">
      Kreslím i maluji. Ráno i odpoledne. Každý den je pro mě něčím novým. 
      Poznávám svět. Jako každá a každý mého věku mě fascinují zmrzliny, balónky, 
      zvířátka a příroda i lidé kolem mě.
    </div>
    <div class="tm_3">
     Ráda si vybírám barvy, které nosím na oblečení, kterými kreslím a tak. Barvy jsou
     pro mě důležité.
    </div>
    </div>`,
    complete_gallery: `<div class="gallery_links_container">
    <ul>
      <li><a class="btn_galerie_filter active_galerie">Všechny kategorie</a></li>
      <li><a class="btn_galerie_filter">Tvorové</a></li>
      <li><a class="btn_galerie_filter">Předměty</a></li>
      <li><a class="btn_galerie_filter">Abstrakta</a></li>
    </ul>
    <div class="clear"></div>
  </div>
  <div class="galerie_container">
    <div class="row">
    </div>`
  }

  const images = [
    {
      class: "Tvorové",
      src: "./foto/pages/alien.jpg",
      alt: "Alien",
      name: "Cizinec"
    },
    {
      class: "Předměty",
      src: "./foto/pages/abstracted_abstraction.jpg",
      alt: "Abstracting",
      name: "Abstrahovaná abstrakce"
    },
    {
      class: "Abstrakta",
      src: "./foto/pages/landscape_multilog.jpg",
      alt: "Landscape multilog",
      name: "Krajinný mnohorozhovor"
    },
    {
      class: "Tvorové",
      src: "./foto/pages/cabbage_gomora.jpg",
      alt: "Cabbage gomora",
      name: "Salátová Gomora"
    },
    {
      class: "Tvorová",
      src: "./foto/pages/spider_smoke.jpg",
      alt: "Pavoučí zahradník",
      name: "Pavoučí zahradník"
    },
    {
      class: "Tvorové",
      src: "./foto/pages/trialog.jpg",
      alt: "Trialog",
      name: "Trialog"
    },
    {
      class: "Tvorové",
      src: "./foto/pages/duo.jpg",
      alt: "Duo",
      name: "Duo"
    },
    {
      class: "Abstrakta",
      src: "./foto/pages/landscape_multilog.jpg",
      alt: "Krajinný mnohorozhovor",
      name: "Krajinný mnohorozhovor"
    },
    {
      class: "Tvorové",
      src: "./foto/pages/pi_man.jpg",
      alt: "Žena jménem Pi",
      name: "Žena jménem Pi"
    },
    {
      class: "Předměty",
      src: "./foto/pages/nuk.jpg",
      alt: "Nanuk",
      name: "Nanuk"
    },
    {
      class: "Tvorové",
      src: "./foto/pages/pregnat_beast.jpg",
      alt: "Na fotbale v očekávání",
      name: "Na fotbale v očekávání"
    },
    {
      class: "Abstrakta",
      src: "./foto/pages/signum.jpg",
      alt: "Signum",
      name: "Signum"
    },
    {
      class: "Předměty",
      src: "./foto/pages/vengeful_sun.jpg",
      alt: "Pomstychtivé slunce",
      name: "Pomstychtivé slunce"
    },
  ];

  return {
    init: function () {
      UISelectors.htmlContainer.innerHTML = htmlCode["index"];
    },
    switchPage: function(e) {
      const id = e.target.id;
      UISelectors.htmlContainer.innerHTML = htmlCode[id];
      },
    images: function() {
      let imagesURL =[];
      images.forEach((image) => {
      imagesURL += `
      <div class="img_container show">
      <img class="${image.class}" src="${image.src}" alt="${image.alt}">
      <div class="middle">
      <div class="magnify"><i class="fas fa-search"></i></div>
      <div class="cover_text">${image.name}</div>
      </div></div>`;
      })
      imagesURL += `<div id="detail">
      <div id="wrap">
        <div id="close">
          &times
        </div>
        <div id="detail_img">
        </div>
      </div>`;
      document.querySelector(".row").innerHTML = imagesURL;
      mainGallery();
    }
}})();

window.addEventListener("DOMContentLoaded", UICTRL.init);
document.querySelector("#index").addEventListener("click", UICTRL.switchPage);
document.querySelector("#about").addEventListener("click", UICTRL.switchPage);
document.querySelector("#complete_gallery").addEventListener("click", (e) => {
  UICTRL.switchPage(e);
  UICTRL.images()});