<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SolaceGold Dashboard</title>
  <!-- Font Awesome for icons -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    integrity="sha512-p1CmR5zdW/OWw8UoBRzjm6SM+U3lB+FQ9GGWdVb3s7Sv0Yc2jtsH3Ogx1kwH2Z9+oK4rdAHOsgKZfVd8vTOa0w=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    /* Global styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      background-color: #000;
      color: #eee;
      font-family: "Helvetica Neue", Arial, sans-serif;
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      width: 100%;
    }
    .logo {
      display: block;
      margin: 0 auto 20px;
      width: 120px;
      height: auto;
    }
    h1 {
      font-size: 32px;
      font-weight: 400;
      margin-bottom: 20px;
    }
    .balance {
      font-size: 48px;
      font-weight: 400;
      margin-bottom: 8px;
    }
    .subtext {
      font-size: 16px;
      color: #888;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 30px;
    }
    .subtext .percent {
      color: #3fc56d;
    }

    .actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 40px;
    }
    .action-btn {
      background: none;
      border: 1px solid #333;
      border-radius: 12px;
      padding: 20px 10px;
      font-size: 16px;
      color: #eee;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      transition: background 0.2s, border-color 0.2s;
    }
    .action-btn:hover {
      background: #111;
      border-color: #555;
    }
    .action-btn i {
      font-size: 24px;
    }

    .chart-card {
      background: none;
      border: 1px solid #333;
      border-radius: 12px;
      padding: 20px;
    }
    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 16px;
    }
    .chart-header span:last-child {
      font-size: 18px;
    }
    #goldChart {
      width: 100% !important;
      height: 200px !important;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Your logo -->
    <img
      src="https://i.postimg.cc/zf1VnDV0/Gold-solace-logo.png"
      alt="SolaceGold Logo"
      class="logo"
    />
    <h1>Your account</h1>
    <div class="balance">€12,530,75</div>
    <div class="subtext">
      <span>6.754 oz</span>
      <span class="percent">1,42% in the past day</span>
    </div>

    <div class="actions">
      <button class="action-btn">
        <i class="fa-solid fa-euro-sign"></i>
        <span>Deposit</span>
      </button>
      <button class="action-btn">
        <i class="fa-solid fa-arrow-up-from-bracket"></i>
        <span>Withdraw</span>
      </button>
      <button class="action-btn">
        <i class="fa-solid fa-ingot"></i>
        <span>Buy gold</span>
      </button>
    </div>

    <div class="chart-card">
      <div class="chart-header">
        <span>Gold price</span>
        <span>€ 2922.01</span>
      </div>
      <canvas id="goldChart"></canvas>
    </div>
  </div>

  <script>
    const ctx = document.getElementById('goldChart').getContext('2d');
    const goldChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [{
          label: 'Gold Price',
          data: [1800, 1850, 1820, 1880, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250],
          borderWidth: 2,
          tension: 0.4,
          fill: false,
          borderColor: '#d4af37'
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      }
    });
  </script>
</body>
</html>
