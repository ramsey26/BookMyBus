using System;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bookings.Queries;

public class GetUserBookings
{
    public class Query : IRequest<Result<List<BookingDto>>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper _mapper) : IRequestHandler<Query, Result<List<BookingDto>>>
    {
        public async Task<Result<List<BookingDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var bookings = await context.Bookings
                            .Include(b => b.Passengers)
                            .Include(b => b.Bus)
                            .Where(x => x.UserId == request.UserId)
                            .OrderByDescending(x=>x.BookingDate)
                            .ToListAsync(cancellationToken);
            if (bookings == null || bookings.Count == 0) return Result<List<BookingDto>>.Failure("Bookings not found", 404);

            return Result<List<BookingDto>>.Success(_mapper.Map<List<BookingDto>>(bookings));
        }
    }
}
