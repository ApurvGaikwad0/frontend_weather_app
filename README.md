# Weather App 🌦️

This is a **Weather App** built using **React** and **Next.js**. The app allows users to search for weather data by entering a city, zip code, or coordinates. It provides current weather details and a 5-day forecast for the selected location.

---

## Features

- 🌍 **Search Weather by Location**: Enter a city name, zip code, or coordinates to get weather data.
- 📍 **Current Location Weather**: Fetch weather data for your current location using the browser's geolocation API.
- 📊 **Weather Details**: Displays temperature, humidity, wind speed, pressure, and visibility.
- 📅 **5-Day Forecast**: View a 5-day weather forecast with daily summaries.
- 🌗 **Dark/Light Mode**: Supports theme switching for better user experience.
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices.

---

## Technologies Used

- **React**: For building the user interface.
- **Next.js**: For server-side rendering and routing.
- **OpenWeatherMap API**: For fetching weather data.
- **CSS Modules**: For styling components.
- **Geolocation API**: For fetching the user's current location.

---

## Prerequisites

Before running the app locally, ensure you have the following installed:

- **Node.js** (v16 or higher): [Download Node.js](https://nodejs.org/)
- **pnpm** (preferred) or **npm**: Install `pnpm` globally using:
  ```sh
  npm install -g pnpm
  ```

---

## How to Run Locally

Follow these steps to set up and run the app on your local machine:

### 1. Clone the Repository
Clone the project from GitHub:
```sh
git clone https://github.com/ApurvGaikwad0/frontend_weather_app.git
```

Navigate to the project directory:
```sh
cd frontend_weather_app
```

### 2. Install Dependencies
Install the required dependencies using `pnpm`:
```sh
pnpm install
```

If you prefer `npm`, use:
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root of the project and add your OpenWeatherMap API key:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key from [OpenWeatherMap](https://openweathermap.org/api).

### 4. Start the Development Server
Run the following command to start the development server:
```sh
pnpm dev
```

If using `npm`, run:
```sh
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

1. Open the app in your browser at `http://localhost:3000`.
2. Use the search bar to enter a city name, zip code, or coordinates.
3. Click the "Search" button to fetch weather data.
4. Alternatively, click "Use Current Location" to get weather data for your current location.
5. View the current weather and 5-day forecast.

---

## Troubleshooting

- **Permission Denied for Geolocation**: Ensure your browser has permission to access your location.
- **Incorrect Weather for Zip Code**: Ensure the zip code includes the correct country code (e.g., `94040,us`).
- **API Key Issues**: Verify that your API key is valid and added to the `.env.local` file.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API.
- [Next.js](https://nextjs.org/) for the framework.
- [React](https://reactjs.org/) for the UI library.

---

Feel free to customize this `README.md` file further based on your specific project details!