<!DOCTYPE html>
<html>

<head>
    <title>Booking Confirmation</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="{{ asset('dist/assets/index-122ea778.css') }}" rel="stylesheet">
</head>

<body class="flex place-content-center">
    <div class="bg-gray-100 h-50 w-screen">
        <div class=" mx-auto mt-8 bg-white shadow-md rounded-md">
            <div class="grid px-6 py-20">
                <h1 class="text-2xl mx-auto">Booking Confirmation</h1>
                <p class="my-10">Hello <span class="font-bold">{{ $data['first_name'] }}</span>,</p>
                <p class="pb-10">Thank you for your booking. Here are the details of your reservation:</p>
                <ul class="flex flex-col gap-y-1 pb-10">
                    <li>Time Slot: <span class="font-semibold">{{ $data['time_slot'] }}</span></li>
                    <li>Date: <span class="font-semibold">{{ $data['date'] }}</span></li>
                </ul>
                <p class="py-5">to edit your booking click the link below</p>
                <p class="text-3xl text-center py-5">{{ $data['pin'] }}</p>
                <button class="place-self-center"><a href="http://localhost:5173/update-manager?pin={{ $data['pin'] }}" class="place-self-center">Here</a> </button>
                <p class="py-10">We look forward to seeing you!</p>
            </div>
            <div class="px-6 py-4 bg-gray-200 text-sm text-gray-600">
                <p>This is an automated message. Please do not reply to this email.</p>
            </div>
        </div>
    </div>
</body>

</html>