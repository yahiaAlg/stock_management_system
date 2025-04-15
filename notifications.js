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

// Initial call and add event listener
window.addEventListener("resize", handleResize);
handleResize();

// Initialize Notification Type Chart
document.addEventListener("DOMContentLoaded", function () {
  // Notification Type Chart
  const notificationTypeChart = new Chart(
    document.getElementById("notificationTypeChart"),
    {
      type: "pie",
      data: {
        labels: ["Low Stock", "Orders", "System", "Inventory", "Other"],
        datasets: [
          {
            data: [32, 86, 10, 8, 6],
            backgroundColor: [
              "#F05252", // Danger/Low Stock
              "#FFB761", // Warning/Orders
              "#0EA5E9", // Info/System
              "#5B73E8", // Primary/Inventory
              "#6B7280", // Medium/Other
            ],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 6,
              font: {
                size: 11,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(42, 42, 60, 0.9)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: function (context) {
                let value = context.parsed;
                let total = context.dataset.data.reduce((a, b) => a + b, 0);
                let percentage = Math.round((value / total) * 100) + "%";
                return context.label + ": " + value + " (" + percentage + ")";
              },
            },
          },
        },
      },
    }
  );

  // Add event listeners for filter pills
  const filterPills = document.querySelectorAll(".notification-pill");
  filterPills.forEach((pill) => {
    pill.addEventListener("click", function () {
      // Remove active class from all pills
      filterPills.forEach((p) => p.classList.remove("active"));
      // Add active class to clicked pill
      this.classList.add("active");

      // In a real application, this would filter the notifications
      // For this demo, we'll just show a "filtering" animation
      const notificationItems = document.querySelectorAll(
        ".notification-list-item"
      );
      notificationItems.forEach((item) => {
        item.style.opacity = "0.5";
        setTimeout(() => {
          item.style.opacity = "1";
        }, 500);
      });
    });
  });

  // Add event listeners for notification action buttons
  const markReadButtons = document.querySelectorAll(
    ".notification-actions .btn:first-child"
  );
  markReadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const notificationItem = this.closest(".notification-list-item");

      // Toggle between read and unread state
      if (notificationItem.classList.contains("unread")) {
        notificationItem.classList.remove("unread");
        this.innerHTML = '<i class="far fa-envelope"></i>';
        this.title = "Mark as unread";
      } else {
        notificationItem.classList.add("unread");
        this.innerHTML = '<i class="far fa-envelope-open"></i>';
        this.title = "Mark as read";
      }
    });
  });
});
