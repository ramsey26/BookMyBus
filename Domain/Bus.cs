using System;

namespace Domain;

public class Bus
{
    public required string Id { get; set; }                      // Unique Identifier
    public string BusNumber { get; set; } = null!;    // e.g., MH12AB1234
    public string BusName { get; set; } = null!;      // Optional, e.g., "Shiv Travels"

    public string OperatorName { get; set; } = null!; // e.g., VRL, KSRTC
    public string Type { get; set; } = null!;         // e.g., AC, Non-AC, Sleeper, Seater

    public int TotalSeats { get; set; }
    public int AvailableSeats { get; set; }

    public string SourceCity { get; set; } = null!;
    public string DestinationCity { get; set; } = null!;

    public TimeSpan DepartureTime { get; set; }
    public TimeSpan ArrivalTime { get; set; }
    
    public DateTime TravelDate { get; set; }

    public decimal FarePerSeat { get; set; }

    public bool IsActive { get; set; } = true;        // Is it available for booking?
}

