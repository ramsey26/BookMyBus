using System;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs;

public class PassengerDto
{
    public string SeatNumber { get; set; } = null!;

    [StringLength(100)]
    public required string Name { get; set; }

    [Range(1, 120)]
    public int Age { get; set; }

    public required string Gender { get; set; }
}
