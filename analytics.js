// DOM Elements
const sidebar = document.getElementById("sidebar");
const contentWrapper = document.getElementById("content-wrapper");
const menuToggle = document.getElementById("menu-toggle");
const overlay = document.getElementById("overlay");

// Toggle Sidebar
menuToggle.addEventListener("click", function () {
  sidebar.classList.toggle("sidebar-visible");
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

// Initialize DateRangePicker
$(function () {
  $("#date-range-picker").daterangepicker({
    opens: "left",
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
  });
});

// Initial call and add event listener
window.addEventListener("resize", handleResize);
handleResize();

// Initialize Charts for Analytics
document.addEventListener("DOMContentLoaded", function () {
  // Sales Performance Chart
  const salesPerformanceChart = new Chart(
    document.getElementById("salesPerformanceChart"),
    {
      type: "line",
      data: {
        labels: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 6",
          "Week 7",
          "Week 8",
          "Week 9",
          "Week 10",
          "Week 11",
          "Week 12",
        ],
        datasets: [
          {
            label: "Revenue",
            data: [
              35000, 38500, 37200, 36800, 39500, 42000, 45800, 43200, 48500,
              46800, 49200, 52000,
            ],
            borderColor: "#5B73E8",
            backgroundColor: "rgba(91, 115, 232, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            yAxisID: "y",
          },
          {
            label: "Units Sold",
            data: [650, 720, 680, 710, 750, 790, 850, 810, 900, 880, 920, 980],
            borderColor: "#38BFAC",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0.3,
            fill: false,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
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
                if (context.dataset.label === "Revenue") {
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
            type: "linear",
            display: true,
            position: "left",
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
          y1: {
            type: "linear",
            display: true,
            position: "right",
            beginAtZero: true,
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: function (value) {
                return value + " units";
              },
            },
          },
        },
      },
    }
  );

  // Sales By Category Chart
  const salesByCategoryChart = new Chart(
    document.getElementById("salesByCategoryChart"),
    {
      type: "doughnut",
      data: {
        labels: ["Electronics", "Clothing", "Furniture", "Others"],
        datasets: [
          {
            data: [45, 25, 15, 15],
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

  // Sales By Channel Chart
  const salesByChannelChart = new Chart(
    document.getElementById("salesByChannelChart"),
    {
      type: "bar",
      data: {
        labels: [
          "Online Store",
          "Distributors",
          "Retail Partners",
          "Direct Sales",
          "Marketplace",
        ],
        datasets: [
          {
            label: "Units Sold",
            data: [420, 310, 250, 180, 95],
            backgroundColor: [
              "rgba(91, 115, 232, 0.8)",
              "rgba(16, 185, 129, 0.8)",
              "rgba(255, 183, 97, 0.8)",
              "rgba(14, 165, 233, 0.8)",
              "rgba(240, 82, 82, 0.8)",
            ],
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
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            padding: 10,
            displayColors: true,
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
      },
    }
  );

  // Inventory Levels Chart
  const inventoryLevelsChart = new Chart(
    document.getElementById("inventoryLevelsChart"),
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
            label: "Electronics",
            data: [850, 820, 780, 820, 760, 740, 780, 750, 790, 820, 860, 890],
            borderColor: "#5B73E8",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: "Clothing",
            data: [650, 680, 640, 620, 580, 550, 520, 480, 510, 540, 580, 620],
            borderColor: "#10B981",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: "Furniture",
            data: [380, 350, 320, 310, 290, 280, 260, 250, 270, 300, 330, 360],
            borderColor: "#FFB761",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: "Others",
            data: [420, 410, 390, 380, 350, 340, 320, 310, 330, 360, 390, 420],
            borderColor: "#F05252",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
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
                return value + " units";
              },
            },
          },
        },
      },
    }
  );

  // Inventory Status Chart
  const inventoryStatusChart = new Chart(
    document.getElementById("inventoryStatusChart"),
    {
      type: "doughnut",
      data: {
        labels: ["Optimal", "Low Stock", "Out of Stock"],
        datasets: [
          {
            data: [75, 15, 10],
            backgroundColor: [
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

  // Turnover Rates Chart
  const turnoverRatesChart = new Chart(
    document.getElementById("turnoverRatesChart"),
    {
      type: "bar",
      data: {
        labels: [
          "Electronics",
          "Clothing",
          "Furniture",
          "Accessories",
          "Gadgets",
        ],
        datasets: [
          {
            label: "Turnover Rate",
            data: [8.7, 12.3, 6.2, 9.8, 11.5],
            backgroundColor: [
              "rgba(91, 115, 232, 0.8)",
              "rgba(16, 185, 129, 0.8)",
              "rgba(255, 183, 97, 0.8)",
              "rgba(14, 165, 233, 0.8)",
              "rgba(240, 82, 82, 0.8)",
            ],
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
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            displayColors: true,
            callbacks: {
              label: function (context) {
                return "Turnover Rate: " + context.parsed.y + " times/year";
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
                return value + "x";
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
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [
          {
            label: "New Customers",
            data: [85, 92, 105, 110, 125, 138, 142, 156, 168],
            borderColor: "#5B73E8",
            backgroundColor: "rgba(91, 115, 232, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: "Returning Customers",
            data: [120, 135, 150, 162, 178, 195, 215, 230, 248],
            borderColor: "#10B981",
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
      },
    }
  );

  // Customer Segments Chart
  const customerSegmentsChart = new Chart(
    document.getElementById("customerSegmentsChart"),
    {
      type: "doughnut",
      data: {
        labels: ["Premium", "Regular", "Occasional", "One-time"],
        datasets: [
          {
            data: [35, 40, 15, 10],
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

  // Satisfaction Gauge Chart 1
  const satisfactionGaugeChart1 = new Chart(
    document.getElementById("satisfactionGaugeChart1"),
    {
      type: "doughnut",
      data: {
        labels: ["Satisfied", "Remaining"],
        datasets: [
          {
            data: [94, 6],
            backgroundColor: [
              "#10B981", // Success
              "#E5E7EB", // Light
            ],
            borderWidth: 0,
            hoverOffset: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        rotation: -90,
        circumference: 180,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    }
  );

  // Satisfaction Gauge Chart 2
  const satisfactionGaugeChart2 = new Chart(
    document.getElementById("satisfactionGaugeChart2"),
    {
      type: "doughnut",
      data: {
        labels: ["NPS", "Remaining"],
        datasets: [
          {
            data: [76, 24],
            backgroundColor: [
              "#5B73E8", // Primary
              "#E5E7EB", // Light
            ],
            borderWidth: 0,
            hoverOffset: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        rotation: -90,
        circumference: 180,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    }
  );

  // Sales Forecast Chart
  const salesForecastChart = new Chart(
    document.getElementById("salesForecastChart"),
    {
      type: "line",
      data: {
        labels: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
          "Jan",
          "Feb",
          "Mar",
        ],
        datasets: [
          {
            label: "Historical Sales",
            data: [
              72000, 75000, 79500, 83000, 78000, 80500, 86000, 92000, 98000,
              88000, 84000, 82000,
            ],
            borderColor: "#6B7280",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3,
            pointStyle: "circle",
          },
          {
            label: "Forecasted Sales",
            data: [
              82000, 86000, 90000, 94000, 89000, 92000, 97000, 103000, 110000,
              98000, 94000, 92000,
            ],
            borderColor: "#5B73E8",
            backgroundColor: "rgba(91, 115, 232, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointStyle: "rectRot",
          },
          {
            label: "Upper Bound",
            data: [
              86000, 90000, 95000, 99000, 94000, 97000, 102000, 108000, 115000,
              103000, 99000, 97000,
            ],
            borderColor: "rgba(16, 185, 129, 0.5)",
            backgroundColor: "transparent",
            borderWidth: 1,
            borderDash: [5, 5],
            tension: 0.3,
            pointStyle: false,
            pointRadius: 0,
          },
          {
            label: "Lower Bound",
            data: [
              78000, 82000, 85000, 89000, 84000, 87000, 92000, 98000, 105000,
              93000, 89000, 87000,
            ],
            borderColor: "rgba(240, 82, 82, 0.5)",
            backgroundColor: "transparent",
            borderWidth: 1,
            borderDash: [5, 5],
            tension: 0.3,
            pointStyle: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
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
            beginAtZero: false,
            grid: {
              borderDash: [3, 3],
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              callback: function (value) {
                return "$" + value / 1000 + "k";
              },
            },
          },
        },
      },
    }
  );

  // Category Forecast Chart
  const categoryForecastChart = new Chart(
    document.getElementById("categoryForecastChart"),
    {
      type: "bar",
      data: {
        labels: [
          "Electronics",
          "Clothing",
          "Furniture",
          "Accessories",
          "Gadgets",
        ],
        datasets: [
          {
            label: "Current Sales",
            data: [180000, 120000, 75000, 45000, 65000],
            backgroundColor: "rgba(91, 115, 232, 0.7)",
            borderWidth: 0,
            borderRadius: 4,
          },
          {
            label: "Forecasted Sales",
            data: [215000, 135000, 70000, 52000, 78000],
            backgroundColor: "rgba(14, 165, 233, 0.7)",
            borderWidth: 0,
            borderRadius: 4,
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
                return "$" + value / 1000 + "k";
              },
            },
          },
        },
      },
    }
  );

  // Inventory Forecast Chart
  const inventoryForecastChart = new Chart(
    document.getElementById("inventoryForecastChart"),
    {
      type: "line",
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [
          {
            label: "Projected Inventory",
            data: [2500, 2350, 2200, 2050, 1900, 1750],
            borderColor: "#5B73E8",
            backgroundColor: "rgba(91, 115, 232, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: "Reorder Point",
            data: [1800, 1800, 1800, 1800, 1800, 1800],
            borderColor: "#F05252",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0,
            fill: false,
          },
          {
            label: "Projected Demand",
            data: [800, 850, 900, 950, 1000, 1050],
            borderColor: "#10B981",
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
                  ": " +
                  context.parsed.y.toLocaleString() +
                  " units"
                );
              },
            },
          },
          annotation: {
            annotations: {
              reorderPoint: {
                type: "line",
                scaleID: "y",
                value: 1800,
                borderColor: "#F05252",
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  content: "Reorder Point",
                  enabled: true,
                  position: "end",
                },
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
                return value + " units";
              },
            },
          },
        },
      },
    }
  );
});
