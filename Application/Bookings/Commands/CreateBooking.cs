using System;
using Application.DTOs;
using Domain;
using MediatR;
using Persistence;

namespace Application.Bookings.Commands;

public class CreateBooking
{
    public class Command : IRequest<string>
    {
        public string BusId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public List<PassengerDto> Passengers { get; set; } = new();
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            var booking = new Booking
            {
                Id = Guid.NewGuid().ToString(),
                BusId = request.BusId,
                UserId = request.UserId,
                BookingDate = DateTime.UtcNow,
                Passengers = [.. request.Passengers.Select(p =>
                {
                    return new Passenger
                    {
                        Id = Guid.NewGuid().ToString(),
                        SeatNumber = p.SeatNumber,
                        Name = p.Name,
                        Age = p.Age,
                        Gender = p.Gender
                    };
                })]
            };

            context.Bookings.Add(booking);
            await context.SaveChangesAsync(cancellationToken);

            return booking.Id;
        }
    }
}
