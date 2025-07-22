using System;

namespace Domain;

public class Booking
{
    public required string Id { get; set; }
    public string BusId { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public DateTime BookingDate { get; set; }
    public ICollection<Passenger> Passengers { get; set; } = new List<Passenger>();
    public Bus Bus { get; set; }  // Navigation property
}

