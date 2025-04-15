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

// Initialize DateRangePicker
$("#dateRangePicker").daterangepicker(
  {
    startDate: moment().subtract(14, "days"),
    endDate: moment(),
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
  },
  function (start, end, label) {
    $("#dateRangePicker span").html(
      start.format("MMM D, YYYY") + " - " + end.format("MMM D, YYYY")
    );
  }
);

// Enable Bootstrap tooltips
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Initialize Charts
document.addEventListener("DOMContentLoaded", function () {
  // Monthly Sales Report Chart
  const reportChart = new Chart(document.getElementById("reportChart"), {
    type: "line",
    data: {
      labels: [
        "Apr 1",
        "Apr 2",
        "Apr 3",
        "Apr 4",
        "Apr 5",
        "Apr 6",
        "Apr 7",
        "Apr 8",
        "Apr 9",
        "Apr 10",
        "Apr 11",
        "Apr 12",
        "Apr 13",
        "Apr 14",
        "Apr 15",
      ],
      datasets: [
        {
          label: "Revenue",
          data: [
            2100, 2300, 2800, 2400, 2900, 3100, 3000, 3200, 3500, 3100, 3400,
            3700, 3500, 3800, 4000,
          ],
          borderColor: "#5B73E8",
          backgroundColor: "rgba(91, 115, 232, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
        {
          label: "Orders",
          data: [41, 45, 52, 48, 55, 59, 58, 61, 65, 59, 63, 69, 66, 71, 74],
          borderColor: "#38BFAC",
          backgroundColor: "rgba(56, 191, 172, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
          yAxisID: "y1",
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
              if (context.dataset.label === "Revenue") {
                return (
                  context.dataset.label +
                  ": $" +
                  context.parsed.y.toLocaleString()
                );
              } else {
                return context.dataset.label + ": " + context.parsed.y;
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
              return "$" + value.toLocaleString();
            },
          },
        },
        y1: {
          beginAtZero: true,
          position: "right",
          grid: {
            display: false,
          },
          ticks: {
            precision: 0,
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
  });

  // Trend Chart
  const trendChart = new Chart(document.getElementById("trendChart"), {
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
          label: "Current Year",
          data: [
            32000, 36000, 42000, 45000, 48000, 52000, 56000, 58000, 60000,
            63000, 68000, 72000,
          ],
          borderColor: "#5B73E8",
          backgroundColor: "rgba(91, 115, 232, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
        {
          label: "Previous Year",
          data: [
            28000, 32000, 37000, 40000, 43000, 45000, 48000, 51000, 53000,
            56000, 60000, 65000,
          ],
          borderColor: "#E0E0E0",
          borderDash: [5, 5],
          backgroundColor: "transparent",
          borderWidth: 2,
          tension: 0.3,
          fill: false,
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
          callbacks: {
            label: function (context) {
              return (
                context.dataset.label +
                ": $" +
                context.parsed.y.toLocaleString()
              );
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
  });

  // Seasonality Chart
  const seasonalityChart = new Chart(
    document.getElementById("seasonalityChart"),
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
            label: "Avg. Monthly Sales",
            data: [
              32000, 36000, 39000, 42000, 46000, 52000, 58000, 55000, 48000,
              45000, 50000, 65000,
            ],
            backgroundColor: [
              "rgba(91, 115, 232, 0.7)", // Jan
              "rgba(91, 115, 232, 0.7)", // Feb
              "rgba(56, 191, 172, 0.7)", // Mar
              "rgba(56, 191, 172, 0.7)", // Apr
              "rgba(56, 191, 172, 0.7)", // May
              "rgba(255, 183, 97, 0.7)", // Jun
              "rgba(255, 183, 97, 0.7)", // Jul
              "rgba(255, 183, 97, 0.7)", // Aug
              "rgba(240, 82, 82, 0.7)", // Sep
              "rgba(240, 82, 82, 0.7)", // Oct
              "rgba(240, 82, 82, 0.7)", // Nov
              "rgba(91, 115, 232, 0.7)", // Dec
            ],
            borderWidth: 0,
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
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                return "Sales: $" + context.parsed.y.toLocaleString();
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

// Report Type Selector
document.querySelectorAll(".report-type-card").forEach((card) => {
  card.addEventListener("click", function () {
    // Remove active class from all cards
    document.querySelectorAll(".report-type-card").forEach((c) => {
      c.classList.remove("active");
    });

    // Add active class to clicked card
    this.classList.add("active");
  });
});
