let openCart = document.getElementById("openCart");
let cart = document.querySelector(".cart");
let closeCart = document.getElementById("closeCart");
let content = document.querySelector(".content");
let cartList = document.querySelector(".cart_list");
let total = document.querySelector(".total-price");
let quantity = document.getElementById("quantity");
let form = document.querySelector(".frame")
let btn_buy = document.getElementById("buynow")

openCart.addEventListener("click", function () {
  console.log("open");
  cart.classList.add("active");
});
closeCart.addEventListener("click", function () {
  cart.classList.remove("active");
});

let products = [
  {
    id: 1,
    img: "iphone 15.jpeg",
    name: "Iphone 15 pro max",
    price: 50000,
  },
  {
    id: 2,
    img: "samsung Z.jpeg",
    name: "Samsung Galaxy Z fold 5",
    price: 60000,
  },
  {
    id: 3,
    img: "phone 1.jpeg",
    name: "Samsung Galaxy Z flip 5",
    price: 80000,
  },
  {
    id: 4,
    img: "redmagic.jpeg",
    name: "Redmagic 10 pro Gaming",
    price: 110000,
  },
  {
    id: 5,
    img: "samsung S22.jpeg",
    name: "Samsung Galaxy S22 Ultra",
    price: 80000,
  },
  {
    id: 6,
    img: "Samsung Galaxy S24 Ultra.jpeg",
    name: "Samsung Galaxy S24 Ultra",
    price: 95000,
  },
  {
    id: 7,
    img: "iphone watch.jpeg",
    name: "T800 Ultra sport fitness",
    price: 15000,
  },
  {
    id: 8,
    img: "smart 1.jpeg",
    name: "Realme watch S pro",
    price: 8500,
  },
  {
    id: 9,
    img: "apple watch.jpeg",
    name: "Redmi watch 2 Lite",
    price: 20000,
  },
  {
    id: 10,
    img: "apple watch 2.jpeg",
    name: "Apple watch 15 series",
    price: 25000,
  },
];

let listCards;
if (localStorage.products != null) {
  listCards = JSON.parse(localStorage.products);
} else {
  listCards = [];
}
getData();
function initApp() {
  products.forEach((value) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add("product-box");
    newDiv.innerHTML = `
            <img src="img/${value.img}" class="card-img-top" />
            <div class="card-body">
                <h2 class="card-title">${value.name}</h2>
                <span class="card-text">Price : ${value.price}$</span>
                <button class="btn btn-outline-primary" onclick="addToCart(${value.id})">Add to cart</button>
            </div>
        `;
    content.appendChild(newDiv);
  });
}
initApp();

function addToCart(id) {
  let product = products.find((pro) => pro.id === id);
  let productIndex = listCards.findIndex((pro) => pro.id === id);
  if (productIndex > -1) {
    listCards[productIndex].quantity += 1;
  } else {
    listCards.push({ ...product, quantity: 1 });
  }
  reloadCard();
}

function reloadCard() {
  cartList.innerHTML = "";
  let totalPrice = 0;
  let count = 0;
  listCards.forEach((value) => {
    totalPrice += value.price * value.quantity;
    count += value.quantity;
    let newLi = document.createElement("li");
    newLi.classList.add("box");
    newLi.innerHTML = `
    <span class="cart-left-side">
        <img src="img/${value.img}" class="cart-img"/>
        <span>
        <h6 class="cart-text">${value.name}</h6>
        <span class="cart-price">${value.price}</span>
        </span>
    </span>
    <span class="cart-quantity">
        <button class="btn btn-primary" onclick="changeQuantity(${value.id},${
      value.quantity + 1
    })">+</button>
        <h5>${value.quantity}</h5>
        <button class="btn btn-primary" onclick="changeQuantity(${value.id},${
      value.quantity - 1
    })">-</button>
    </span>
        `;
    cartList.append(newLi);
  });
  total.innerHTML = "&nbsp;" + totalPrice + " $";
  quantity.innerHTML = count;
  localStorage.setItem("products", JSON.stringify(listCards));
}

function changeQuantity(id, newQuantity) {
  let productIndex = listCards.findIndex((pro) => pro.id === id);
  if (newQuantity === 0) {
    listCards.splice(productIndex, 1);
  } else {
    listCards[productIndex].quantity = newQuantity;
  }
  reloadCard();
}

function getData() {
  localStorage.getItem("products");
  reloadCard();
}



function payment() {
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}
function go(){
  window.location.href = "../Home/index.html";
}


