import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Bot, Mic, MicOff, Send, User, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Namaste! I am your AI Krishi Sahayak. I can help you with farming questions, crop advice, weather guidance, and more. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'marathi', label: 'मराठी (Marathi)' },
    { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      scrollToBottom();
    }, 1500);

    scrollToBottom();
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('weather') || lowerQuery.includes('rain') || lowerQuery.includes('temperature')) {
      return "Based on the current weather forecast, we're expecting sunny conditions with temperatures around 28°C. There's a chance of light rain on Wednesday. I recommend checking your irrigation systems and ensuring proper drainage for the upcoming rain.";
    } else if (lowerQuery.includes('crop') || lowerQuery.includes('plant') || lowerQuery.includes('grow')) {
      return "For the current season in your area (Indore region), I recommend considering soybean, wheat, or cotton crops. These are well-suited to your soil type and climate conditions. Would you like specific planting and care instructions for any of these crops?";
    } else if (lowerQuery.includes('disease') || lowerQuery.includes('pest') || lowerQuery.includes('problem')) {
      return "To help identify crop diseases or pest problems, I recommend using our Disease Diagnosis feature where you can take a photo of the affected plant. Common issues in your area include powdery mildew and aphid infestations. Would you like prevention tips for these?";
    } else if (lowerQuery.includes('price') || lowerQuery.includes('market') || lowerQuery.includes('sell')) {
      return "Current market prices in Indore: Soybean ₹4500/quintal (+2%), Wheat ₹2200/quintal (+1%), Cotton ₹5800/quintal (-3%). Prices are generally favorable for soybean and wheat. Consider timing your sales based on seasonal demand patterns.";
    } else {
      return "Thank you for your question. I'd be happy to help! For the most accurate and personalized advice, could you provide more details about your specific farming situation? You can also use our other features like Disease Diagnosis for plant health issues or Crop Recommendations for planning your next season.";
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please use the text input instead.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputMessage('What crops should I plant this season?');
    }, 2000);
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
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Krishi Sahayak</h1>
              <p className="text-sm text-muted-foreground">Your intelligent farming assistant</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Chat with AI Assistant</CardTitle>
              <div className="flex items-center space-x-2">
                <Languages className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          {/* Messages Area */}
          <CardContent className="flex-1 p-0 overflow-hidden">
            <div className="h-full overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-success/20 text-success'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-success/20 text-success">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Ask about crops, weather, diseases, or farming tips..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={handleVoiceInput}
                  disabled={isLoading}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
            {isListening && (
              <p className="text-sm text-muted-foreground mt-2 flex items-center">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse mr-2"></div>
                Listening... Speak now
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;