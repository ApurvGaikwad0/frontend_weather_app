// You'll need to get an API key from OpenWeatherMap
// https://openweathermap.org/api
const API_KEY = "3c3b2c230123858385ab09e038ea4e49"

const BASE_URL = "https://api.openweathermap.org/data/2.5"


function validateApiKey() {
  if (!API_KEY) {
    throw new Error(
      "OpenWeatherMap API key is missing. Please add your API key to the environment variables as NEXT_PUBLIC_OPENWEATHER_API_KEY.",
    )
  }
}

export async function getWeatherByLocation(location: string) {
  try {
    validateApiKey()

    
    const currentWeatherResponse = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`,
      { cache: "no-store" },
    )

    if (!currentWeatherResponse.ok) {
      const errorData = await currentWeatherResponse.json()
      if (errorData.cod === 401) {
        throw new Error("Invalid API key. Please check that your OpenWeatherMap API key is correct and activated.")
      } else {
        throw new Error(errorData.message || "Failed to fetch weather data")
      }
    }

    const currentWeather = await currentWeatherResponse.json()

    
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`,
      { cache: "no-store" },
    )

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data")
    }

    const forecastData = await forecastResponse.json()

    return { currentWeather, forecastData }
  } catch (error) {
    console.error("Error fetching weather:", error)
    throw error
  }
}

export async function getWeatherByCoords(lat: number, lon: number) {
  try {
    validateApiKey()

    
    const currentWeatherResponse = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
      { cache: "no-store" },
    )

    if (!currentWeatherResponse.ok) {
      const errorData = await currentWeatherResponse.json()
      if (errorData.cod === 401) {
        throw new Error("Invalid API key. Please check that your OpenWeatherMap API key is correct and activated.")
      } else {
        throw new Error(errorData.message || "Failed to fetch weather data")
      }
    }

    const currentWeather = await currentWeatherResponse.json()

   
    const forecastResponse = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`, {
      cache: "no-store",
    })

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data")
    }

    const forecastData = await forecastResponse.json()

    return { currentWeather, forecastData }
  } catch (error) {
    console.error("Error fetching weather:", error)
    throw error
  }
}


export async function checkApiKeyValidity() {
  try {
    validateApiKey()

    const response = await fetch(`${BASE_URL}/weather?q=London&units=metric&appid=${API_KEY}`, { cache: "no-store" })

    if (response.status === 401) {
      return { valid: false, message: "API key is invalid or not activated. Please check your OpenWeatherMap account." }
    }

    if (!response.ok) {
      const data = await response.json()
      return { valid: false, message: data.message || "Unknown error occurred" }
    }

    return { valid: true, message: "API key is valid" }
  } catch (error) {
    return {
      valid: false,
      message: error instanceof Error ? error.message : "Failed to validate API key",
    }
  }
}
