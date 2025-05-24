import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDay, getWeatherIcon } from "@/lib/utils"

interface ForecastDisplayProps {
  forecast: any
}

export default function ForecastDisplay({ forecast }: ForecastDisplayProps) {
  if (!forecast || !forecast.list) return null

  // Group forecast data by day
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000)
    const day = date.toISOString().split("T")[0]

    if (!acc[day]) {
      acc[day] = []
    }

    acc[day].push(item)
    return acc
  }, {})

  // Get one forecast per day (at noon if available)
  const fiveDayForecast = Object.keys(dailyForecasts)
    .slice(0, 5)
    .map((day) => {
      const dayData = dailyForecasts[day]
      // Try to get forecast for noon, or use the first one
      const noonForecast =
        dayData.find((item) => {
          const date = new Date(item.dt * 1000)
          return date.getHours() >= 12 && date.getHours() < 15
        }) || dayData[0]

      return noonForecast
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {fiveDayForecast.map((item, index) => {
            const date = new Date(item.dt * 1000)
            const dayName = formatDay(date)
            const weatherCondition = item.weather[0]
            const iconUrl = getWeatherIcon(weatherCondition.icon)

            return (
              <div key={index} className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
                <p className="font-medium">{dayName}</p>
                <img
                  src={iconUrl || "/placeholder.svg"}
                  alt={weatherCondition.description}
                  className="w-12 h-12 my-2"
                />
                <p className="text-sm text-center">{weatherCondition.main}</p>
                <div className="flex justify-between w-full mt-1">
                  <span className="text-sm">{Math.round(item.main.temp_min)}°</span>
                  <span className="text-sm font-medium">{Math.round(item.main.temp_max)}°</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
