using System;
using Application.DTOs;
using FluentValidation;

namespace Application.Bookings.Validators;

public class PassengerDtoValidator : AbstractValidator<PassengerDto>
{
    public PassengerDtoValidator()
    {
        RuleFor(x => x.Name)
             .NotEmpty().WithMessage("Name is required");

        RuleFor(x => x.Age)
            .NotEmpty().WithMessage("Age is required")
            .Must(age => int.TryParse(age, out var a) && a > 0)
            .WithMessage("Age must be a valid number greater than 0");

        RuleFor(x => x.Seat)
            .NotEmpty().WithMessage("Seat number is required");

        RuleFor(x => x.Gender)
            .NotEmpty().WithMessage("Gender is required")
            .Must(g => new[] { "Male", "Female", "Other" }.Contains(g))
            .WithMessage("Gender must be Male, Female, or Other");
    }
}
