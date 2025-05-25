import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, getWeatherIcon } from "@/lib/utils"
import styles from '../styles/Weather.module.css';

interface WeatherDisplayProps {
  weather: any
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  if (!weather) return null

  const { name, sys, main, weather: conditions, wind, visibility } = weather

  const weatherCondition = conditions[0]
  const iconUrl = getWeatherIcon(weatherCondition.icon)
  const date = formatDate(new Date())

  return (
    <div className={styles.container}>
      <img 
        src="/weather-bg.jpg" 
        alt="Weather background" 
        className={styles.backgroundImage}
      />

      <Card className="overflow-hidden bg-white/30 backdrop-blur-md shadow-lg rounded-xl border border-white/20">
        <CardHeader className="bg-white/20 pb-2 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-black">
                {name}, {sys.country}
              </CardTitle>
              <p className="text-sm text-gray-700">{date}</p>
              <p className="text-sm font-medium mt-1 text-gray-800">{weatherCondition.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <img src={iconUrl || "/placeholder.svg"} alt={weatherCondition.description} className="w-16 h-16" />
                <span className="text-4xl font-bold text-black">{Math.round(main.temp)}°C</span>
              </div>
              <p className="text-sm text-gray-700">Feels like {Math.round(main.feels_like)}°C</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-2 bg-white/20 backdrop-blur-md rounded-md shadow-md border border-white/10">
              <p className="text-sm text-gray-700">Humidity</p>
              <p className="font-medium text-black">{main.humidity}%</p>
            </div>
            <div className="text-center p-2 bg-white/20 backdrop-blur-md rounded-md shadow-md border border-white/10">
              <p className="text-sm text-gray-700">Wind</p>
              <p className="font-medium text-black">{Math.round(wind.speed * 3.6)} km/h</p>
            </div>
            <div className="text-center p-2 bg-white/20 backdrop-blur-md rounded-md shadow-md border border-white/10">
              <p className="text-sm text-gray-700">Pressure</p>
              <p className="font-medium text-black">{main.pressure} hPa</p>
            </div>
            <div className="text-center p-2 bg-white/20 backdrop-blur-md rounded-md shadow-md border border-white/10">
              <p className="text-sm text-gray-700">Visibility</p>
              <p className="font-medium text-black">{(visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <span className="text-gray-700">Min: </span>
              <span className="font-medium text-black">{Math.round(main.temp_min)}°C</span>
            </div>
            <div>
              <span className="text-gray-700">Max: </span>
              <span className="font-medium text-black">{Math.round(main.temp_max)}°C</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
