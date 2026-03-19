import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setBookingDetails } from '../store/store';
import { User, Mail, Phone, MapPin, ArrowRight, ArrowLeft, Info, CheckCircle, Plane, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Passenger } from '../types';

const Booking: React.FC = () => {
  const { selectedFlight } = useSelector((state: RootState) => state.flight);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passenger, setPassenger] = useState<Passenger>({
    firstName: user?.name || '',
    lastName: '',
    age: 25,
    gender: 'male',
    passportNumber: '',
  });

  if (!selectedFlight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">No flight selected</h2>
        <button
          onClick={() => navigate('/flights')}
          className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Flights
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setBookingDetails({
      flightId: selectedFlight.id,
      passengers: [passenger],
      totalPrice: selectedFlight.price + 60,
      bookingDate: new Date().toISOString(),
      paymentMethod: '',
      status: 'pending',
    }));
    navigate('/payment');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(`/flights/${selectedFlight.id}`)}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Flight Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Passenger Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                        placeholder="First Name"
                        value={passenger.firstName}
                        onChange={(e) => setPassenger({ ...passenger, firstName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                        placeholder="Last Name"
                        value={passenger.lastName}
                        onChange={(e) => setPassenger({ ...passenger, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Age</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                      value={passenger.age}
                      onChange={(e) => setPassenger({ ...passenger, age: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Gender</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                      value={passenger.gender}
                      onChange={(e) => setPassenger({ ...passenger, gender: e.target.value as any })}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Passport Number</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                    placeholder="A1234567"
                    value={passenger.passportNumber}
                    onChange={(e) => setPassenger({ ...passenger, passportNumber: e.target.value })}
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                  >
                    Proceed to Payment <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Booking Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <Plane className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Flight</p>
                    <p className="text-gray-900 font-bold">{selectedFlight.airline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <MapPin className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Route</p>
                    <p className="text-gray-900 font-bold">{selectedFlight.from} → {selectedFlight.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Date</p>
                    <p className="text-gray-900 font-bold">{selectedFlight.date}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Total Price</p>
                  <p className="text-2xl font-bold text-indigo-600">${selectedFlight.price + 60}</p>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Inc. Taxes</p>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
              <div className="flex items-center gap-2 text-indigo-900 font-bold mb-3">
                <Info className="h-5 w-5" />
                <span>Travel Information</span>
              </div>
              <p className="text-indigo-700/80 text-xs leading-relaxed">
                Please ensure your passport is valid for at least 6 months from the date of travel. Check visa requirements for your destination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
