<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solace Gold Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-black text-white min-h-screen flex">

  <!-- Sidebar -->
  <aside class="w-64 bg-gray-900 p-6 flex flex-col space-y-6">
    <div class="text-2xl font-bold text-gold-400">SolaceGold</div>
    <nav class="flex flex-col gap-4">
      <a href="#" class="hover:bg-gray-700 p-3 rounded-lg transition">🏠 Dashboard</a>
      <a href="#" class="hover:bg-gray-700 p-3 rounded-lg transition">📈 Portfolio</a>
      <a href="#" class="hover:bg-gray-700 p-3 rounded-lg transition">💰 Buy Gold</a>
      <a href="#" class="hover:bg-gray-700 p-3 rounded-lg transition">🔁 Auto-Invest</a>
      <a href="#" class="hover:bg-gray-700 p-3 rounded-lg transition">⚙️ Settings</a>
    </nav>
    <div class="mt-auto">
      <button class="w-full bg-gold-500 text-black font-semibold py-2 rounded-lg hover:bg-gold-400 transition">Logout</button>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 p-10 overflow-y-auto">

    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <h1 class="text-3xl font-bold">Welcome Back</h1>
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-400">Account Balance:</span>
        <span class="text-xl font-bold text-gold-400">€12,450.00</span>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- Portfolio Summary -->
      <div class="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Portfolio Summary</h2>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Total Gold Owned:</span>
            <span>250g</span>
          </div>
          <div class="flex justify-between">
            <span>Today's Gain/Loss:</span>
            <span class="text-green-400">+€120</span>
          </div>
          <div class="flex justify-between">
            <span>Current Gold Price:</span>
            <span>€50/g</span>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-gray-800 rounded-2xl p-6 shadow-lg col-span-2">
        <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul class="divide-y divide-gray-700">
          <li class="py-3 flex justify-between">
            <span>Bought 50g Gold</span>
            <span class="text-gray-400 text-sm">2 days ago</span>
          </li>
          <li class="py-3 flex justify-between">
            <span>Set up Auto-Invest</span>
            <span class="text-gray-400 text-sm">1 week ago</span>
          </li>
          <li class="py-3 flex justify-between">
            <span>Withdrawal Request</span>
            <span class="text-gray-400 text-sm">3 weeks ago</span>
          </li>
        </ul>
      </div>

    </div>

    <!-- Chart Section -->
    <div class="mt-10 bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Gold Price Chart</h2>
      <div class="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
        Chart Placeholder
      </div>
    </div>

  </main>

</body>
</html>
