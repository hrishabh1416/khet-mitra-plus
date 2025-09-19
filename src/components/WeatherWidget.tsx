import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Thermometer,
  Droplets,
  Eye,
  Calendar
} from 'lucide-react';

const WeatherWidget = () => {
  const [currentWeather] = useState({
    temperature: '28°C',
    condition: 'Sunny',
    icon: Sun,
    humidity: '65%',
    windSpeed: '12 km/h',
    visibility: '10 km',
    pressure: '1013 hPa'
  });

  const [weeklyForecast] = useState([
    { day: 'Today', temp: '28°C', icon: Sun, condition: 'Sunny', alert: true },
    { day: 'Tue', temp: '26°C', icon: Cloud, condition: 'Cloudy', alert: false },
    { day: 'Wed', temp: '24°C', icon: CloudRain, condition: 'Rain', alert: false },
    { day: 'Thu', temp: '27°C', icon: Sun, condition: 'Sunny', alert: false },
    { day: 'Fri', temp: '25°C', icon: Cloud, condition: 'Cloudy', alert: false },
    { day: 'Sat', temp: '23°C', icon: CloudRain, condition: 'Light Rain', alert: false },
    { day: 'Sun', temp: '26°C', icon: Sun, condition: 'Sunny', alert: false },
  ]);

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
      <CardHeader className="pb-4">
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
                  <Card key={index} className={`text-center ${
                    day.alert ? 'bg-warning/10 border-warning/20' : ''
                  }`}>
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">{day.day}</p>
                      <day.icon className={`w-8 h-8 mx-auto mb-2 ${
                        day.condition === 'Sunny' ? 'text-farming-sun' :
                        day.condition.includes('Rain') ? 'text-blue-500' : 'text-gray-400'
                      }`} />
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
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-farming-sun/20 rounded-full flex items-center justify-center">
                <currentWeather.icon className="w-8 h-8 text-farming-sun" />
              </div>
              <div>
                <p className="text-3xl font-bold">{currentWeather.temperature}</p>
                <p className="text-muted-foreground">{currentWeather.condition}</p>
              </div>
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