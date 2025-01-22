const cartModal = document.querySelector("#cart-modal");
const cartItemsList = document.querySelector("#cart-items");

document.addEventListener("click", event => {
  // Add to Cart
  if (event.target.classList.contains("add-to-cart")) {
    const itemName = event.target.dataset.item;
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(itemName);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to the cart");
  }

  // View Cart
  if (event.target.classList.contains("view-cart")) {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cartItemsList.innerHTML = "";
    if (cart.length > 0) {
      cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        cartItemsList.appendChild(li);
      });
    } else {
      cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    }
    cartModal.style.display = "flex";
  }

  // Clear Cart
  if (event.target.classList.contains("clear-cart")) {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      sessionStorage.removeItem("cart");
      alert("Cart cleared");
      if (cartModal.style.display === "flex") {
        cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
      }
    } else {
      alert("No items to clear.");
    }
  }

  // Process Order
  if (event.target.classList.contains("process-order")) {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      sessionStorage.removeItem("cart");
      alert("Thank you for your order");
      if (cartModal.style.display === "flex") {
        cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
      }
    } else {
      alert("Cart is empty.");
    }
  }

  // Close Modal
  if (event.target.classList.contains("close-modal")) {
    cartModal.style.display = "none";
  }

  // Subscribe Form Submission
  if (event.target.closest("footer form button")) {
    event.preventDefault();
    alert("Thank you for subscribing.");
  }
});

// Contact Page: Save Custom Order
const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = {
      name: document.querySelector("#name")?.value,
      email: document.querySelector("#email")?.value,
      message: document.querySelector("#message")?.value,
    };
    localStorage.setItem("customOrder", JSON.stringify(formData));
    alert("Thank you for your message.");
    contactForm.reset();
  });
}
