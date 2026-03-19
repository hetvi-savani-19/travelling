import { Destination, Flight } from '../types';

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light, known for its romantic atmosphere, iconic Eiffel Tower, and world-class museums like the Louvre.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
    price: 1200,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    description: 'A vibrant metropolis where futuristic technology meets ancient traditions, famous for its neon-lit streets and serene shrines.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000',
    price: 1500,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'New York',
    country: 'USA',
    description: 'The Big Apple, a global hub of culture, finance, and entertainment, home to Times Square and Central Park.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000',
    price: 1100,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Dubai',
    country: 'UAE',
    description: 'A city of superlatives, known for its luxury shopping, ultramodern architecture, and lively nightlife scene.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000',
    price: 1300,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'London',
    country: 'UK',
    description: 'A historic city on the River Thames, famous for its cultural landmarks, museums, and royal history.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000',
    price: 1150,
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City, steeped in history with ancient ruins like the Colosseum and the Roman Forum.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1000',
    price: 1050,
    rating: 4.8,
  },
];

export const mockFlights: Flight[] = [
  {
    id: 'f1',
    airline: 'SkyHigh Airways',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=100',
    from: 'London',
    to: 'Paris',
    departureTime: '08:00 AM',
    arrivalTime: '09:30 AM',
    duration: '1h 30m',
    price: 150,
    date: '2026-03-20',
    class: 'Economy',
  },
  {
    id: 'f2',
    airline: 'Global Wings',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=100',
    from: 'New York',
    to: 'Tokyo',
    departureTime: '10:00 PM',
    arrivalTime: '02:00 AM',
    duration: '14h 00m',
    price: 850,
    date: '2026-03-21',
    class: 'Business',
  },
  {
    id: 'f3',
    airline: 'Oceanic Air',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=100',
    from: 'Dubai',
    to: 'London',
    departureTime: '02:00 PM',
    arrivalTime: '07:30 PM',
    duration: '7h 30m',
    price: 450,
    date: '2026-03-22',
    class: 'Economy',
  },
  {
    id: 'f4',
    airline: 'SkyHigh Airways',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=100',
    from: 'London',
    to: 'Paris',
    departureTime: '11:00 AM',
    arrivalTime: '12:30 PM',
    duration: '1h 30m',
    price: 180,
    date: '2026-03-20',
    class: 'Economy',
  },
  {
    id: 'f5',
    airline: 'Global Wings',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=100',
    from: 'Rome',
    to: 'New York',
    departureTime: '09:00 AM',
    arrivalTime: '01:00 PM',
    duration: '9h 00m',
    price: 650,
    date: '2026-03-23',
    class: 'Economy',
  },
];

export const flightService = {
  getDestinations: async (): Promise<Destination[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDestinations), 500);
    });
  },
  getDestinationById: async (id: string): Promise<Destination | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDestinations.find(d => d.id === id)), 300);
    });
  },
  getFlights: async (from?: string, to?: string, date?: string): Promise<Flight[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = mockFlights;
        if (from) filtered = filtered.filter(f => f.from.toLowerCase().includes(from.toLowerCase()));
        if (to) filtered = filtered.filter(f => f.to.toLowerCase().includes(to.toLowerCase()));
        if (date) filtered = filtered.filter(f => f.date === date);
        resolve(filtered);
      }, 800);
    });
  },
  getFlightById: async (id: string): Promise<Flight | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFlights.find(f => f.id === id)), 300);
    });
  },
};
