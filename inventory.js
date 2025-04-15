// DOM Elements
const sidebar = document.getElementById("sidebar");
const contentWrapper = document.getElementById("content-wrapper");
const menuToggle = document.getElementById("menu-toggle");
const overlay = document.getElementById("overlay");
const selectAllCheckbox = document.getElementById("selectAll");

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

// Select all checkboxes functionality
if (selectAllCheckbox) {
  selectAllCheckbox.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(
      ".data-table .form-check-input"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });
}

// Category filter tags
const categoryTags = document.querySelectorAll(".category-filter-tag");
categoryTags.forEach((tag) => {
  tag.addEventListener("click", function () {
    categoryTags.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

// Add Product button event listener
const addProductBtn = document.querySelector(".btn-primary");
if (addProductBtn) {
  addProductBtn.addEventListener("click", function () {
    const addProductModal = new bootstrap.Modal(
      document.getElementById("addProductModal")
    );
    addProductModal.show();
  });
}
