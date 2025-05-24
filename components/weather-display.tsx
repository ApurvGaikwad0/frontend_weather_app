import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, getWeatherIcon } from "@/lib/utils"

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
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/10 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">
              {name}, {sys.country}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{date}</p>
            <p className="text-sm font-medium mt-1">{weatherCondition.description}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <img src={iconUrl || "/placeholder.svg"} alt={weatherCondition.description} className="w-16 h-16" />
              <span className="text-4xl font-bold">{Math.round(main.temp)}°C</span>
            </div>
            <p className="text-sm">Feels like {Math.round(main.feels_like)}°C</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="font-medium">{main.humidity}%</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-sm text-muted-foreground">Wind</p>
            <p className="font-medium">{Math.round(wind.speed * 3.6)} km/h</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-sm text-muted-foreground">Pressure</p>
            <p className="font-medium">{main.pressure} hPa</p>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-md">
            <p className="text-sm text-muted-foreground">Visibility</p>
            <p className="font-medium">{(visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-sm">
          <div>
            <span className="text-muted-foreground">Min: </span>
            <span className="font-medium">{Math.round(main.temp_min)}°C</span>
          </div>
          <div>
            <span className="text-muted-foreground">Max: </span>
            <span className="font-medium">{Math.round(main.temp_max)}°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
