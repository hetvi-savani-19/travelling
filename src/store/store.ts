import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, FlightState, Flight, BookingState, BookingDetails } from '../types';

// Auth Slice
const initialAuthState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('user'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

// Flight Slice
const initialFlightState: FlightState = {
  flights: [],
  selectedFlight: null,
  loading: false,
  error: null,
  searchParams: null,
};

const flightSlice = createSlice({
  name: 'flight',
  initialState: initialFlightState,
  reducers: {
    fetchFlightsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFlightsSuccess: (state, action: PayloadAction<Flight[]>) => {
      state.loading = false;
      state.flights = action.payload;
    },
    fetchFlightsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedFlight: (state, action: PayloadAction<Flight | null>) => {
      state.selectedFlight = action.payload;
    },
    setSearchParams: (state, action: PayloadAction<{ from: string; to: string; date: string } | null>) => {
      state.searchParams = action.payload;
    },
  },
});

// Booking Slice
const initialBookingState: BookingState = {
  currentBooking: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialBookingState,
  reducers: {
    setBookingDetails: (state, action: PayloadAction<BookingDetails>) => {
      state.currentBooking = action.payload;
    },
    clearBooking: (state) => {
      state.currentBooking = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, signupSuccess } = authSlice.actions;
export const { fetchFlightsStart, fetchFlightsSuccess, fetchFlightsFailure, setSelectedFlight, setSearchParams } = flightSlice.actions;
export const { setBookingDetails, clearBooking } = bookingSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    flight: flightSlice.reducer,
    booking: bookingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
