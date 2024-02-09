<!DOCTYPE html>
<html>
<head>
    <title>Booking Confirmation</title>
    <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="{{ asset('frontend/assets/index-abf05e8a.css') }}" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="max-w-md mx-auto mt-8 bg-white shadow-md rounded-md">
        <div class="px-6 py-8">
            <h1 class="text-2xl mb-4">Booking Confirmation</h1>
            <p class="mb-4">Hello <span class="font-bold">{{ $data['first_name'] }}</span>,</p>
            <p class="mb-4">Thank you for your booking. Here are the details of your reservation:</p>
            <ul class="mb-4">
                <li>Time Slot: {{ $data['time_slot'] }}</li>
                <li>Date: {{ $data['date'] }}</li>
            </ul>
            <p>We look forward to seeing you!</p>
        </div>
        <div class="px-6 py-4 bg-gray-200 text-sm text-gray-600">
            <p>This email was sent from My Company. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>