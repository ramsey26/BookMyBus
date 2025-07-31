using Application.Core;
using MediatR;
using Persistence;

namespace Application.Bookings.Commands;

public class DeleteBooking
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string BookingId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var booking = await context.Bookings.FindAsync([request.BookingId], cancellationToken: cancellationToken);
            if (booking == null)
                return Result<Unit>.Failure("Booking not found", 404);

            context.Bookings.Remove(booking);

            var success = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!success)
                return Result<Unit>.Failure("Unable to cancel booking", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
