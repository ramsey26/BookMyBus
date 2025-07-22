using Application.Bookings.Commands;
using Application.Bookings.Queries;
using Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookingsController() : BaseApiController
    {
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<BookingDto>>> GetUserBookings(string userId)
        {
            return await mediator.Send(new GetUserBookings.Query { UserId = userId });
        }

        [HttpPost("{busId}")]
        public async Task<ActionResult<string>> CreateBooking(string busId, [FromBody] CreateBookingDto bookingDto)
        {
            return await mediator.Send(new CreateBooking.Command
            {
                BusId = busId,
                UserId = bookingDto.UserId,
                Passengers = [.. bookingDto.Passengers.Select(p => new PassengerDto
                {
                    SeatNumber = p.SeatNumber,
                    Name = p.Name,
                    Age = p.Age,
                    Gender = p.Gender
                })]
            });
        }
    }
}
