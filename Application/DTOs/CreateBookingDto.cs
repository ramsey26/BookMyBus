using System;

namespace Application.DTOs;

public class CreateBookingDto
{
    public string UserId { get; set; } = string.Empty;
    public List<PassengerDto> Passengers { get; set; } = new();
}
