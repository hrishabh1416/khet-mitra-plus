import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Thermometer,
  Droplets,
  Eye,
  Calendar
} from "lucide-react";

interface WeatherWidgetProps {
  onWeatherUpdate?: (weather: { condition: string; description: string }) => void;
}

const WeatherWidget = ({ onWeatherUpdate }: WeatherWidgetProps) => {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<any[]>([]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return Sun;
      case "clouds":
        return Cloud;
      case "rain":
      case "drizzle":
      case "thunderstorm":
        return CloudRain;
      case "wind":
        return Wind;
      default:
        return Sun;
    }
  };

  const fetchWeather = async () => {
    try {
      // Current weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Gwalior,IN&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      const weatherData = {
        temperature: `${Math.round(data.main.temp)}°C`,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: getWeatherIcon(data.weather[0].main),
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed} km/h`,
        visibility: `${(data.visibility / 1000).toFixed(1)} km`,
        pressure: `${data.main.pressure} hPa`,
      };

      setCurrentWeather(weatherData);

      if (onWeatherUpdate) {
        onWeatherUpdate({
          condition: weatherData.condition,
          description: weatherData.description,
        });
      }

      // 7-day forecast (3-hour interval → pick 1 per day)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=Gwalior,IN&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      const daily = forecastData.list.filter((_: any, index: number) => index % 8 === 0);

      setWeeklyForecast(
        daily.slice(0, 7).map((day: any, i: number) => ({
          day: i === 0 ? "Today" : new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
          temp: `${Math.round(day.main.temp)}°C`,
          icon: getWeatherIcon(day.weather[0].main),
          condition: day.weather[0].main,
          alert: day.weather[0].main.toLowerCase().includes("rain"),
        }))
      );
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!currentWeather) {
    return <p className="text-muted-foreground">Loading weather...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Sun className="w-5 h-5 text-farming-sun" />
            <span>Current Weather</span>
          </CardTitle>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                7-Day Forecast
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>7-Day Weather Forecast</span>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
                {weeklyForecast.map((day, index) => (
                  <Card key={index} className={`text-center ${day.alert ? "bg-warning/10 border-warning/20" : ""}`}>
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">{day.day}</p>
                      <day.icon className="w-8 h-8 mx-auto mb-2 text-farming-sun" />
                      <p className="text-lg font-bold">{day.temp}</p>
                      <p className="text-xs text-muted-foreground">{day.condition}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-farming-sun/20 rounded-full flex items-center justify-center">
              <currentWeather.icon className="w-8 h-8 text-farming-sun" />
            </div>
            <div>
              <p className="text-3xl font-bold">{currentWeather.temperature}</p>
              <p className="text-muted-foreground">{currentWeather.condition}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>{currentWeather.humidity}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-gray-500" />
              <span>{currentWeather.windSpeed}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span>{currentWeather.visibility}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-red-500" />
              <span>{currentWeather.pressure}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
