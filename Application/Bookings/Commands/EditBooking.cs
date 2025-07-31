using Application.Core;
using Application.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bookings.Commands;

public class EditBooking
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string BookingId { get; set; }
        public required PassengerDto PassengerDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var booking = await context.Bookings
           .Include(b => b.Passengers)
           .FirstOrDefaultAsync(x => x.Id == request.BookingId, cancellationToken);

            if (booking == null)
                return Result<Unit>.Failure("Booking not found", 404);

            var existingPassenger = booking.Passengers
                .SingleOrDefault(p => p.Id == request.PassengerDto.Id);

            if (existingPassenger == null)
                return Result<Unit>.Failure("Passenger not found", 404);

            if (int.TryParse(request.PassengerDto.Age, out var age) &&
                existingPassenger.Age == age &&
                existingPassenger.Gender == request.PassengerDto.Gender &&
                existingPassenger.Name == request.PassengerDto.Name)
            {
                return Result<Unit>.Success(Unit.Value); // No change
            }

            mapper.Map(request.PassengerDto, existingPassenger);

            var success = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!success)
                return Result<Unit>.Failure("Unable to modify passenger", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}