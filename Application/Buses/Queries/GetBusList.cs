using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Buses.Queries;

public class GetBusList
{
    public class Query : IRequest<Result<List<Bus>>> { }

    public class Handler(AppDbContext _context) : IRequestHandler<Query, Result<List<Bus>>>
    {
        public async Task<Result<List<Bus>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var buses = await _context.Buses.Where(x => x.TravelDate >= DateTime.UtcNow).ToListAsync(cancellationToken: cancellationToken);
            if (buses == null || buses.Count == 0) return Result<List<Bus>>.Failure("Buses not found", 404);

            return Result<List<Bus>>.Success(buses);
        }
    }
}