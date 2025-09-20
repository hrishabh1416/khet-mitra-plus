import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Leaf,
  TrendingUp,
  Droplets,
  Sun,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Sprout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const CropRecommendations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [soilReport, setSoilReport] = useState<File | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [useAdvancedMode, setUseAdvancedMode] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSoilReport(file);
      toast({
        title: "Soil Report Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate API call with dummy data
    setTimeout(() => {
      if (useAdvancedMode && soilReport) {
        // Advanced recommendations based on soil report
        setRecommendations([
          {
            crop: 'Wheat',
            suitability: 95,
            season: 'Rabi',
            expectedYield: '45-50 quintals/hectare',
            profitability: 'High',
            waterRequirement: 'Medium',
            fertilizers: ['Urea: 120 kg/hectare', 'DAP: 100 kg/hectare', 'Potash: 60 kg/hectare'],
            practices: ['Deep plowing in summer', 'Seed treatment with fungicide', 'Timely irrigation'],
            marketPrice: '₹2,200/quintal',
            reason: 'Optimal pH (6.8), high organic matter (2.3%), adequate nitrogen levels'
          },
          {
            crop: 'Mustard',
            suitability: 88,
            season: 'Rabi',
            expectedYield: '18-22 quintals/hectare',
            profitability: 'Medium-High',
            waterRequirement: 'Low',
            fertilizers: ['Urea: 80 kg/hectare', 'DAP: 80 kg/hectare', 'Potash: 40 kg/hectare'],
            practices: ['Line sowing', 'Weed management', 'Aphid control'],
            marketPrice: '₹5,500/quintal',
            reason: 'Good drainage, suitable temperature range, low water requirement matches soil profile'
          },
          {
            crop: 'Chickpea',
            suitability: 82,
            season: 'Rabi',
            expectedYield: '20-25 quintals/hectare',
            profitability: 'High',
            waterRequirement: 'Low',
            fertilizers: ['DAP: 100 kg/hectare', 'Potash: 50 kg/hectare', 'Rhizobium culture'],
            practices: ['Seed inoculation', 'Proper drainage', 'Pod borer management'],
            marketPrice: '₹4,800/quintal',
            reason: 'Nitrogen-fixing legume, suits analyzed soil nutrients, good market demand'
          }
        ]);
      } else {
        // Basic recommendations
        const basicRecommendations = [
          {
            crop: 'Wheat',
            suitability: 85,
            season: 'Rabi',
            expectedYield: '40-45 quintals/hectare',
            profitability: 'High',
            waterRequirement: 'Medium',
            fertilizers: ['Standard NPK recommendations'],
            practices: ['Follow local agricultural practices'],
            marketPrice: '₹2,200/quintal',
            reason: `Suitable for ${soilType} soil in ${season} season`
          },
          {
            crop: 'Soybean',
            suitability: 78,
            season: 'Kharif',
            expectedYield: '25-30 quintals/hectare',
            profitability: 'Medium',
            waterRequirement: 'Medium',
            fertilizers: ['Balanced NPK application'],
            practices: ['Monsoon dependent crop'],
            marketPrice: '₹4,500/quintal',
            reason: `Good option for ${soilType} with adequate rainfall`
          }
        ];
        setRecommendations(basicRecommendations);
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-farming-earth/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Crop Recommendations</h1>
            <p className="text-muted-foreground">Get personalized crop suggestions for your farm</p>
          </div>
        </div>

        {/* Tabs for Different Modes */}
        <Tabs defaultValue="new-crop" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-crop" className="flex items-center space-x-2">
              <Leaf className="w-4 h-4" />
              <span>Find New Crops</span>
            </TabsTrigger>
            <TabsTrigger value="track-crop" className="flex items-center space-x-2">
              <Sprout className="w-4 h-4" />
              <span>Track Current Crop</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-crop">
            {/* Mode Selection */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    variant={!useAdvancedMode ? "default" : "outline"}
                    onClick={() => setUseAdvancedMode(false)}
                    className="flex-1"
                  >
                    <Leaf className="w-4 h-4 mr-2" />
                    Basic Mode
                  </Button>
                  <Button
                    variant={useAdvancedMode ? "default" : "outline"}
                    onClick={() => setUseAdvancedMode(true)}
                    className="flex-1"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Advanced Mode (Soil Report)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {useAdvancedMode ? 'Upload Soil Report for Detailed Analysis' : 'Basic Farm Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {useAdvancedMode ? (
                  <>
                    {/* Soil Report Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="soil-report">Soil Analysis Report (PDF/Image)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop your soil test report
                        </p>
                        <Input
                          id="soil-report"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('soil-report')?.click()}
                        >
                          Choose File
                        </Button>
                        {soilReport && (
                          <div className="mt-3 flex items-center justify-center space-x-2 text-success">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{soilReport.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Basic Info for Advanced Mode */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Season</Label>
                        <Select value={season} onValueChange={setSeason}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select season" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                            <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                            <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Farm Size (Hectares)</Label>
                        <Input
                          type="number"
                          placeholder="Enter farm size"
                          value={farmSize}
                          onChange={(e) => setFarmSize(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Basic Mode Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Soil Type</Label>
                        <Select value={soilType} onValueChange={setSoilType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select soil type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clay">Clay</SelectItem>
                            <SelectItem value="loamy">Loamy</SelectItem>
                            <SelectItem value="sandy">Sandy</SelectItem>
                            <SelectItem value="black">Black Cotton</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Season</Label>
                        <Select value={season} onValueChange={setSeason}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select season" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                            <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                            <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Farm Size (Hectares)</Label>
                        <Input
                          type="number"
                          placeholder="Enter farm size"
                          value={farmSize}
                          onChange={(e) => setFarmSize(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                <Button 
                  onClick={generateRecommendations} 
                  disabled={loading || (useAdvancedMode ? !soilReport || !season : !soilType || !season)}
                  className="w-full"
                >
                  {loading ? 'Analyzing...' : 'Get Recommendations'}
                </Button>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recommended Crops</h2>
                
                {recommendations.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center space-x-2">
                          <Leaf className="w-5 h-5 text-farming-leaf" />
                          <span>{rec.crop}</span>
                        </CardTitle>
                        <Badge variant="secondary" className="bg-success/20 text-success">
                          {rec.suitability}% Match
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      
                      {useAdvancedMode && (
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-primary mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Soil Analysis Insights</p>
                              <p className="text-sm text-muted-foreground">{rec.reason}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Expected Yield</p>
                          <p className="font-semibold">{rec.expectedYield}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Profitability</p>
                          <Badge variant={rec.profitability === 'High' ? 'default' : 'secondary'}>
                            {rec.profitability}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Water Need</p>
                          <div className="flex items-center space-x-1">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{rec.waterRequirement}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Market Price</p>
                          <p className="font-semibold text-primary">{rec.marketPrice}</p>
                        </div>
                      </div>

                      {useAdvancedMode && (
                        <>
                          <div className="space-y-2">
                            <h4 className="font-semibold">Recommended Fertilizers</h4>
                            <ul className="text-sm space-y-1">
                              {rec.fertilizers.map((fertilizer: string, i: number) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                                  <span>{fertilizer}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold">Best Practices</h4>
                            <ul className="text-sm space-y-1">
                              {rec.practices.map((practice: string, i: number) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <span className="w-2 h-2 bg-farming-leaf rounded-full"></span>
                                  <span>{practice}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="track-crop">
            <Card>
              <CardContent className="p-6 text-center">
                <Sprout className="w-16 h-16 mx-auto mb-4 text-farming-leaf" />
                <h3 className="text-xl font-semibold mb-2">Track Your Growing Crop</h3>
                <p className="text-muted-foreground mb-6">
                  Get personalized care recommendations based on your crop's current growth stage, weather conditions, and soil health.
                </p>
                <Button 
                  onClick={() => navigate('/crop-progress')}
                  className="w-full max-w-sm"
                >
                  <Sprout className="w-4 h-4 mr-2" />
                  Start Crop Tracking
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CropRecommendations;