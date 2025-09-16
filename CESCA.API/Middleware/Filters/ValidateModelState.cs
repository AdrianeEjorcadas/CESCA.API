﻿using CESCA.API.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CESCA.API.Middleware.Filters
{
    public class ValidateModelState :ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(new ReturnResponse<object>
                {
                    StatusCode = 400,
                    Message = "Invalid model state",
                    Data = context.ModelState.Values
                            .SelectMany(e => e.Errors)
                            .Select(e => e.ErrorMessage)
                            .FirstOrDefault()
                });
            }
        }
    }
}
