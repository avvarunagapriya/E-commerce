document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      cartItems.innerHTML = '<li class="list-group-item text-center">Your cart is empty.</li>';
      totalPrice.textContent = "Total: $0";
      return;
    }
  
    let total = 0;
  
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
    
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.style.width = "50px";
      img.style.marginRight = "10px";
    
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
    
      li.innerHTML = `
        <div class="d-flex align-items-center">
          ${img.outerHTML}
          <div>
            <div>${item.name}</div>
            <div>$${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</div>
          </div>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-secondary me-1" onclick="changeQuantity(${index}, -1)">−</button>
          <button class="btn btn-sm btn-outline-secondary me-2" onclick="changeQuantity(${index}, 1)">+</button>
          <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
        </div>
      `;
    
      cartItems.appendChild(li);
      total += item.price * item.quantity;

    });
    
  
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
  });
  
  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
  function clearCart() {
    localStorage.removeItem("cart");
    location.reload();
  }
  function updateCartCount() {
    const count = JSON.parse(localStorage.getItem("cart"))?.length || 0;
    const badge = document.getElementById("cart-count");
    if (badge) {
      badge.textContent = count;
    }
  }
  
  function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += delta;
  
    if (cart[index].quantity < 1) {
      cart.splice(index, 1); // remove item if quantity goes below 1
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }