//CART
document.getElementById("shopping").addEventListener("click", () => {
  document.getElementById("shopping-side-menu").classList.toggle("active");
});

let counter = 0;
document.getElementById("shopping-count").innerText = counter;

function calculateCount() {
  let totalCount = 0;
  const itemsInShop = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < itemsInShop.length; i++) {
    const item = itemsInShop[i];
    const amount = item.querySelector(".amount").textContent;
    totalCount += +amount;
  }
  document.getElementById("shopping-count").innerText = totalCount;
}

const buttons = document.querySelectorAll("#karte button.blue");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onOrderButtonClick);
}

function onOrderButtonClick(event) {
  const clickedButtonElement = event.currentTarget;
  const articleElement = clickedButtonElement.parentElement;

  const karteName = articleElement.querySelector("h3").innerText;
  const kartePrice = articleElement.querySelector("small em").innerText;

  const karteInShop = document.getElementById(karteName.toLowerCase());
  if (karteInShop) {

    const amountElement = karteInShop.querySelector(".amount");
    let amountNumber = parseInt(amountElement.textContent);
    amountElement.innerText = ++amountNumber;
  }
  else {

    createShopItem(karteName, kartePrice);
  };

  calculateCount();

  calculateTotalPrice();
}

function createShopItem(name, price) {
  const shopItem = document.createElement("article");
  shopItem.classList.add("shopping-item");

  shopItem.id = name.toLowerCase();

  shopItem.innerHTML = `
    <i class="fas fa-times close"></i>
    <h3>${name}</h3>
    <div class="item-info">
      <small>Cijena:</small>
      <strong class="price">${price}</strong>
    </div>
    <div class="item-info">
      <small>Količina:</small>
      <div class="amount-box">
        <button class="minus" disabled><i class="fas fa-minus"></i></button>
        <strong class="amount">1</strong>
        <button class="plus"><i class="fas fa-plus"></i></button>
      </div>
    </div>`;

  document.getElementById("shopping-items").append(shopItem);

  shopItem.querySelector(".close").addEventListener("click", delate);


  shopItem.querySelector(".plus").addEventListener("click", plus);


  shopItem.querySelector(".minus").addEventListener("click", minus);

}

function calculateTotalPrice() {
  let totalPrice = 0;
  const itemsInShop = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < itemsInShop.length; i++) {
    const item = itemsInShop[i];


    const amount = item.querySelector(".amount").textContent;
    const price = item.querySelector(".price").textContent;
    const onlyPrice = price.split(" ")[0];

    const umnozak = parseInt(amount) * parseFloat(onlyPrice);

    totalPrice += umnozak;
  }
  document.querySelector("#total-price strong").innerText = totalPrice.toFixed(2) + " kn";

  const minusButton = document.querySelectorAll(".minus");
  for (let i = 0; i < minusButton.length; i++) {
    const minusButtonParent = minusButton[i].parentElement;
    const tempValue = minusButtonParent.querySelector(".amount").textContent;

    const tempValueInt = +tempValue;
    if (tempValue > 1) {
      minusButton[i].disabled = false;
    }
    else {
      minusButton[i].disabled = true;
    }
  }

}

function delate(event) {
  const clickedX = event.currentTarget;
  const item = clickedX.parentElement;
  item.remove();

  calculateTotalPrice();
  calculateCount();
}

function plus(event) {
  const clickedPlus = event.currentTarget;
  const amountBox = clickedPlus.parentElement;

  if (clickedPlus) {
    let value = amountBox.querySelector(".amount").innerText;
    ++value;
    amountBox.querySelector(".amount").innerText = value;
  }

  calculateTotalPrice();
  calculateCount();
}

function minus(event) {
  const clickedMinus = event.currentTarget;
  const amountBox = clickedMinus.parentElement;
  const tempValue = amountBox.querySelector(".amount");

  let amountNumber = parseInt(tempValue.textContent);
  tempValue.innerText = --amountNumber;


  calculateTotalPrice();
  calculateCount();
}

//GALERIJA
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

window.onscroll = function () { myFunction() };

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

document.querySelector("#main > div > div > div > div.home-page-destination-price-new.teaser-layouts.section > section")

function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

document.getElementById("defaultOpen").click();

//TIMER
var countDownDate = new Date("Sep 20, 2021 12:00:00").getTime();

var x = setInterval(function () {

  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);