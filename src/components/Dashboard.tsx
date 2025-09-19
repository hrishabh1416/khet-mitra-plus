import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertTriangle,
  Leaf,
  ShoppingCart,
  Bot,
  Camera,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import LocationSelector from './LocationSelector';
import WeatherWidget from './WeatherWidget';

interface DashboardProps {
  onFeatureClick: (feature: string) => void;
}

const Dashboard = ({ onFeatureClick }: DashboardProps) => {
  const [locationData, setLocationData] = useState<{lat: number, lng: number, address: string} | null>(null);

  const marketPrices = [
    { crop: 'Soybean', price: '₹4500', trend: 'up', change: '+2%' },
    { crop: 'Wheat', price: '₹2200', trend: 'up', change: '+1%' },
    { crop: 'Cotton', price: '₹5800', trend: 'down', change: '-3%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-farming-earth/20 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Leaf className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">KrishiMitra</h1>
          </div>
          <LocationSelector 
            onLocationSelect={setLocationData}
            currentLocation={locationData || undefined}
          />
        </div>

        {/* Weather Alert */}
        <Card className="bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20 animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-warning" />
              <div>
                <p className="font-medium text-foreground">Weather Alert: High winds expected</p>
                <p className="text-sm text-muted-foreground">Secure loose equipment and check crop supports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Summary */}
        <WeatherWidget />

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* AI Assistant */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: '400ms' }}
            onClick={() => onFeatureClick('ai-assistant')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">Ask questions, get expert farming advice</p>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                Ask Question
              </Button>
            </CardContent>
          </Card>

          {/* Disease Diagnosis */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: '600ms' }}
            onClick={() => onFeatureClick('disease-diagnosis')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Disease Diagnosis</h3>
              <p className="text-sm text-muted-foreground">Snap a photo to identify crop diseases</p>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                Take Photo
              </Button>
            </CardContent>
          </Card>

          {/* Crop Recommendations */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: '800ms' }}
            onClick={() => onFeatureClick('crop-recommendations')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-farming-leaf/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-farming-leaf" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Crop Recommendations</h3>
              <p className="text-sm text-muted-foreground">Find best crops for your soil and season</p>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                Get Recommendations
              </Button>
            </CardContent>
          </Card>

          {/* Market Prices */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: '1000ms' }}
            onClick={() => onFeatureClick('market-prices')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Market Prices</h3>
              <p className="text-sm text-muted-foreground">Live mandi prices and trends</p>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                View Prices
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Market Overview */}
        <Card className="animate-slide-up" style={{ animationDelay: '1200ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span>Today's Market Highlights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketPrices.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{item.crop}</p>
                    <p className="text-lg font-bold text-primary">{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span className={`text-sm font-medium ${
                      item.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;