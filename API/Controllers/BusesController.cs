using Application.Buses.Queries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BusesController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Bus>>> GetBuses() {
            return await mediator.Send(new GetBusList.Query());
        }
    }
}
