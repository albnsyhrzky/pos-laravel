let currentCategory = "all";
let products = [];
function filterCategory(category, event) {

  let buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline-primary");
  });
  event.classList.add("active");
  event.classList.remove("btn-outline-primary");
  event.classList.add("btn-primary");
  console.log({
    currentCategory: currentCategory,
    category: category,
    event: event,
  });
  renderProducts();
}

async function renderProducts(searchProduct = "") {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";


  const response = await fetch("/order/get-products");
  products = await response.json();

  // filter
  const filtered = products.filter((p) => {
    // shorthand / ternery
    const matchCategory =
      currentCategory === "all" || p.category_name === currentCategory;
    const matchSearch = p.product_name.toLowerCase().includes(searchProduct);
    return matchCategory && matchSearch;
  });
  // munculin data dari table products
  filtered.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-3 col-sm-6";
    col.innerHTML = `<div class="card product-card" onclick="addToCart(${product.id})">
                            <div class="product-img">
                                <img src="../${product.product_photo}" alt="" width="70%">
                            </div>
                            <div class="card-body">
                                <span class="badge bg-secondary badge-category">${product.category_name}</span>
                                <h6 class="card-title mt-2 mb-2">${product.product_name}</h6>
                                <p class="card-text text-primary fw-bold">${product.product_price},-</p>
                            </div>
                        </div>`;
    productGrid.appendChild(col);
  });
}

let cart = [];
function addToCart(id) {
  const product = products.find((p) => p.id == id);
  if (!product) {
    return;
  }
  const existing = cart.find((item) => item.id == id);
  if (existing) {
    existing.quantity += 1;
    //alert("product sudah ada di cart")
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartContainer = document.querySelector("#cartItems");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<div class="cart-items" id="cartItems">
                    <div class="text-center text-muted mt-2">
                        <i class="bi bi-cart mb-3"></i>
                        <p>Cart Empty</p>
                    </div>
                </div>`;
    updateTotal();
  }
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className =
      "cart-item d-flex justify-content-between align-items-center mb-2";
    div.innerHTML = `<div>
                    <strong>${item.product_name}</strong>
                    <small>${item.product_price}</small>
                    </div>
                    <div class="d-flex align-items-center">
                          <button class="btn btn-outline-secondary me-2" onclick="changeQty(${item.id}, -1)">-</button>
                          <span>${item.quantity}</span>
                          <button class="btn btn-outline-secondary ms-3" onclick="changeQty(${item.id}, 1)">+</button>
                          <button class="btn btn-sm btn-danger ms-3" onclick="removeItem(${item.id})">
                            <i class="bi bi-trash"></i>
                          </button>
                    </div>`;

    cartContainer.appendChild(div);
  });
  updateTotal();
}
//remove item dari cart
function removeItem(id) {
  cart = cart.filter((p) => p.id != id);
  renderCart();
}
function changeQty(id, x) {
  const item = cart.find((p) => p.id == id);
  if (!item) {
    return;
  }
  item.quantity += x;
  if (item.quantity <= 0) {
    alert("minimum harus 1 product");
    item.quantity += 1;
    //cart = filter((p) => p.id != id);
  }
  renderCart();
}
function updateTotal() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = tax + subtotal;

  document.getElementById("subtotal").textContent = `Rp. ${subtotal.toLocaleString()}`;
  document.getElementById("tax").textContent = `Rp. ${tax.toLocaleString()}`;
  document.getElementById( "total").textContent = `Rp. ${total.toLocaleString()}`;

  document.getElementById("subtotal_value").value = subtotal;
  document.getElementById("tax_value").value = tax;
  document.getElementById("total_value").value = total;
  //console.log(subtotal);
  //console.log(tax);
  //console.log(total);
}
document.getElementById("clearCart").addEventListener("click", function (e) {
  // e.preventDefault();
  cart = [];
  renderCart();
});

async function processPayment() {
  if (cart.length === 0) {
    alert("Cart masih kosong");
    return;
  }
  const order_code = document.querySelector('.orderNumber').textContent.trim();
  const subtotal = document.querySelector("#subtotal_value").value.trim();
  const tax = document.querySelector("#tax_value").value.trim();
  const grandTotal = document.querySelector("#subtotal_value").value.trim();
  try {
    const res = await fetch("add-pos.php?payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart, order_code, subtotal, tax, grandTotal }),
    });
    const data = await res.json();
    if (data.status == "success") {
      alert("Transaction success");
      window.location.href = "print.php";
    } else {
      alert("Transaction failed", data.message);
    }
    //const data = await res.json();
  } catch (error) {
    alert("Upss transaction failed");
    console.log("error", error);
  }
}

// useEffect() => {
//  }, []}

// domContentLoaded : akan meload finction pertama kali
renderProducts();
document
  .getElementById("searchProduct")
  .addEventListener("input", function (e) {
    const searchProduct = e.target.value.toLowerCase();
    console.log(searchProduct);
    renderProducts(searchProduct);
  });

console.log("May 1");
