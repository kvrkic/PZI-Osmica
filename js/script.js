document.getElementById("shopping").addEventListener("click", () => {
  document.getElementById("shopping-side-menu").classList.toggle("active");
});
let counter = 0;
document.getElementById("shopping-count").innerText = counter;

document.getElementById("hamburger-menu").addEventListener("click", () => {
  document.getElementById("sidebar-menu").classList.toggle("active");
});


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

const buttons = document.querySelectorAll("#artikli button.green");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onOrderButtonClick);
}

function onOrderButtonClick(event) {
  const clickedButtonElement = event.currentTarget;
  const articleElement = clickedButtonElement.parentElement;

  const artikliName = articleElement.querySelector("h3").innerText;
  const artikliPrice = articleElement.querySelector("em").innerText;

  const artikliInShop = document.getElementById(artikliName.toLowerCase());
  if (artikliInShop) {

    const amountElement = artikliInShop.querySelector(".amount");
    let amountNumber = parseInt(amountElement.textContent);
    amountElement.innerText = ++amountNumber;
  }
  else {

    createShopItem(artikliName, artikliPrice);
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

  shopItem.querySelector(".close").addEventListener("click", izbrisi);


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

    const suma = parseInt(amount) * parseFloat(onlyPrice);

    totalPrice += suma;
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

function izbrisi(event) {
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
    value++;
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

//scroll progress
window.onscroll = function() {
  myFunction();
  scrollFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

//na vrh
var mybutton = document.getElementById("navrh");

function scrollFunction (){
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function naVrh() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}