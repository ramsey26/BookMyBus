using System;

namespace Domain;

public class Passenger
{
    public required string Id { get; set; }
    public string SeatNumber { get; set; } = null!;
    public string Name { get; set; } = null!;
    public int Age { get; set; }
    public string Gender { get; set; } = null!;

    // Navigation back to Booking
    public string BookingId { get; set; }
    public Booking Booking { get; set; }
}
