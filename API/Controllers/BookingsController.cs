using Application.Bookings.Commands;
using Application.Bookings.Queries;
using Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookingsController() : BaseApiController
    {
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<BookingDto>>> GetUserBookings(string userId)
        {
            return HandleResult(await mediator.Send(new GetUserBookings.Query { UserId = userId }));
        }

        [HttpGet("bus/{busId}")]
        public async Task<ActionResult<List<string>>> GetBookingsByBus(string busId)
        {
            return HandleResult(await mediator.Send(new GetBookingsByBus.Query { BusId = busId }));
        }

        [HttpPost("add/{busId}")]
        public async Task<ActionResult<string>> CreateBooking(string busId, [FromBody] CreateBookingDto bookingDto)
        {
            return HandleResult(await mediator.Send(new CreateBooking.Command
            {
                BusId = busId,
                UserId = bookingDto.UserId,
                Passengers = bookingDto.Passengers
            }));
        }

        [HttpPut("edit/{bookingId}")]
        public async Task<ActionResult<Unit>> EditBooking(string bookingId, [FromBody] PassengerDto passengerDto)
        {
            return HandleResult(await mediator.Send(new EditBooking.Command
            {
                BookingId = bookingId,
                PassengerDto = passengerDto
            }));
        }

        [HttpDelete("cancel/{bookingId}")]
        public async Task<ActionResult<Unit>> CancelBooking(string bookingId)
        {
            return HandleResult(await mediator.Send(new DeleteBooking.Command
            {
                BookingId = bookingId
            }));
        }
    }
}
