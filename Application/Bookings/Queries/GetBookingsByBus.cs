using System;
using Application.Core;
using Application.DTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bookings.Queries;

public class GetBookingsByBus
{
    public class Query : IRequest<Result<List<string>>>
    {
        public required string BusId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<string>>>
    {
        public async Task<Result<List<string>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var bookedSeats = await context.Bookings
                                .Include(b => b.Passengers)
                                .Where(x => x.BusId == request.BusId)
                                .SelectMany(x => x.Passengers.Select(x => x.SeatNumber))
                                .ToListAsync(cancellationToken: cancellationToken);

            if (bookedSeats == null || bookedSeats.Count == 0) return Result<List<string>>.Failure("booking not found", 404);

            return Result<List<string>>.Success(bookedSeats);
        }
    }
}
