type Bus = {
  id: string;
  busNumber: string;
  busName: string;
  operatorName: string;
  type: string;
  totalSeats: number;
  availableSeats: number;
  sourceCity: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  travelDate: string;
  farePerSeat: number;
  isActive: boolean;
};

type PassengerSummaryDto = {
  seatNumber: string;
  name: string;
  age: number;
  gender: string;
}

type BookingDto = {
  id: string;
  busId: string;
  busName: string;
  bookingDate: string;
  passengers: PassengerSummaryDto[];
}

type PassengerDto = {
  seat: string;
  name: string;
  age: string;
  gender: string;
};

type CreateBookingDto = {
  userId: string;
  passengers: PassengerDto[];
};

// types.ts
type LoginDto = {
  email: string;
  password: string;
}

type User = {
  displayName: string;
  email: string;
  id: string;
}
