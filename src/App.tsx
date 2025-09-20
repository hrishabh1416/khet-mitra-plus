import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import AIAssistant from "./pages/AIAssistant";
import DiseaseDetection from "./pages/DiseaseDetection";
import CropRecommendations from "./pages/CropRecommendations";
import CropProgress from "./pages/CropProgress";
import MarketPrices from "./pages/MarketPrices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/disease-diagnosis" element={<DiseaseDetection />} />
        <Route path="/crop-recommendations" element={<CropRecommendations />} />
        <Route path="/crop-progress" element={<CropProgress />} />
        <Route path="/market-prices" element={<MarketPrices />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
