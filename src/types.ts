export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  date: string;
  class: 'Economy' | 'Business' | 'First';
}

export interface BookingDetails {
  flightId: string;
  passengers: Passenger[];
  totalPrice: number;
  bookingDate: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Passenger {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  passportNumber: string;
}

export interface FlightState {
  flights: Flight[];
  selectedFlight: Flight | null;
  loading: boolean;
  error: string | null;
  searchParams: {
    from: string;
    to: string;
    date: string;
  } | null;
}

export interface BookingState {
  currentBooking: BookingDetails | null;
  loading: boolean;
  error: string | null;
}
