import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flightService } from '../services/flightService';
import { Destination } from '../types';
import { MapPin, Star, Plane, ArrowLeft, CheckCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';

const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      flightService.getDestinationById(id).then((data) => {
        setDestination(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h2>
        <button
          onClick={() => navigate('/destinations')}
          className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/destinations')}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Destinations
            </button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-indigo-600/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{destination.rating} Rating</span>
                  </div>
                  <span className="text-white/60 text-sm font-medium flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {destination.country}
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">{destination.name}</h1>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-white min-w-[240px]">
                <p className="text-xs uppercase font-bold tracking-widest text-white/60 mb-1">Starting from</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">${destination.price}</span>
                  <span className="text-sm text-white/60">/ person</span>
                </div>
                <button
                  onClick={() => navigate('/flights')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
                >
                  <Plane className="h-5 w-5" /> Find Flights
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About {destination.name}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {destination.description}
              <br /><br />
              Whether you're looking for adventure, relaxation, or cultural immersion, {destination.name} offers something for everyone. From its stunning landscapes to its vibrant local culture, this destination is a must-visit for any traveler.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" /> Top Attractions
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Historic Landmarks & Museums</li>
                  <li>• Local Cuisine & Night Markets</li>
                  <li>• Scenic Parks & Nature Trails</li>
                  <li>• Cultural Festivals & Events</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-indigo-500" /> Travel Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Best time to visit: Spring & Autumn</li>
                  <li>• Local currency: {destination.country === 'Japan' ? 'Yen' : destination.country === 'France' ? 'Euro' : 'Local Currency'}</li>
                  <li>• Language: {destination.country === 'Japan' ? 'Japanese' : destination.country === 'France' ? 'French' : 'English'}</li>
                  <li>• Transport: Efficient Public Transit</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">Ready to Fly?</h3>
                <p className="text-indigo-700/80 text-sm mb-6 leading-relaxed">
                  Book your flights to {destination.name} today and get exclusive discounts on early bookings.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-indigo-900 font-medium">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Plane className="h-4 w-4 text-indigo-600" />
                    </div>
                    Direct flights available
                  </div>
                  <div className="flex items-center gap-3 text-sm text-indigo-900 font-medium">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <CheckCircle className="h-4 w-4 text-indigo-600" />
                    </div>
                    Free cancellation (24h)
                  </div>
                </div>
                <button
                  onClick={() => navigate('/flights')}
                  className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200"
                >
                  Check Availability
                </button>
              </div>

              <div className="relative rounded-3xl overflow-hidden h-64">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000"
                  alt="Travel Promo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
                  <p className="text-white font-bold text-xl">Get 20% Off on Your First Booking!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
