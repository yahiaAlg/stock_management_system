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

// Initialize Charts
document.addEventListener("DOMContentLoaded", function () {
  // Customer Segmentation Chart
  const customerSegmentationChart = new Chart(
    document.getElementById("customerSegmentationChart"),
    {
      type: "doughnut",
      data: {
        labels: [
          "VIP Customers",
          "Regular Customers",
          "Occasional Buyers",
          "One-time Shoppers",
        ],
        datasets: [
          {
            data: [13.5, 45.2, 28.7, 12.6],
            backgroundColor: [
              "#5B73E8", // Primary
              "#10B981", // Success
              "#FFB761", // Warning
              "#6B7280", // Medium
            ],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(42, 42, 60, 0.9)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            displayColors: true,
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.parsed + "%";
              },
            },
          },
        },
      },
    }
  );

  // Customer Growth Chart
  const customerGrowthChart = new Chart(
    document.getElementById("customerGrowthChart"),
    {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "New Customers",
            data: [85, 102, 92, 108, 120, 115, 125, 140, 135, 148, 155, 165],
            borderColor: "#5B73E8",
            backgroundColor: "rgba(91, 115, 232, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: "Active Customers",
            data: [
              1230, 1280, 1320, 1370, 1420, 1480, 1540, 1600, 1670, 1740, 1820,
              1900,
            ],
            borderColor: "#38BFAC",
            backgroundColor: "rgba(56, 191, 172, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              boxWidth: 6,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(42, 42, 60, 0.9)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            caretPadding: 5,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [3, 3],
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
        },
        elements: {
          point: {
            radius: 2,
            hoverRadius: 5,
          },
        },
      },
    }
  );

  // Customer Spending Chart (in modal)
  const customerSpendingChart = new Chart(
    document.getElementById("customerSpendingChart"),
    {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Monthly Spending",
            data: [320, 450, 280, 390, 430, 210, 380, 245, 350, 590, 480, 1200],
            backgroundColor: "#5B73E8",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(42, 42, 60, 0.9)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            callbacks: {
              label: function (context) {
                return "Spent: $" + context.parsed.y.toLocaleString();
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [3, 3],
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              callback: function (value) {
                if (value >= 1000) {
                  return "$" + value / 1000 + "k";
                }
                return "$" + value;
              },
            },
          },
        },
      },
    }
  );
});
