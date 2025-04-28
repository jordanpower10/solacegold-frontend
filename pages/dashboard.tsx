<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SolaceGold Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-black text-white min-h-screen flex flex-col items-center p-6">

  <!-- Logo -->
  <header class="w-full flex justify-center mb-8">
    <img src="https://i.postimg.cc/zf1VnDV0/Gold-solace-logo.png" alt="SolaceGold Logo" class="h-10">
  </header>

  <!-- Account Section -->
  <section class="text-center space-y-4">
    <h1 class="text-2xl font-bold">Your account</h1>
    <div class="text-4xl font-bold">€12,530.75</div>
    <div class="text-gray-400">
      6.754 oz 
      <span class="text-green-400 ml-2">1.42% in the past day</span>
    </div>
  </section>

  <!-- Action Buttons -->
  <section class="flex gap-6 mt-10">
    <button class="flex flex-col items-center justify-center bg-gray-900 border border-gray-700 p-6 rounded-xl hover:bg-gray-800 transition">
      <div class="text-2xl mb-2">€</div>
      <div>Deposit</div>
    </button>
    <button class="flex flex-col items-center justify-center bg-gray-900 border border-gray-700 p-6 rounded-xl hover:bg-gray-800 transition">
      <div class="text-2xl mb-2">⬆️</div>
      <div>Withdraw</div>
    </button>
    <button class="flex flex-col items-center justify-center bg-gray-900 border border-gray-700 p-6 rounded-xl hover:bg-gray-800 transition">
      <div class="text-2xl mb-2">🪙</div>
      <div>Buy Gold</div>
    </button>
  </section>

  <!-- Gold Price Section -->
  <section class="w-full max-w-2xl mt-12 bg-gray-900 border border-gray-700 rounded-2xl p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Gold price</h2>
      <div class="text-white font-semibold">€2922.01</div>
    </div>
    <div class="h-48 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
      Chart Placeholder
    </div>
  </section>

</body>
</html>
