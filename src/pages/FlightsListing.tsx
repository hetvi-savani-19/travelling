import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, fetchFlightsStart, fetchFlightsSuccess, fetchFlightsFailure, setSelectedFlight, setSearchParams } from '../store/store';
import { flightService } from '../services/flightService';
import { Plane, Clock, Calendar, MapPin, Filter, ArrowRight, Search, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const FlightsListing: React.FC = () => {
  const { flights, loading, error, searchParams } = useSelector((state: RootState) => state.flight);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [from, setFrom] = useState(searchParams?.from || '');
  const [to, setTo] = useState(searchParams?.to || '');
  const [date, setDate] = useState(searchParams?.date || '');

  useEffect(() => {
    dispatch(fetchFlightsStart());
    flightService.getFlights(searchParams?.from, searchParams?.to, searchParams?.date)
      .then((data) => {
        dispatch(fetchFlightsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchFlightsFailure(err.message));
      });
  }, [dispatch, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchParams({ from, to, date }));
  };

  const handleSelectFlight = (flight: any) => {
    dispatch(setSelectedFlight(flight));
    navigate(`/flights/${flight.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">From</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
                <input
                  type="text"
                  placeholder="Origin"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">To</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
                <input
                  type="text"
                  placeholder="Destination"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
            >
              <Search className="h-5 w-5" /> Update Search
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </h3>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Clear All</button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Stops</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                      Non-stop
                    </label>
                    <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                      1 Stop
                    </label>
                    <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                      2+ Stops
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Airlines</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                      SkyHigh Airways
                    </label>
                    <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                      Global Wings
                    </label>
                    <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                      Oceanic Air
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flights List */}
          <div className="lg:w-3/4 space-y-6">
            {loading ? (
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-500 font-medium">Searching for best flights...</p>
              </div>
            ) : flights.length > 0 ? (
              flights.map((flight, idx) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4 min-w-[180px]">
                      <div className="bg-gray-50 p-3 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                        <Plane className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{flight.airline}</h4>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{flight.class}</p>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center justify-between gap-8 w-full">
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">{flight.departureTime}</p>
                        <p className="text-sm text-gray-500 font-medium">{flight.from}</p>
                      </div>

                      <div className="flex-1 flex flex-col items-center px-4">
                        <p className="text-xs text-gray-400 font-bold mb-1">{flight.duration}</p>
                        <div className="relative w-full h-[2px] bg-gray-100 flex items-center justify-center">
                          <div className="absolute w-2 h-2 rounded-full bg-indigo-600 left-0"></div>
                          <div className="absolute w-2 h-2 rounded-full bg-indigo-600 right-0"></div>
                          <Plane className="h-4 w-4 text-indigo-600 bg-white px-0.5" />
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">Non-stop</p>
                      </div>

                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">{flight.arrivalTime}</p>
                        <p className="text-sm text-gray-500 font-medium">{flight.to}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 min-w-[180px] justify-end w-full md:w-auto">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">${flight.price}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Per Person</p>
                      </div>
                      <button
                        onClick={() => handleSelectFlight(flight)}
                        className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-2"
                      >
                        Details <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
                <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No flights found</h3>
                <p className="text-gray-500 mb-8">Try adjusting your search criteria or search for a different date.</p>
                <button
                  onClick={() => dispatch(setSearchParams(null))}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Show all available flights
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsListing;
