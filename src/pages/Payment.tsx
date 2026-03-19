import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setBookingDetails } from '../store/store';
import { CreditCard, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle, Info, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

const Payment: React.FC = () => {
  const { currentBooking } = useSelector((state: RootState) => state.booking);
  const { selectedFlight } = useSelector((state: RootState) => state.flight);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);

  if (!currentBooking || !selectedFlight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">No booking details found</h2>
        <button
          onClick={() => navigate('/flights')}
          className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Flights
        </button>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock payment processing
    setTimeout(() => {
      dispatch(setBookingDetails({
        ...currentBooking,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'UPI',
        status: 'confirmed',
      }));
      setLoading(false);
      navigate('/confirmation');
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/booking')}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Booking Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Payment Method</h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-100 bg-gray-50 text-gray-400'
                  }`}
                >
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm font-bold">Credit/Debit Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-100 bg-gray-50 text-gray-400'
                  }`}
                >
                  <Smartphone className="h-6 w-6" />
                  <span className="text-sm font-bold">UPI Payment</span>
                </button>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          maxLength={16}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="***"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">UPI ID</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm font-medium"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay ${currentBooking.totalPrice} <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-6 opacity-50 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo.png/1200px-UPI-Logo.png" alt="UPI" className="h-4" />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Flight Fare</span>
                  <span className="text-gray-900 font-bold">${selectedFlight.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxes & Fees</span>
                  <span className="text-gray-900 font-bold">$60</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Total Amount</p>
                    <p className="text-2xl font-bold text-indigo-600">${currentBooking.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-900 font-bold mb-3">
                <ShieldCheck className="h-5 w-5" />
                <span>Secure Payment</span>
              </div>
              <p className="text-emerald-700/80 text-xs leading-relaxed">
                Your payment is processed through a secure gateway. We do not store your card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
