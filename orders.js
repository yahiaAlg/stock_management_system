// DOM Elements
const sidebar = document.getElementById("sidebar");
const contentWrapper = document.getElementById("content-wrapper");
const menuToggle = document.getElementById("menu-toggle");
const overlay = document.getElementById("overlay");
const ordersListView = document.getElementById("orders-list-view");
const orderDetailsView = document.getElementById("order-details-view");
const backToOrdersBtn = document.getElementById("back-to-orders");

// Toggle Sidebar
menuToggle.addEventListener("click", function () {
  sidebar.classList.toggle("sidebar-visible");
  contentWrapper.classList.toggle("content-wrapper-expanded");
  overlay.classList.toggle("overlay-visible");
});

// Close sidebar when clicking on overlay (mobile)
overlay.addEventListener("click", function () {
  sidebar.classList.remove("sidebar-visible");
  overlay.classList.remove("overlay-visible");
});

// Responsive handling
function handleResize() {
  if (window.innerWidth < 992) {
    sidebar.classList.add("sidebar-collapsed");
    contentWrapper.classList.add("content-wrapper-expanded");
  } else {
    sidebar.classList.remove("sidebar-visible");
    sidebar.classList.remove("sidebar-collapsed");
    contentWrapper.classList.remove("content-wrapper-expanded");
    overlay.classList.remove("overlay-visible");
  }
}

// Initial call and add event listener
window.addEventListener("resize", handleResize);
handleResize();

// View Order Details
document.querySelectorAll(".order-link").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const orderId = this.getAttribute("data-order-id");
    ordersListView.style.display = "none";
    orderDetailsView.style.display = "block";
    // In a real app, you would fetch the order details using the orderId
    console.log("Viewing order details for:", orderId);
  });
});

// Back to Orders List
backToOrdersBtn.addEventListener("click", function (e) {
  e.preventDefault();
  orderDetailsView.style.display = "none";
  ordersListView.style.display = "block";
});

// Create Order Modal - Product Handling
const addProductRowBtn = document.getElementById("addProductRow");
const productRows = document.getElementById("productRows");

// Add new product row
addProductRowBtn.addEventListener("click", function () {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
                <td>
                    <select class="form-select product-select">
                        <option value="">Select a product</option>
                        <option value="1">MacBook Pro - $1,299.00</option>
                        <option value="2">Wireless Headphones - $249.00</option>
                        <option value="3">Wireless Mouse - $79.00</option>
                        <option value="4">Smartphone X - $899.00</option>
                        <option value="5">Office Chair - $249.00</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="form-control product-price" value="$0.00" readonly>
                </td>
                <td>
                    <input type="number" class="form-control product-quantity" value="1" min="1">
                </td>
                <td>
                    <input type="text" class="form-control product-total" value="$0.00" readonly>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-danger btn-sm remove-product">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            `;
  productRows.appendChild(newRow);

  // Attach event listeners to new row
  attachProductRowEvents(newRow);
});

// Remove product row
function attachProductRowEvents(row) {
  const removeBtn = row.querySelector(".remove-product");
  const productSelect = row.querySelector(".product-select");
  const quantityInput = row.querySelector(".product-quantity");

  removeBtn.addEventListener("click", function () {
    row.remove();
    updateOrderSummary();
  });

  productSelect.addEventListener("change", function () {
    updateProductRow(row);
  });

  quantityInput.addEventListener("change", function () {
    updateProductRow(row);
  });
}

// Attach events to initial row
document.querySelectorAll("#productRows tr").forEach(function (row) {
  attachProductRowEvents(row);
});

// Product prices (in a real app, this would come from an API or database)
const productPrices = {
  1: 1299.0, // MacBook Pro
  2: 249.0, // Wireless Headphones
  3: 79.0, // Wireless Mouse
  4: 899.0, // Smartphone X
  5: 249.0, // Office Chair
};

// Update a product row calculations
function updateProductRow(row) {
  const productSelect = row.querySelector(".product-select");
  const priceInput = row.querySelector(".product-price");
  const quantityInput = row.querySelector(".product-quantity");
  const totalInput = row.querySelector(".product-total");

  const productId = productSelect.value;
  const price = productId ? productPrices[productId] : 0;
  const quantity = parseInt(quantityInput.value) || 1;

  priceInput.value = "$" + price.toFixed(2);
  totalInput.value = "$" + (price * quantity).toFixed(2);

  updateOrderSummary();
}

// Update order summary calculations
function updateOrderSummary() {
  let subtotal = 0;

  // Calculate subtotal from all product rows
  document.querySelectorAll("#productRows tr").forEach(function (row) {
    const totalInput = row.querySelector(".product-total");
    const total = parseFloat(totalInput.value.replace("$", "")) || 0;
    subtotal += total;
  });

  // Get shipping cost
  const shippingMethod = document.getElementById("shippingMethod");
  let shipping = 20.0; // Default to express shipping

  if (shippingMethod.value === "standard") {
    shipping = 10.0;
  } else if (shippingMethod.value === "overnight") {
    shipping = 35.0;
  }

  // Calculate tax and total
  const taxRate = 0.0875; // 8.75%
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  // Update summary display
  document.getElementById("orderSubtotal").textContent =
    "$" + subtotal.toFixed(2);
  document.getElementById("orderShipping").textContent =
    "$" + shipping.toFixed(2);
  document.getElementById("orderTax").textContent = "$" + tax.toFixed(2);
  document.getElementById("orderTotal").textContent = "$" + total.toFixed(2);
}

// Shipping method change
document
  .getElementById("shippingMethod")
  .addEventListener("change", updateOrderSummary);

// Initialize order summary
updateOrderSummary();

// Form submission (in a real app, this would send data to a server)
document
  .getElementById("createOrderBtn")
  .addEventListener("click", function () {
    // Here you would collect all form data and submit it
    alert("Order created successfully!");
    // Close the modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("createOrderModal")
    );
    modal.hide();
  });
