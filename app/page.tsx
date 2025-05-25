"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import WeatherDisplay from "@/components/weather-display"
import ForecastDisplay from "@/components/forecast-display"
import { getWeatherByLocation, getWeatherByCoords, checkApiKeyValidity } from "@/lib/weather-service"

export default function WeatherApp() {
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [geoLoading, setGeoLoading] = useState(false)
  const [apiKeyStatus, setApiKeyStatus] = useState({ checked: false, valid: true, message: "" })

  useEffect(() => {
    async function validateApiKey() {
      const result = await checkApiKeyValidity()
      setApiKeyStatus({ checked: true, valid: result.valid, message: result.message })
      if (!result.valid) {
        setError(result.message)
      }
    }

    validateApiKey()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!location.trim()) return

    setLoading(true)
    setError("")

    try {
      const { currentWeather, forecastData } = await getWeatherByLocation(location)
      setWeather(currentWeather)
      setForecast(forecastData)
    } catch (err) {
      setError(err.message || "Failed to fetch weather data. Please try again.")
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  const handleGetCurrentLocation = () => {
    setGeoLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setGeoLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { currentWeather, forecastData } = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude,
          )
          setWeather(currentWeather)
          setForecast(forecastData)
          setLocation(`${currentWeather.name}, ${currentWeather.sys.country}`)
        } catch (err) {
          setError(err.message || "Failed to fetch weather data for your location")
          setWeather(null)
          setForecast(null)
        } finally {
          setGeoLoading(false)
        }
      },
      (err) => {
        setError(`Error getting location: ${err.message}`)
        setGeoLoading(false)
      },
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl relative">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/weather-bg.jpg')" }}></div>
      <div className="absolute inset-0 -z-10 bg-black/30 backdrop-blur-md"></div>

      <h1 className="text-4xl font-bold text-center mb-8 text-white">Weather App</h1>

      <Card className="mb-6 shadow-lg border border-gray-200 bg-white/30 backdrop-blur-md">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center">
            <Input
              type="text"
              placeholder="Enter city, zip code, or coordinates..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 rounded-full shadow-md bg-black/70 backdrop-blur-md"
            />
            <Button type="submit" disabled={loading} className="rounded-full px-6 py-2 bg-blue-500 text-white hover:bg-blue-600">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              <span className="ml-2 hidden sm:inline">Search</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleGetCurrentLocation}
              disabled={geoLoading}
              className="rounded-full px-6 py-2 border-blue-500 text-black-500 hover:bg-blue-100"
            >
              {geoLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
              <span className="ml-2 hidden sm:inline">Current Location</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant={error.includes("API key") ? "destructive" : "default"} className="mb-6 shadow-md bg-white/30 backdrop-blur-md">
          <AlertDescription>
            {error.includes("API key") ? (
              <div>
                <p className="font-bold">API Key Error:</p>
                <p>{error}</p>
                <div className="mt-2 text-sm">
                  <p className="mb-1">Please make sure you have:</p>
                  <ol className="list-decimal pl-5 mt-1">
                    <li>
                      Created an account at{" "}
                      <a
                        href="https://openweathermap.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                      >
                        OpenWeatherMap
                      </a>
                    </li>
                    <li>Generated an API key in your account</li>
                    <li>Added the API key to your environment variables as NEXT_PUBLIC_OPENWEATHER_API_KEY</li>
                    <li>Waited for the API key to activate (can take up to 2 hours after creation)</li>
                  </ol>
                </div>
              </div>
            ) : (
              error
            )}
          </AlertDescription>
        </Alert>
      )}

      {weather && (
        <div className="space-y-6">
          <WeatherDisplay weather={weather} />
          {forecast && <ForecastDisplay forecast={forecast} />}
        </div>
      )}

      {!weather && !error && (
        <Card className="bg-white/30 backdrop-blur-md shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-center text-white text-lg">
              Enter a location or use your current location to get weather information
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
