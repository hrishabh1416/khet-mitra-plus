import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Landing from '@/components/Landing';
import Dashboard from '@/components/Dashboard';
import 'leaflet/dist/leaflet.css';
const Index = () => {
  const navigate = useNavigate();
  const [showDashboard, setShowDashboard] = useState(false);

  const handleGetStarted = () => {
    setShowDashboard(true);
  };

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'ai-assistant':
        navigate('/ai-assistant');
        break;
      case 'disease-diagnosis':
        navigate('/disease-diagnosis');
        break;
      case 'crop-recommendations':
        navigate('/crop-recommendations');
        break;
      case 'market-prices':
        navigate('/market-prices');
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!showDashboard ? (
        <Landing onGetStarted={handleGetStarted} />
      ) : (
        <Dashboard onFeatureClick={handleFeatureClick} />
      )}
    </>
  );
};

export default Index;
