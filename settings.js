// DOM Elements
const sidebar = document.getElementById("sidebar");
const contentWrapper = document.getElementById("content-wrapper");
const menuToggle = document.getElementById("menu-toggle");
const overlay = document.getElementById("overlay");

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

// Theme card selection
document.querySelectorAll(".theme-card").forEach((card) => {
  card.addEventListener("click", function () {
    document
      .querySelectorAll(".theme-card")
      .forEach((c) => c.classList.remove("active"));
    this.classList.add("active");
  });
});

// Color swatch selection
document.querySelectorAll(".color-swatch").forEach((swatch) => {
  swatch.addEventListener("click", function () {
    document
      .querySelectorAll(".color-swatch")
      .forEach((s) => s.classList.remove("active"));
    this.classList.add("active");
  });
});

// Copy API token functionality
const copyBtn = document.querySelector(".copy-btn");
if (copyBtn) {
  copyBtn.addEventListener("click", function () {
    const tokenField = document.getElementById("apiToken");
    tokenField.select();
    document.execCommand("copy");

    // Show tooltip or notification that it was copied
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i>';

    setTimeout(() => {
      this.innerHTML = originalText;
    }, 2000);
  });
}

// Initial call and add event listener
window.addEventListener("resize", handleResize);
document.addEventListener("DOMContentLoaded", handleResize);
