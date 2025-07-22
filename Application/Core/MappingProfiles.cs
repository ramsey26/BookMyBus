using System;
using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Booking, BookingDto>()
        .ForMember(dest => dest.BusName, opt => opt.MapFrom(src => src.Bus.BusName));

        CreateMap<Passenger, PassengerSummaryDto>();
    }
}
