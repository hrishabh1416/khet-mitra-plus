import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  Search,
  Tractor,
  Wrench,
  Calendar,
  MapPin,
  Star,
  Phone,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EquipmentRental = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const equipment = [
    {
      id: 1,
      name: 'John Deere 5075E Tractor',
      category: 'Tractor',
      price: '₹1,200/day',
      rating: 4.8,
      reviews: 45,
      location: 'Indore, MP',
      distance: '5 km',
      owner: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      image: '/api/placeholder/300/200',
      features: ['75 HP', 'Power Steering', 'Good Condition'],
      available: true
    },
    {
      id: 2,
      name: 'Mahindra 575 DI Tractor',
      category: 'Tractor',
      price: '₹1,000/day',
      rating: 4.5,
      reviews: 32,
      location: 'Dewas, MP',
      distance: '12 km',
      owner: 'Suresh Patel',
      phone: '+91 98765 43211',
      image: '/api/placeholder/300/200',
      features: ['50 HP', 'Fuel Efficient', 'Well Maintained'],
      available: true
    },
    {
      id: 3,
      name: 'Rotary Tiller',
      category: 'Tillage',
      price: '₹400/day',
      rating: 4.6,
      reviews: 28,
      location: 'Ujjain, MP',
      distance: '18 km',
      owner: 'Amit Sharma',
      phone: '+91 98765 43212',
      image: '/api/placeholder/300/200',
      features: ['6 Feet Width', 'Sharp Blades', 'Heavy Duty'],
      available: true
    },
    {
      id: 4,
      name: 'Combine Harvester',
      category: 'Harvesting',
      price: '₹3,500/day',
      rating: 4.9,
      reviews: 67,
      location: 'Indore, MP',
      distance: '8 km',
      owner: 'Vikram Singh',
      phone: '+91 98765 43213',
      image: '/api/placeholder/300/200',
      features: ['Self Propelled', '14 Feet Header', 'GPS Enabled'],
      available: false
    },
    {
      id: 5,
      name: 'Seed Drill Machine',
      category: 'Seeding',
      price: '₹600/day',
      rating: 4.4,
      reviews: 21,
      location: 'Bhopal, MP',
      distance: '25 km',
      owner: 'Ramesh Gupta',
      phone: '+91 98765 43214',
      image: '/api/placeholder/300/200',
      features: ['9 Tyne', 'Fertilizer Box', 'Adjustable Depth'],
      available: true
    },
    {
      id: 6,
      name: 'Sprayer Machine',
      category: 'Spraying',
      price: '₹350/day',
      rating: 4.2,
      reviews: 15,
      location: 'Ratlam, MP',
      distance: '35 km',
      owner: 'Mohan Joshi',
      phone: '+91 98765 43215',
      image: '/api/placeholder/300/200',
      features: ['200L Tank', 'Boom Sprayer', 'Electric Pump'],
      available: true
    }
  ];

  const categories = ['all', 'Tractor', 'Tillage', 'Harvesting', 'Seeding', 'Spraying'];
  const locations = ['all', 'Indore', 'Dewas', 'Ujjain', 'Bhopal', 'Ratlam'];

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || item.location.includes(locationFilter);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleBookEquipment = (equipmentId: number, equipmentName: string) => {
    // In a real app, this would open a booking modal or navigate to booking page
    alert(`Booking request sent for ${equipmentName}. The owner will contact you shortly.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-farming-earth/20 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Equipment Rental</h1>
            <p className="text-muted-foreground">Rent farming equipment near you</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search equipment by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-primary/10 to-farming-earth/10 rounded-t-lg flex items-center justify-center">
                  <Tractor className="w-16 h-16 text-primary/60" />
                </div>
                {!item.available && (
                  <Badge variant="secondary" className="absolute top-2 right-2 bg-destructive/20 text-destructive">
                    Not Available
                  </Badge>
                )}
                {item.available && (
                  <Badge variant="secondary" className="absolute top-2 right-2 bg-success/20 text-success">
                    Available
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{item.price}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline">{item.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="font-medium">{item.rating}</span>
                    <span className="text-muted-foreground">({item.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location} • {item.distance} away</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.owner}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{item.phone}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!item.available}
                      onClick={() => handleBookEquipment(item.id, item.name)}
                      className="ml-2"
                    >
                      {item.available ? 'Book Now' : 'Unavailable'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Wrench className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Equipment Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find equipment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EquipmentRental;