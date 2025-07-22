using System;
using Application.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bookings.Queries;

public class GetUserBookings
{
    public class Query : IRequest<List<BookingDto>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper _mapper) : IRequestHandler<Query, List<BookingDto>>
    {
        public async Task<List<BookingDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var bookings = await context.Bookings
                            .Include(b => b.Passengers)
                            .Include(b => b.Bus)
                            .Where(x => x.UserId == request.UserId)
                            .ToListAsync(cancellationToken);

            return _mapper.Map<List<BookingDto>>(bookings);
        }
    }
}
