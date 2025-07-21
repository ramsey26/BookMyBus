using System;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var users = new List<User>
            {
                new (){DisplayName = "Ayush", UserName = "ayush.vyas@gmail.com", Email ="ayush.vyas@gmail.com"},
                new (){DisplayName = "Ramesh", UserName = "ramesh@gmail.com", Email ="ramesh@gmail.com"},
                new (){DisplayName = "Suresh", UserName = "suresh@gmail.com", Email ="suresh@gmail.com"}
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        if (context.Buses.Any()) return;

        var buses = new List<Bus>
            {
                new Bus
                {
                    Id = Guid.NewGuid().ToString(),
                    BusNumber = "MH12AB1234",
                    BusName = "Shiv Travels",
                    OperatorName = "VRL",
                    Type = "AC Sleeper",
                    TotalSeats = 40,
                    AvailableSeats = 18,
                    SourceCity = "Pune",
                    DestinationCity = "Mumbai",
                    DepartureTime = new TimeSpan(22, 0, 0),
                    ArrivalTime = new TimeSpan(4, 30, 0),
                    TravelDate = DateTime.Today.AddDays(1),
                    FarePerSeat = 850,
                    IsActive = true
                },
                new Bus
                {
                    Id = Guid.NewGuid().ToString(),
                    BusNumber = "KA05CD4321",
                    BusName = "Green Line",
                    OperatorName = "KSRTC",
                    Type = "Non-AC Seater",
                    TotalSeats = 45,
                    AvailableSeats = 20,
                    SourceCity = "Bangalore",
                    DestinationCity = "Chennai",
                    DepartureTime = new TimeSpan(6, 30, 0),
                    ArrivalTime = new TimeSpan(12, 0, 0),
                    TravelDate = DateTime.Today.AddDays(1),
                    FarePerSeat = 450,
                    IsActive = true
                },
                new Bus
                {
                    Id = Guid.NewGuid().ToString(),
                    BusNumber = "DL01EF5678",
                    BusName = "Red Express",
                    OperatorName = "RedBus",
                    Type = "AC Seater",
                    TotalSeats = 50,
                    AvailableSeats = 35,
                    SourceCity = "Delhi",
                    DestinationCity = "Agra",
                    DepartureTime = new TimeSpan(9, 0, 0),
                    ArrivalTime = new TimeSpan(13, 0, 0),
                    TravelDate = DateTime.Today.AddDays(2),
                    FarePerSeat = 600,
                    IsActive = true
                },
                new Bus
                {
                    Id = Guid.NewGuid().ToString(),
                    BusNumber = "RJ14GH6789",
                    BusName = "Rajasthan Travels",
                    OperatorName = "RJT",
                    Type = "Sleeper Non-AC",
                    TotalSeats = 36,
                    AvailableSeats = 10,
                    SourceCity = "Jaipur",
                    DestinationCity = "Udaipur",
                    DepartureTime = new TimeSpan(21, 15, 0),
                    ArrivalTime = new TimeSpan(5, 45, 0),
                    TravelDate = DateTime.Today.AddDays(3),
                    FarePerSeat = 700,
                    IsActive = true
                },
                new Bus
                {
                    Id = Guid.NewGuid().ToString(),
                    BusNumber = "TN10IJ2468",
                    BusName = "Chennai Express",
                    OperatorName = "SRS",
                    Type = "AC Sleeper",
                    TotalSeats = 42,
                    AvailableSeats = 5,
                    SourceCity = "Chennai",
                    DestinationCity = "Coimbatore",
                    DepartureTime = new TimeSpan(23, 0, 0),
                    ArrivalTime = new TimeSpan(6, 30, 0),
                    TravelDate = DateTime.Today.AddDays(1),
                    FarePerSeat = 950,
                    IsActive = true
                }
            };

        context.Buses.AddRange(buses);
        await context.SaveChangesAsync();
    }
}
