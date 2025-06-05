# MasterCutz

A web app for a barber shop where clients can book appointments through it, ask the chatbot for every question related to the shop, etc. Clients get an SMS when the appointment is set.
It also serves as a tool for managing the shop. Shop managers can check the appointments, staff, or finances, while the barbers can only check their appointments and their finances.

## Features

- **User Authentication:** Secure login system to register and authenticate users (managers/barbers).
- **Book Appointment:** Clients can book appointments themselves and get notified when it is set.
- **Chatbot:** A Google Gemini AI trained chatbot that answers every question related to the shop (prices, location, staff, open hours, etc).
- **Dashboard:** Managers and barbers can view their scheduled appointments, set appointments themselves, check their finances, etc.

## Technologies Used

- **Frontend:** React.js, Vite, Zustand, Axios, Tailwind, React Router, etc.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB with Mongoose.
- **Authentication:** JWT (JSON Web Token).
- **Deployment:** Netlify (Frontend), Render (Backend).

## Prerequisites

- **Node.js** (version 18+ recommended)
- **npm** (for package management)

## Installation

- **1. Clone repository**

`git clone https://github.com/ArsenZuna/mastercutz-backend.git`
`git clone https://github.com/ArsenZuna/mastercutz-frontend.git`

`cd mastercutz-backend`
`cd mastercutz-frontend`

- **2. Install dependencies**

`npm install`

- **3. Start development server**

`npm start` (backend)
`npm run dev` (frontend)

- **4. Create .env files for MongoDB connection or Vite API calls**

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

- **Licensed**
