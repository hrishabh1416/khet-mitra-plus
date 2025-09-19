import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Leaf, TrendingUp, Clock, DollarSign, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CropRecommendation {
  name: string;
  image: string;
  profitability: number;
  estimatedProfit: string;
  investmentCost: string;
  duration: string;
  hardworkLevel: number;
  isTopPick: boolean;
  soilSuitability: string[];
  seasonAdvice: string;
}

const CropRecommendations = () => {
  const navigate = useNavigate();
  const [selectedSoil, setSelectedSoil] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const soilTypes = [
    { value: 'black', label: 'Black Cotton Soil (Regur)' },
    { value: 'red', label: 'Red Sandy Soil' },
    { value: 'alluvial', label: 'Alluvial Soil' },
    { value: 'laterite', label: 'Laterite Soil' },
    { value: 'clay', label: 'Clay Soil' },
    { value: 'loamy', label: 'Loamy Soil' }
  ];

  const seasons = [
    { value: 'kharif', label: 'Kharif (Monsoon) - Jun-Oct' },
    { value: 'rabi', label: 'Rabi (Winter) - Nov-Mar' },
    { value: 'zaid', label: 'Zaid (Summer) - Apr-Jun' }
  ];

  const getRecommendations = () => {
    if (!selectedSoil || !selectedSeason) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecommendations: CropRecommendation[] = [
        {
          name: 'Soybean',
          image: '🌱',
          profitability: 85,
          estimatedProfit: '₹40,000/Acre',
          investmentCost: '₹18,000/Acre',
          duration: '90-100 Days',
          hardworkLevel: 4,
          isTopPick: true,
          soilSuitability: ['Black Cotton', 'Red Sandy', 'Alluvial'],
          seasonAdvice: 'Excellent choice for Kharif season. High demand and good monsoon crop.'
        },
        {
          name: 'Wheat',
          image: '🌾',
          profitability: 78,
          estimatedProfit: '₹35,000/Acre',
          investmentCost: '₹15,000/Acre',
          duration: '120-130 Days',
          hardworkLevel: 4,
          isTopPick: true,
          soilSuitability: ['Alluvial', 'Loamy', 'Clay'],
          seasonAdvice: 'Perfect for Rabi season. Stable market prices and government support.'
        },
        {
          name: 'Gram (Chickpea)',
          image: '🫛',
          profitability: 72,
          estimatedProfit: '₹38,000/Acre',
          investmentCost: '₹17,000/Acre',
          duration: '95-105 Days',
          hardworkLevel: 3,
          isTopPick: false,
          soilSuitability: ['Black Cotton', 'Red Sandy'],
          seasonAdvice: 'Good protein crop with steady demand. Requires minimal irrigation.'
        },
        {
          name: 'Cotton',
          image: '☁️',
          profitability: 68,
          estimatedProfit: '₹45,000/Acre',
          investmentCost: '₹25,000/Acre',
          duration: '150-180 Days',
          hardworkLevel: 5,
          isTopPick: false,
          soilSuitability: ['Black Cotton', 'Alluvial'],
          seasonAdvice: 'High investment but good returns. Requires careful pest management.'
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full ${
          i < level ? 'bg-warning' : 'bg-muted'
        }`}
      />
    ));
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
            <div className="w-10 h-10 bg-farming-leaf/20 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-farming-leaf" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Crop Recommendations</h1>
              <p className="text-sm text-muted-foreground">Find the best crops for your land</p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Your Farming Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Soil Type</label>
                <Select value={selectedSoil} onValueChange={setSelectedSoil}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil.value} value={soil.value}>
                        {soil.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Season</label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season.value} value={season.value}>
                        {season.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={getRecommendations}
                  disabled={!selectedSoil || !selectedSeason || isLoading}
                  className="w-full"
                  variant="success"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {recommendations.length > 0 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Crop Recommendations for {selectedSoil && soilTypes.find(s => s.value === selectedSoil)?.label}
              </h2>
              <p className="text-muted-foreground">
                Based on soil type, season, and current market conditions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((crop, index) => (
                <Card 
                  key={index}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    crop.isTopPick ? 'ring-2 ring-success shadow-lg' : ''
                  }`}
                >
                  {crop.isTopPick && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Top Pick
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="text-6xl mb-3">{crop.image}</div>
                    <CardTitle className="text-xl">{crop.name}</CardTitle>
                    <div className="flex items-center justify-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-success">
                        {crop.profitability}% Profitability
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                          <DollarSign className="w-3 h-3" />
                          <span>Est. Profit</span>
                        </div>
                        <p className="font-semibold text-success">{crop.estimatedProfit}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                          <Clock className="w-3 h-3" />
                          <span>Duration</span>
                        </div>
                        <p className="font-medium">{crop.duration}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Investment Cost</p>
                      <p className="font-semibold">{crop.investmentCost}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Hardwork Required</span>
                        <div className="flex space-x-1">
                          {renderStars(crop.hardworkLevel)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Season Advice</p>
                      <p className="text-sm">{crop.seasonAdvice}</p>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      View Detailed Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Tips */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Important Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-medium text-success">Market Analysis</h4>
                    <p className="text-muted-foreground">
                      Check current market prices and demand trends before final decision
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-primary">Water Availability</h4>
                    <p className="text-muted-foreground">
                      Ensure adequate water supply matches crop requirements
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-warning">Risk Assessment</h4>
                    <p className="text-muted-foreground">
                      Consider weather patterns and pest history in your region
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {!recommendations.length && !isLoading && (
          <Card className="text-center py-12">
            <CardContent>
              <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Ready to Get Recommendations?</h3>
              <p className="text-muted-foreground mb-4">
                Select your soil type and season to see the best crop options for your farm
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CropRecommendations;