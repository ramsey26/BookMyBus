using System;
using Application.Bookings.Commands;
using FluentValidation;

namespace Application.Bookings.Validators;

public class CreateBookingValidators : AbstractValidator<CreateBooking.Command>
{
    public CreateBookingValidators()
    {
        RuleFor(x => x.BusId).NotEmpty().WithMessage("Bus Id is required");
        RuleFor(x => x.UserId).NotEmpty().WithMessage("User Id is required");
        RuleFor(x => x.Passengers)
            .NotEmpty().WithMessage("At least one passenger is required");

        RuleForEach(x => x.Passengers)
            .SetValidator(new PassengerDtoValidator());
    }
}
