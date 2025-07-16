using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Buses.Queries;

public class GetBusList
{
    public class Query : IRequest<List<Bus>>{}

    public class Handler(AppDbContext _context) : IRequestHandler<Query, List<Bus>>
    {
        public async Task<List<Bus>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Buses.ToListAsync();
        }
    }
}