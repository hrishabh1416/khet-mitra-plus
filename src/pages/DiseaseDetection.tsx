import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera, Upload, Leaf, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  organicSolutions: string[];
  chemicalSolutions: string[];
}

const DiseaseDetection = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDiagnosisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePlant = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: DiagnosisResult = {
        disease: 'Powdery Mildew',
        confidence: 94,
        organicSolutions: [
          'Neem oil spray - Apply every 7-10 days',
          'Baking soda solution - 1 tsp per liter water',
          'Remove infected leaves immediately',
          'Improve air circulation around plants'
        ],
        chemicalSolutions: [
          'Fungicide spray (e.g., Triforine) - Follow label instructions',
          'Sulfur-based treatments - Apply as directed',
          'Horticultural oils - Use during cooler parts of day',
          'Systemic fungicides for severe cases'
        ]
      };
      
      setDiagnosisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-farming-earth/20 p-4">
      <div className="max-w-4xl mx-auto">
        
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
            <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-success" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Disease Diagnosis</h1>
              <p className="text-sm text-muted-foreground">AI-powered plant health analysis</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Image Capture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Capture Plant Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedImage ? (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Take a Photo</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Capture a clear image of the affected plant part
                  </p>
                  <div className="space-y-2">
                    <Button onClick={handleImageCapture} className="w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" onClick={handleImageCapture} className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload from Gallery
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Plant for diagnosis"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2"
                    >
                      Change Image
                    </Button>
                  </div>
                  
                  {!diagnosisResult && !isAnalyzing && (
                    <Button onClick={analyzePlant} className="w-full" variant="success">
                      <Leaf className="w-4 h-4 mr-2" />
                      Analyze Plant Health
                    </Button>
                  )}
                  
                  {isAnalyzing && (
                    <Card className="bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <div>
                            <p className="font-medium">Analyzing image...</p>
                            <p className="text-sm text-muted-foreground">AI is examining your plant for diseases</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Diagnosis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Diagnosis Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!diagnosisResult && !isAnalyzing ? (
                <div className="text-center py-12">
                  <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Analysis Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image to get started with plant health diagnosis
                  </p>
                </div>
              ) : diagnosisResult ? (
                <div className="space-y-6">
                  {/* Diagnosis Header */}
                  <div className="text-center p-4 bg-gradient-to-r from-warning/10 to-destructive/10 rounded-lg">
                    <h3 className="text-xl font-bold text-foreground mb-2">{diagnosisResult.disease}</h3>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-lg font-semibold text-success">{diagnosisResult.confidence}% Confidence</span>
                    </div>
                  </div>

                  {/* Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Organic Solutions */}
                    <Card className="bg-success/5 border-success/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center space-x-2">
                          <Leaf className="w-4 h-4 text-success" />
                          <span>Organic Solutions</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {diagnosisResult.organicSolutions.map((solution, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-foreground">{solution}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Chemical Solutions */}
                    <Card className="bg-warning/5 border-warning/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-warning" />
                          <span>Chemical Solutions</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {diagnosisResult.chemicalSolutions.map((solution, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-foreground">{solution}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <Button variant="outline" onClick={() => {
                    setSelectedImage(null);
                    setDiagnosisResult(null);
                  }} className="w-full">
                    Analyze Another Plant
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="animate-pulse space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Tips for Better Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Clear Focus</h4>
                  <p className="text-muted-foreground">Take sharp, well-lit photos of affected areas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Show Symptoms</h4>
                  <p className="text-muted-foreground">Include leaves, stems, or fruits showing disease signs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Multiple Angles</h4>
                  <p className="text-muted-foreground">Take photos from different angles for better analysis</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;