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
  // Sales Trend Chart
  const salesTrendChart = new Chart(
    document.getElementById("salesTrendChart"),
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
            label: "Sales",
            data: [
              12500, 14000, 15800, 14900, 18200, 21500, 22000, 24500, 23800,
              24800, 27000, 29500,
            ],
            borderColor: "#5B73E8",
            backgroundColor: "rgba(91, 115, 232, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: "Stock Level",
            data: [
              32000, 29800, 28000, 29500, 27800, 25000, 24000, 26500, 28000,
              27500, 26000, 25500,
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
            callbacks: {
              label: function (context) {
                if (context.dataset.label === "Sales") {
                  return (
                    context.dataset.label +
                    ": $" +
                    context.parsed.y.toLocaleString()
                  );
                } else {
                  return (
                    context.dataset.label +
                    ": " +
                    context.parsed.y.toLocaleString() +
                    " units"
                  );
                }
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
        elements: {
          point: {
            radius: 2,
            hoverRadius: 5,
          },
        },
      },
    }
  );

  // Inventory Distribution Chart
  const inventoryDistributionChart = new Chart(
    document.getElementById("inventoryDistributionChart"),
    {
      type: "doughnut",
      data: {
        labels: ["Electronics", "Clothing", "Furniture", "Others"],
        datasets: [
          {
            data: [38, 25, 17, 20],
            backgroundColor: [
              "#5B73E8", // Primary
              "#10B981", // Success
              "#FFB761", // Warning
              "#F05252", // Danger
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
            displayColors: false,
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
});
