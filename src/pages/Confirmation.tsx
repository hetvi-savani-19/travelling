import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, clearBooking } from '../store/store';
import { CheckCircle, Plane, Calendar, MapPin, User, Download, ArrowRight, Printer } from 'lucide-react';
import { motion } from 'motion/react';

const Confirmation: React.FC = () => {
  const { currentBooking } = useSelector((state: RootState) => state.booking);
  const { selectedFlight } = useSelector((state: RootState) => state.flight);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!currentBooking || !selectedFlight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">No booking found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
        >
          Go to Home <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const handleDone = () => {
    dispatch(clearBooking());
    navigate('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100"
        >
          {/* Success Header */}
          <div className="bg-emerald-600 p-12 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
              className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
            >
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Booking Confirmed!</h1>
            <p className="text-emerald-100 text-lg font-medium">Your flight ticket has been sent to your email.</p>
          </div>

          {/* Ticket Details */}
          <div className="p-12">
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Booking ID</p>
                <p className="text-xl font-bold text-gray-900">#BK-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Status</p>
                <p className="text-lg font-bold text-emerald-600 flex items-center gap-2 justify-end">
                  <CheckCircle className="h-4 w-4" /> Confirmed
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 -mr-16 -mt-16 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 -ml-16 -mb-16 rounded-full"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm">
                      <Plane className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-0.5">Flight</p>
                      <p className="text-lg font-bold text-gray-900">{selectedFlight.airline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm">
                      <MapPin className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-0.5">Route</p>
                      <p className="text-lg font-bold text-gray-900">{selectedFlight.from} to {selectedFlight.to}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm">
                      <Calendar className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-0.5">Date & Time</p>
                      <p className="text-lg font-bold text-gray-900">{selectedFlight.date} at {selectedFlight.departureTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm">
                      <User className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-0.5">Passenger</p>
                      <p className="text-lg font-bold text-gray-900">{currentBooking.passengers[0].firstName} {currentBooking.passengers[0].lastName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                <Download className="h-5 w-5" /> Download Ticket
              </button>
              <button className="flex-1 bg-white border-2 border-gray-100 text-gray-900 py-4 rounded-2xl font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                <Printer className="h-5 w-5" /> Print Receipt
              </button>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={handleDone}
                className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all mx-auto"
              >
                Return to Home <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
