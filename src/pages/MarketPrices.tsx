import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  MapPin,
  Calendar,
  ShoppingCart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MarketPrice {
  crop: string;
  price: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  lastUpdated: string;
  minPrice: string;
  maxPrice: string;
}

const MarketPrices = () => {
  const navigate = useNavigate();
  const [selectedMandi, setSelectedMandi] = useState('indore');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [marketData, setMarketData] = useState<MarketPrice[]>([
    {
      crop: 'Soybean',
      price: '4500',
      unit: 'quintal',
      trend: 'up',
      change: '+2.3%',
      lastUpdated: '2 hours ago',
      minPrice: '4200',
      maxPrice: '4800'
    },
    {
      crop: 'Wheat',
      price: '2200',
      unit: 'quintal',
      trend: 'up',
      change: '+1.5%',
      lastUpdated: '1 hour ago',
      minPrice: '2100',
      maxPrice: '2300'
    },
    {
      crop: 'Tomato',
      price: '1500',
      unit: 'quintal',
      trend: 'up',
      change: '+8.2%',
      lastUpdated: '30 min ago',
      minPrice: '1200',
      maxPrice: '1800'
    },
    {
      crop: 'Mustard',
      price: '1500',
      unit: 'quintal',
      trend: 'down',
      change: '-2.1%',
      lastUpdated: '45 min ago',
      minPrice: '1400',
      maxPrice: '1600'
    },
    {
      crop: 'Cotton',
      price: '5800',
      unit: 'quintal',
      trend: 'down',
      change: '-3.2%',
      lastUpdated: '1 hour ago',
      minPrice: '5500',
      maxPrice: '6200'
    },
    {
      crop: 'Gram',
      price: '5000',
      unit: 'quintal',
      trend: 'down',
      change: '-1.8%',
      lastUpdated: '2 hours ago',
      minPrice: '4800',
      maxPrice: '5200'
    },
    {
      crop: 'Onion',
      price: '3200',
      unit: 'quintal',
      trend: 'stable',
      change: '0.0%',
      lastUpdated: '1 hour ago',
      minPrice: '3000',
      maxPrice: '3400'
    },
    {
      crop: 'Potato',
      price: '2800',
      unit: 'quintal',
      trend: 'up',
      change: '+4.1%',
      lastUpdated: '3 hours ago',
      minPrice: '2600',
      maxPrice: '3000'
    }
  ]);

  const mandis = [
    { value: 'indore', label: 'Indore, Madhya Pradesh' },
    { value: 'bhopal', label: 'Bhopal, Madhya Pradesh' },
    { value: 'dewas', label: 'Dewas, Madhya Pradesh' },
    { value: 'ujjain', label: 'Ujjain, Madhya Pradesh' },
    { value: 'khandwa', label: 'Khandwa, Madhya Pradesh' }
  ];

  const refreshPrices = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
      // Could update prices here
    }, 2000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-muted-foreground"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getHighestGainers = () => {
    return marketData
      .filter(item => item.trend === 'up')
      .sort((a, b) => parseFloat(b.change.replace('%', '')) - parseFloat(a.change.replace('%', '')))
      .slice(0, 3);
  };

  const getHighestLosers = () => {
    return marketData
      .filter(item => item.trend === 'down')
      .sort((a, b) => parseFloat(a.change.replace('%', '')) - parseFloat(b.change.replace('%', '')))
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-farming-earth/20 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mandi Prices</h1>
              <p className="text-sm text-muted-foreground">Live market rates and trends</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <Select value={selectedMandi} onValueChange={setSelectedMandi}>
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mandis.map((mandi) => (
                        <SelectItem key={mandi.value} value={mandi.value}>
                          {mandi.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshPrices}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Gainers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getHighestGainers().map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.crop}</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success font-medium">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Losers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getHighestLosers().map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.crop}</span>
                    <div className="flex items-center space-x-1">
                      <TrendingDown className="w-3 h-3 text-destructive" />
                      <span className="text-xs text-destructive font-medium">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Market Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Items</span>
                  <span className="text-sm font-medium">{marketData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rising</span>
                  <span className="text-sm font-medium text-success">
                    {marketData.filter(item => item.trend === 'up').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Falling</span>
                  <span className="text-sm font-medium text-destructive">
                    {marketData.filter(item => item.trend === 'down').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Today's Prices - {mandis.find(m => m.value === selectedMandi)?.label}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {marketData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-lg">{item.crop}</h3>
                      <p className="text-sm text-muted-foreground">Updated {item.lastUpdated}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-2xl font-bold text-primary">₹{item.price}</p>
                        <p className="text-sm text-muted-foreground">per {item.unit}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(item.trend)}
                        <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-1">
                      <p className="text-xs text-muted-foreground">
                        Range: ₹{item.minPrice} - ₹{item.maxPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Market Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-success">Best Selling Time</h4>
                <p className="text-muted-foreground">
                  Morning hours (6-10 AM) typically see higher prices due to fresh arrivals
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-primary">Price Tracking</h4>
                <p className="text-muted-foreground">
                  Monitor prices for 3-5 days before making major selling decisions
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-warning">Quality Matters</h4>
                <p className="text-muted-foreground">
                  Higher grade produce can fetch 10-20% premium over listed prices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;