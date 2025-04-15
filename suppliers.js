// DOM Elements
const sidebar = document.getElementById("sidebar");
const contentWrapper = document.getElementById("content-wrapper");
const menuToggle = document.getElementById("menu-toggle");
const overlay = document.getElementById("overlay");
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");
const gridView = document.getElementById("gridView");
const listView = document.getElementById("listView");
const saveSupplierBtn = document.getElementById("saveSupplierBtn");

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

// Toggle between Grid and List view
gridViewBtn.addEventListener("click", function () {
  gridView.style.display = "grid";
  listView.style.display = "none";
  gridViewBtn.classList.add("active");
  listViewBtn.classList.remove("active");
});

listViewBtn.addEventListener("click", function () {
  gridView.style.display = "none";
  listView.style.display = "block";
  gridViewBtn.classList.remove("active");
  listViewBtn.classList.add("active");
});

// Show supplier details on card click
const supplierCards = document.querySelectorAll(".supplier-card");
supplierCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    // Prevent triggering when clicking on dropdown or its children
    if (e.target.closest(".dropdown") !== null) {
      return;
    }

    const supplierId = this.getAttribute("data-supplier-id");
    // Here you would normally navigate to a supplier detail page
    // For demo purposes, we'll just log it
    console.log(`Viewing details for supplier ID: ${supplierId}`);

    // You could redirect to a supplier detail page like this:
    // window.location.href = `supplier-detail.html?id=${supplierId}`;
  });
});

// Handle saving new supplier
saveSupplierBtn.addEventListener("click", function () {
  const form = document.getElementById("addSupplierForm");
  const termsCheck = document.getElementById("termsCheck");

  // Basic form validation
  if (!form.checkValidity()) {
    // Trigger browser's native form validation UI
    form.reportValidity();
    return;
  }

  if (!termsCheck.checked) {
    alert("Please confirm that you have the authority to add this supplier.");
    return;
  }

  // For demo purposes, we'll just log the form data
  console.log("New supplier data submitted");

  // Here you would normally send the data to your backend
  // After successful submission, you would close the modal and refresh the list

  // Simulate success
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addSupplierModal")
  );
  modal.hide();

  // Show success toast or notification (just a simple alert for demo)
  setTimeout(() => {
    alert("Supplier added successfully!");
  }, 500);
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
