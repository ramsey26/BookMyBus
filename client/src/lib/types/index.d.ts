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
  departureTime: string;      // Format: "HH:mm:ss"
  arrivalTime: string;        // Format: "HH:mm:ss"
  travelDate: string;         // ISO date string: "YYYY-MM-DDTHH:mm:ss"
  farePerSeat: number;
  isActive: boolean;
};
