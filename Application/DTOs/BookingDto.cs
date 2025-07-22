using System;

namespace Application.DTOs;

public class BookingDto
{
    public string Id { get; set; } = string.Empty;
    public string BusId { get; set; } = string.Empty;
    public string BusName { get; set; } = string.Empty;
    public DateTime BookingDate { get; set; }

    public List<PassengerSummaryDto> Passengers { get; set; } = new();
}

public class PassengerSummaryDto
{
    public string SeatNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public string Gender { get; set; } = string.Empty;
}
