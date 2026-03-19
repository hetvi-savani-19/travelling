import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSelectedFlight } from '../store/store';
import { flightService } from '../services/flightService';
import { Plane, Clock, Calendar, MapPin, ArrowLeft, CheckCircle, ShieldCheck, Coffee, Wifi, Tv, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const FlightDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedFlight } = useSelector((state: RootState) => state.flight);
  const [loading, setLoading] = useState(!selectedFlight);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedFlight && id) {
      flightService.getFlightById(id).then((data) => {
        if (data) dispatch(setSelectedFlight(data));
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id, selectedFlight, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!selectedFlight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight not found</h2>
        <button
          onClick={() => navigate('/flights')}
          className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Flights
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/flights')}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Flight Listing
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100"
        >
          {/* Flight Header */}
          <div className="bg-indigo-600 p-8 text-white">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{selectedFlight.airline}</h2>
                  <p className="text-indigo-100 text-sm font-medium uppercase tracking-widest">{selectedFlight.class} Class</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-indigo-200 uppercase font-bold tracking-widest mb-1">Flight ID</p>
                <p className="text-lg font-bold">#SW-{selectedFlight.id.toUpperCase()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-8 py-8 border-t border-indigo-500/30">
              <div className="text-center md:text-left">
                <p className="text-sm text-indigo-200 font-medium mb-1">{selectedFlight.from}</p>
                <h3 className="text-4xl font-bold">{selectedFlight.departureTime}</h3>
                <p className="text-xs text-indigo-200 font-bold mt-1 uppercase tracking-widest">{selectedFlight.date}</p>
              </div>

              <div className="flex-1 flex flex-col items-center px-4">
                <p className="text-sm text-indigo-100 font-bold mb-2">{selectedFlight.duration}</p>
                <div className="relative w-full h-[2px] bg-indigo-400/30 flex items-center justify-center">
                  <div className="absolute w-3 h-3 rounded-full bg-white shadow-lg left-0"></div>
                  <div className="absolute w-3 h-3 rounded-full bg-white shadow-lg right-0"></div>
                  <Plane className="h-6 w-6 text-white bg-indigo-600 px-1" />
                </div>
                <p className="text-[10px] text-indigo-200 font-bold mt-2 uppercase tracking-widest">Non-stop Flight</p>
              </div>

              <div className="text-center md:text-right">
                <p className="text-sm text-indigo-200 font-medium mb-1">{selectedFlight.to}</p>
                <h3 className="text-4xl font-bold">{selectedFlight.arrivalTime}</h3>
                <p className="text-xs text-indigo-200 font-bold mt-1 uppercase tracking-widest">{selectedFlight.date}</p>
              </div>
            </div>
          </div>

          {/* Flight Details Body */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Flight Amenities</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="bg-gray-50 p-2 rounded-xl">
                      <Wifi className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium">Free Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="bg-gray-50 p-2 rounded-xl">
                      <Coffee className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium">Free Meals</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="bg-gray-50 p-2 rounded-xl">
                      <Tv className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium">Entertainment</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="bg-gray-50 p-2 rounded-xl">
                      <ShieldCheck className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium">Travel Insurance</span>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" /> Safe Travel Guarantee
                  </h4>
                  <p className="text-emerald-700/80 text-xs leading-relaxed">
                    We prioritize your safety with enhanced cleaning protocols and flexible booking options.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Fare Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Base Fare (1 Adult)</span>
                    <span className="text-gray-900 font-bold">${selectedFlight.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxes & Fees</span>
                    <span className="text-gray-900 font-bold">$45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Fee</span>
                    <span className="text-gray-900 font-bold">$15</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total Price</span>
                    <span className="text-2xl font-bold text-indigo-600">${selectedFlight.price + 60}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/booking')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  Book Now <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlightDetails;
