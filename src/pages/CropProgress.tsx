import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Leaf, Calendar, Droplets, Sun, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CropProgressData {
  cropName: string;
  plantingDate: string;
  currentStage: string;
  nextSteps: string[];
  weatherAdvice: string;
  irrigationAdvice: string;
  diseaseRisk: string;
  harvestDate: string;
  expectedYield: string;
}

const CropProgress = () => {
  const navigate = useNavigate();
  const [cropName, setCropName] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [progressData, setProgressData] = useState<CropProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProgressData = () => {
    if (!cropName || !plantingDate) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData: CropProgressData = {
        cropName: cropName,
        plantingDate: plantingDate,
        currentStage: 'Vegetative Growth Stage',
        nextSteps: [
          'Apply nitrogen fertilizer (20kg per acre)',
          'Monitor for pest activity, especially aphids',
          'Ensure adequate water supply (2-3 inches per week)',
          'Remove weeds manually or with herbicide',
          'Check soil moisture at 6-inch depth daily'
        ],
        weatherAdvice: 'Current sunny weather is favorable. Light rain expected in 3 days will be beneficial for growth.',
        irrigationAdvice: 'Reduce watering frequency due to upcoming rain. Resume normal schedule after 5 days.',
        diseaseRisk: 'Medium risk for powdery mildew due to humidity. Monitor leaves closely.',
        harvestDate: '2024-12-15',
        expectedYield: '18-22 quintals per acre'
      };
      
      setProgressData(mockData);
      setIsLoading(false);
    }, 2000);
  };

  const getStageProgress = (stage: string) => {
    const stages = ['Germination', 'Vegetative Growth', 'Flowering', 'Fruit Development', 'Maturation'];
    const currentIndex = stages.findIndex(s => s.includes(stage.split(' ')[0]));
    return Math.max(0, (currentIndex + 1) / stages.length * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-farming-earth/20 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/crop-recommendations')}
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
              <h1 className="text-2xl font-bold text-foreground">Crop Progress Tracker</h1>
              <p className="text-sm text-muted-foreground">Track your current crop's growth and get recommendations</p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Your Crop Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Name</label>
                <Input
                  placeholder="e.g., Soybean, Wheat, Cotton"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Planting Date</label>
                <Input
                  type="date"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={getProgressData}
                  disabled={!cropName || !plantingDate || isLoading}
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
                      <Leaf className="w-4 h-4 mr-2" />
                      Get Progress Report
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Results */}
        {progressData && (
          <div className="space-y-6">
            
            {/* Current Stage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Current Growth Stage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{progressData.currentStage}</h3>
                    <span className="text-sm text-muted-foreground">
                      Planted: {new Date(progressData.plantingDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-farming-leaf to-success h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getStageProgress(progressData.currentStage)}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Expected Harvest</p>
                      <p className="font-semibold">{new Date(progressData.harvestDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected Yield</p>
                      <p className="font-semibold">{progressData.expectedYield}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Immediate Action Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {progressData.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-success">{index + 1}</span>
                      </div>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather & Care Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-farming-sun" />
                    <span>Weather Guidance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{progressData.weatherAdvice}</p>
                  <div className="p-3 bg-farming-sun/10 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Irrigation Advice</h4>
                    <p className="text-sm text-muted-foreground">{progressData.irrigationAdvice}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <span>Health Monitoring</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-warning/10 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Disease Risk Alert</h4>
                      <p className="text-sm text-muted-foreground">{progressData.diseaseRisk}</p>
                    </div>
                    
                    <Button variant="outline" className="w-full" onClick={() => navigate('/disease-detection')}>
                      <Leaf className="w-4 h-4 mr-2" />
                      Check Plant Health
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {!progressData && !isLoading && (
          <Card className="text-center py-12">
            <CardContent>
              <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Track Your Crop Progress</h3>
              <p className="text-muted-foreground mb-4">
                Enter your crop details to get personalized care recommendations based on current weather and growth stage
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CropProgress;