using System;
using Application.Core;
using Application.DTOs;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bookings.Commands;

public class CreateBooking
{
    public class Command : IRequest<Result<string>>
    {
        public required string BusId { get; set; }
        public required string UserId { get; set; }
        public required List<PassengerDto> Passengers { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var bus = await context.Buses.FindAsync([request.BusId], cancellationToken: cancellationToken);
            if (bus == null) return Result<string>.Failure("Booking cannot be completed because the selected bus is not available.", 400);

            // Validate selected seat numbers aren't already taken
            var alreadyBookedSeats = await context.Bookings
                .Where(b => b.BusId == request.BusId)
                .SelectMany(b => b.Passengers.Select(p => p.SeatNumber))
                .ToListAsync(cancellationToken);

            var requestedSeats = request.Passengers.Select(p => p.Seat).ToList();
            if (requestedSeats.Intersect(alreadyBookedSeats).Any())
            {
                return Result<string>.Failure("One or more selected seats are already booked.", 409);
            }

            // Check seat availability
            if (bus.AvailableSeats < request.Passengers.Count)
            {
                return Result<string>.Failure("Booking cannot be completed, selected seats are not available.", 400);
            }
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
                        SeatNumber = p.Seat,
                        Name = p.Name,
                        Age = int.Parse(p.Age),
                        Gender = p.Gender
                    };
                })]
            };

            context.Bookings.Add(booking);

            bus.AvailableSeats -= request.Passengers.Count;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<string>.Failure("Failed to create the booking", 400);

            return Result<string>.Success(booking.Id);
        }
    }
}
