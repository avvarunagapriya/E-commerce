function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "250px") {
      sidebar.style.width = "0";
    } else {
      sidebar.style.width = "250px";
    }
  }
  

const products = [
    { id: 1, name: "T-Shirt", price: 1000, image: "./imgs/t-shirt.jpeg", quantity: 1},
    { id: 2, name: "Sneakers", price: 1500, image: "./imgs/sneakers.jpeg", quantity: 1},
    { id: 3, name: "Backpack", price: 1700, image: "./imgs/backpack.jpeg", quantity: 1 },
    { id: 4, name: "Sofa Set", price: 15000, image: "./imgs/sofa.jpeg", quantity: 1 },
    { id: 5, name: "Bed", price: 20000, image: "./imgs/bed.jpeg", quantity: 1 },
    { id: 6, name: "HandBag", price: 2500, image: "./imgs/handbag.jpeg", quantity: 1 },
    { id: 7, name: "women footwear", price: 900, image: "./imgs/footwearimg.avif", quantity: 1 },
    { id: 8, name: "Refrigerator", price: 25000, image: "./imgs/Refrigeratorimg.png", quantity: 1 },
    { id: 9, name: "Washing Machine", price: 2500, image: "./imgs/washingmachineimg.png", quantity: 1 }
  ];
  
  const cart = [];
  
  function renderProducts(filter = "") {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
  
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  
    if (filtered.length === 0) {
      productList.innerHTML = `<p class="text-center">No products found.</p>`;
      return;
    }
  
    filtered.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";
      col.innerHTML = `
        <div class="card">
          <img style="width:200px; height:200px; display: block; margin: 0 auto; " src="${product.image}" class="card-img-top pt-3" alt="${product.name}" />
          <div class="card-body text-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Rs.${product.price}</p>
          
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      `;
      productList.appendChild(col);
    });
  }
  document.getElementById("search-input").addEventListener("input", function () {
    const searchTerm = this.value;
    renderProducts(searchTerm);
  });
  
  
  function updateCartCount() {
    const count = JSON.parse(localStorage.getItem("cart"))?.length || 0;
    const badge = document.getElementById("cart-count");
    if (badge) {
      badge.textContent = count;
    }
  }
  
  function addToCart(id) {
    const item = products.find(p => p.id === id);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${item.name} added to cart!`);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
  });
  
  
  function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Clear the existing cart items
  
    cart.forEach((item, index) => {
      // Create a new <li> element for each cart item
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
  
      // Create an image element to display the product image
      const img = document.createElement("img");
      img.src = item.image;  // Set the image source to the product image URL
      img.alt = item.name;   // Set the alt attribute for accessibility
      img.style.width = "50px"; // Optional: Set a fixed width for the image
      img.style.marginRight = "10px"; // Optional: Add space between image and text
  
      // Set the inner HTML to include the image, name, and price
      li.innerHTML = `
        <div class="d-flex align-items-center">
          ${img.outerHTML}
          <span>${item.name} - $${item.price}</span>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
      `;
  
      // Append the list item to the cart items container
      cartItems.appendChild(li);
    });
  }
  

  
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
  });
  