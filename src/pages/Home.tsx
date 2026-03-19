import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchParams } from '../store/store';
import { Search, MapPin, Calendar, Users, ArrowRight, Star, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { flightService } from '../services/flightService';
import { Destination } from '../types';

const Home: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    flightService.getDestinations().then(setDestinations);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchParams({ from, to, date }));
    navigate('/flights');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=1920"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.6]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Explore the World <br />
              <span className="text-indigo-400">Without Limits</span>
            </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Book your next adventure with SkyWings. Experience seamless travel with the world's best airlines and destinations.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl shadow-black/20 max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100">
                  <MapPin className="h-5 w-5 text-indigo-500" />
                  <div className="flex flex-col items-start">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">From</label>
                    <input
                      type="text"
                      placeholder="Origin City"
                      className="bg-transparent border-none focus:ring-0 p-0 text-sm font-medium text-gray-900 w-full"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-3 px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100">
                  <MapPin className="h-5 w-5 text-indigo-500" />
                  <div className="flex flex-col items-start">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">To</label>
                    <input
                      type="text"
                      placeholder="Destination City"
                      className="bg-transparent border-none focus:ring-0 p-0 text-sm font-medium text-gray-900 w-full"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-3 px-6 py-3">
                  <Calendar className="h-5 w-5 text-indigo-500" />
                  <div className="flex flex-col items-start">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date</label>
                    <input
                      type="date"
                      className="bg-transparent border-none focus:ring-0 p-0 text-sm font-medium text-gray-900 w-full"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white p-4 md:p-5 rounded-xl md:rounded-full hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  <span className="md:hidden font-medium">Search Flights</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
              <p className="text-gray-500">Handpicked places for your next unforgettable journey</p>
            </div>
            <button
              onClick={() => navigate('/destinations')}
              className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all"
            >
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.slice(0, 3).map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate(`/destinations/${dest.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-900">{dest.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{dest.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {dest.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Starts from</p>
                      <p className="text-lg font-bold text-indigo-600">${dest.price}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Book With SkyWings?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We provide the best travel experience with top-notch services and support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Plane className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Flight Deals</h3>
              <p className="text-gray-500 text-sm leading-relaxed">We compare thousands of flights to find you the most affordable and convenient options.</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Support</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Our dedicated support team is available 24/7 to assist you with any travel needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted by Millions</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Join over 5 million happy travelers who trust SkyWings for their global adventures.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
