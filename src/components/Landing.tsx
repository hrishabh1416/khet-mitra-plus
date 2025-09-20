import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-farmer.jpg';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing = ({ onGetStarted }: LandingProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-farming-sky via-background to-farming-earth relative overflow-hidden">
      {/* Floating clouds animation */}
      <div className="absolute top-10 left-10 w-20 h-12 bg-white/30 rounded-full animate-float"></div>
      <div className="absolute top-20 right-20 w-16 h-8 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-24 h-10 bg-white/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Logo and Brand */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent text-white">
              KrishiMitra
            </h1>
          </div>
        </div>

        {/* Hero Image */}
        <div className={`mb-8 transition-all duration-1200 delay-300 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Smart Farming Partner - Indian farmer with green plant" 
              className="w-80 h-48 md:w-96 md:h-60 object-cover rounded-2xl shadow-2xl animate-pulse-glow"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Main Headline */}
        <div className={`mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Your Smart
            <br />
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Farming Partner
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-powered advice for crops, weather alerts, and disease prediction - all in your pocket
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-900 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onGetStarted}
            className="text-lg px-8 py-4 h-auto font-semibold"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-4 h-auto border-2 hover:border-primary"
          >
            <Globe className="w-5 h-5 mr-2" />
            Language
          </Button>
        </div>

        {/* Features Preview */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full transition-all duration-1200 delay-1200 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Leaf className="w-6 h-6 text-success" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Crop Health</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Weather Alerts</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-6 h-6 bg-warning rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">AI Assistant</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-accent/40 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-6 h-6 bg-farming-leaf rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Smart Insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;