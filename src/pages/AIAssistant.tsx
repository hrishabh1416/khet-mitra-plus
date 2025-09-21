import { useState, useRef, useEffect } from 'react';
import { Bot, Mic, MicOff, Send, User, Languages, Loader2 } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

// Placeholder Lucide icons as in your original code
const Lucide = {
  ArrowLeft: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Bot: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  Mic: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
  MicOff: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" x2="22" y1="2" y2="22"/><path d="M19 19V12a7 7 0 0 0-3.32-5.91M12 2a3 3 0 0 1 3 3v3.12"/><path d="M12 19v3"/><path d="M9 22h6"/><path d="M8.43 14.8V12a3 3 0 0 1 3-3"/><line x1="5.9" x2="18.1" y1="19" y2="19"/></svg>,
  Send: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 19-4-5-5-4 19-7Z"/><path d="M9.2 9.2 17.6 17.6"/></svg>,
  User: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Languages: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m10.5 2L15 7"/><path d="M2 22s1.5-2 5-2 5 2 5 2"/><path d="M10 14s1.7-2.9 4.8-5.5"/><path d="M16.5 16.5 22 22"/><path d="M16 16s1.6-1.5 4-3l-2.5-2.5"/></svg>,
  Loader2: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
};

const components = {
  Button: ({ children, className, ...props }) => <button className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`} {...props}>{children}</button>,
  Card: ({ children, className }) => <div className={`bg-white shadow-lg rounded-xl overflow-hidden ${className}`}>{children}</div>,
  CardHeader: ({ children, className }) => <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>,
  CardContent: ({ children, className }) => <div className={`p-4 ${className}`}>{children}</div>,
  CardTitle: ({ children, className }) => <h3 className={`text-xl font-bold ${className}`}>{children}</h3>,
  Input: ({ className, ...props }) => <input className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />,
  SelectTrigger: ({ children, className, ...props }) => <button className={`relative cursor-pointer flex items-center justify-between gap-2 text-left w-full px-4 py-2 border rounded-md bg-white shadow-sm hover:bg-gray-50 transition-colors ${className}`} {...props}>{children}</button>,
  SelectValue: ({ children }) => <span className="block truncate">{children}</span>,
  SelectContent: ({ children }) => <div className="absolute z-10 top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">{children}</div>,
  SelectItem: ({ children, className, ...props }) => <button className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${className}`} {...props}>{children}</button>,
};

const { Button, Card, CardContent, CardHeader, CardTitle, Input, SelectTrigger, SelectValue, SelectContent, SelectItem } = components;
const { ArrowLeft, Bot, Mic, MicOff, Send, User, Languages, Loader2 } = Lucide;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

function App() {
  // inputMode tracks how input was given: 'text' or 'voice'
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');

  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

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
  const [voiceError, setVoiceError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null; error: string | null }>({
    latitude: null,
    longitude: null,
    error: null,
  });

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'marathi', label: 'मराठी (Marathi)' },
    { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
  ];

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({ latitude: null, longitude: null, error: error.message });
        }
      );
    } else {
      setLocation({ latitude: null, longitude: null, error: "Geolocation not supported" });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US'; // Default language for recognition

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setVoiceError('');
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setInputMode('voice'); // mark that input came from voice
        recognitionRef.current?.stop();
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setVoiceError(`Error: ${event.error}`);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectLanguage = (langValue: string) => {
    setSelectedLanguage(langValue);
    setIsDropdownOpen(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech first if speaking
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        speechSynthesisRef.current = null;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      const langMap: Record<string, string> = {
        english: 'en-IN',
        hindi: 'hi-IN',
        marathi: 'mr-IN',
        gujarati: 'gu-IN',
        punjabi: 'pa-IN',
        tamil: 'ta-IN',
        telugu: 'te-IN',
      };
      utterance.lang = langMap[selectedLanguage] || 'en-IN';

      utterance.onstart = () => {
        speechSynthesisRef.current = utterance;
      };

      utterance.onend = () => {
        speechSynthesisRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis not supported in this browser');
    }
  };

  // Handle input text change, set inputMode to text
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    setInputMode('text');
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

    interface UserDetails {
      name: string;
      age?: number;
      gender?: string;
      location: string;
      latitude?: number;
      longitude?: number;
      farmSizeInAcres?: number;
      soilType?: string;
      soilReport?: string;
      cropType?: string;
      cropVariety?: string;
      temperature?: number;
      rainfall?: number;
      humidity?: number;
      irrigationType?: string;
      fertilizerUsed?: string[];
      pesticideUsed?: string[];
      marketPrice?: number;
    }

    const farmer: UserDetails = {
      name: "Hrishabh Shrivastava",
      location: "Gwalior, Madhya Pradesh",
      temperature: 36.7,
      soilType: "Loamy",
      soilReport: "pH 6.8, Nitrogen 50kg/ha, Phosphorus 30kg/ha, Potassium 40kg/ha",
      cropType: "",
      cropVariety: "Durum Wheat",
      farmSizeInAcres: 5,
      irrigationType: "Drip",
      fertilizerUsed: ["Urea", "DAP"],
      pesticideUsed: ["Neem Oil", "Cypermethrin"],
      marketPrice: 22,
    };

    try {
      const apiKey = "AIzaSyC5ZWgpZYWfOglpPAcgXXdAvt_AApicUEk";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      const systemPrompt = `You are an AI assistant named "AI Krishi Sahayak" that provides personalized farming advice. You are knowledgeable about crops, soil, weather, irrigation, equipment, disease detection, and market prices in India. Respond to the user's queries in ${selectedLanguage}. Use the following farmerDetails object to provide advice:

      ${JSON.stringify(farmer)}

      Provide concise, clear, and polite advice (2–3 sentences) while giving practical, in-depth guidance tailored to this farmer’s specific farm, soil, crops, and location.
      `;

      const payload = {
        contents: [{ parts: [{ text: userMessage.content }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const aiResponseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that request.";

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };

      // If input was voice, only speak response (no text output)
      if (inputMode === 'voice') {
        speakText(aiResponseText);
      } else {
        // For text input, show response in text only (no speech)
        setMessages(prev => [...prev, aiResponse]);
      }

      // Reset input mode back to text after response
      setInputMode('text');

    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I am unable to connect to the AI at this moment. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      // Show error in text always
      setMessages(prev => [...prev, errorMessage]);
      setInputMode('text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      setVoiceError('Voice input is not supported in your browser.');
      return;
    }

    // Stop speech synthesis if currently speaking
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      speechSynthesisRef.current = null;
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 font-sans p-4 antialiased flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">

        <div className="flex items-center mb-6">
          <Button
            className="mr-4 rounded-full p-2 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-300"
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <Bot className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">AI Krishi Sahayak</h1>
              <p className="text-sm text-gray-500">Your intelligent farming assistant</p>
            </div>
          </div>
        </div>

        <Card className="h-[700px] flex flex-col rounded-2xl shadow-xl">
          <CardHeader className="border-b-2 border-green-200 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-700">Chat with AI Assistant</CardTitle>
              <div className="flex items-center space-x-2 relative" ref={dropdownRef}>
                <Languages className="w-5 h-5 text-gray-500" />
                <div className="relative w-40">
                  <SelectTrigger
                    className="border-green-300 focus:ring-green-500 rounded-lg"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <SelectValue>
                      {languages.find(l => l.value === selectedLanguage)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  {isDropdownOpen && (
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem
                          key={lang.value}
                          value={lang.value}
                          onClick={() => handleSelectLanguage(lang.value)}
                        >
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden">
            <div className="h-full overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500/20 text-green-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-green-100 text-gray-800 rounded-bl-none'
                    } transition-all duration-300`}>
                      <p className="text-base">{message.content}</p>
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
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500/20 text-green-600">
                      <Bot className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="p-4 rounded-2xl shadow-sm bg-green-100 rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <div className="p-4 border-t-2 border-green-200">
            <div className="flex space-x-2">
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Ask about crops, weather, diseases, or farming tips..."
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 rounded-full border-green-300 focus:border-green-500 transition-colors"
                />
                <Button
                  className={`rounded-full p-2 transition-all duration-300 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  onClick={handleVoiceInput}
                  disabled={isLoading}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5 text-white" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 rounded-full bg-green-600 hover:bg-green-700 transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                Send
              </Button>
            </div>
            {isListening && (
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                Listening... Speak now
              </p>
            )}
            {voiceError && (
              <p className="text-sm text-red-500 mt-2 flex items-center">
                <span className="font-semibold mr-1">Error:</span> {voiceError}
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;

