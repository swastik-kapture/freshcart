// if there is no cart set cart
if (localStorage.getItem("cartItems") === null) {
  localStorage.setItem("cartItems", JSON.stringify({}));
}

function removeExtraSpaces(inputString) {
  return inputString
    .replace(/\s+/g, " ")
    .replace(/^\s+|\s+$/g, "")
    .replace(/\n\s+/g, "\n")
    .replace("'", "")
    .trim();
}

function clear_visual_cart() {
  let cart_list = document.getElementById("cart-list");
  cart_list.innerHTML = "";
}

function add_item_to_visual_cart(cartItem) {
  let cart_list = document.getElementById("cart-list");
  let cart_item = `<li class="list-group-item py-3 ps-0 border-top" idx=${cartItem.idx}>
  <!-- row -->
  <div class="row align-items-center">
  
    <div class="col-6 col-md-6 col-lg-7">
      <div class="d-flex">
      <img src="${cartItem.img}" alt="Ecommerce"
        class="icon-shape icon-xxl">
        <div class="ms-3">
      <!-- title -->
      <a href="pages/shop-single.html" class="text-inherit">
        <h6 class="mb-0">${cartItem.name}</h6>
      </a>
      <span><small class="text-muted">${cartItem.qty}</small></span>
      <!-- text -->
      <div class="mt-2 small lh-1" id="removeCartItem" onClick="delete_from_local_cart('${cartItem.name}')"> <a href="#!" class="text-decoration-none text-inherit"> <span
            class="me-1 align-text-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-trash-2 text-success">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
              </path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg></span><span class="text-muted">Remove</span></a></div>
          </div>
        </div>
    </div>
    <!-- input group -->
    <div class="col-4 col-md-3 col-lg-3">
      <!-- input -->
      <!-- input -->
      <div class="input-group input-spinner  ">
        <input type="button" value="-" class="button-minus  btn  btn-sm " data-field="quantity">
        <input type="number" step="1" max="10" value="${cartItem.count}" name="quantity"
          class="quantity-field form-control-sm form-input   ">
        <input type="button" value="+" class="button-plus btn btn-sm " data-field="quantity">
      </div>
  
    </div>
    <!-- price -->
    <div class="col-2 text-lg-end text-start text-md-end col-md-2">
      <span class="fw-bold">${cartItem.price}</span>
  
    </div>
  </div>
  
  </li>`;
  cart_list.innerHTML += cart_item;
  return true;
}

function rerender_cart() {
  // clear visual cart
  clear_visual_cart();
  // get cart from localstorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  // loop over cartItems
  Object.keys(cartItems).forEach((cartKey) => {
    add_item_to_visual_cart(cartItems[cartKey]);
  });
  // update count
  document.getElementById("cartCount").innerHTML =
    Object.keys(cartItems).length;
}

function add_to_local_cart(prd_name, img_url, prd_qty, prd_price) {
  // get cart from localstorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  // create a cart item
  const cartItem = {
    name: prd_name,
    img: img_url,
    qty: prd_qty,
    price: prd_price,
    count: 1,
  };
  // if item in cart exists increase count
  if (cartItems.hasOwnProperty(prd_name)) {
    cartItems[prd_name].count += 1;
  } else {
    cartItems[prd_name] = cartItem;
  }
  // set localstorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // rerender cart
  rerender_cart();
}

function remove_from_local_cart(prd_name) {
  // get cart from localstorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  // if item in cart exists increase count
  if (cartItems.hasOwnProperty(prd_name) && cartItems[prd_name].count > 1) {
    cartItems[prd_name].count -= 1;
  } else if (cartItems[prd_name].count === 1) {
    delete cartItems[prd_name];
  } else {
    console.log("Illegal attempt to remove from cart!");
  }
  // set cart in localstorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // rerender cart
  rerender_cart();
}

function delete_from_local_cart(prd_name) {
  // get cart from localstorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  // if item in cart exists increase count
  if (cartItems.hasOwnProperty(prd_name)) {
    delete cartItems[prd_name];
  } else {
    console.log("Illegal attempt to remove from cart!");
  }
  // set cart in localstorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // rerender cart
  rerender_cart();
}

function get_add_event_item(event) {
  // get associated root
  let parent_root = event.target.parentElement.parentElement.parentElement;
  // get associated product name
  let prd_name = removeExtraSpaces(parent_root.querySelector("h2 a").innerHTML);
  // get associated image URL
  let img_url = parent_root.querySelector("img").src;
  // get associated product price
  let prd_price = parent_root.querySelector("span.text-dark").innerHTML;
  // add to cart
  add_to_local_cart(prd_name, img_url, "1 qty", prd_price);
  // open cart
  document.getElementById("toggleCart").click();
}

// rerender cart on page load
rerender_cart();

// add events to all items
document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", (evt) => get_add_event_item(evt));
});
