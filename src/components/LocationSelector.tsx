import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Locate } from 'lucide-react';

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

interface LocationSelectorProps {
  onLocationSelect: (location: LocationData) => void;
  currentLocation?: LocationData;
}

const LocationSelector = ({ onLocationSelect, currentLocation }: LocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(currentLocation || null);
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location'
          };
          setSelectedLocation(location);
          onLocationSelect(location);
        },
        () => {
          // Fallback to Indore
          const location = {
            lat: 22.7196,
            lng: 75.8577,
            address: 'Indore, Madhya Pradesh'
          };
          setSelectedLocation(location);
          onLocationSelect(location);
        }
      );
    }
  };

  const handleMapLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const confirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <MapPin className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        {selectedLocation?.address || 'Loading...'}
      </span>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            Change
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl h-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Select Your Location</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-full space-y-4">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                className="flex items-center space-x-2"
              >
                <Locate className="w-4 h-4" />
                <span>Use Current Location</span>
              </Button>
            </div>
            
            <div className="flex-1 rounded-lg overflow-hidden">
              <div style={{ height: '400px', width: '100%' }}>
                <p className="text-center p-8 text-muted-foreground">
                  Map integration will be available soon. For now, you can use the "Use Current Location" button above.
                </p>
              </div>
            </div>
            
            {selectedLocation && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Selected Location</p>
                      <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                      </p>
                    </div>
                    <Button onClick={confirmLocation}>
                      Confirm Location
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationSelector;