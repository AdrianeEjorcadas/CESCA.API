using CESCA.API.Models.Response;
using Microsoft.AspNetCore.Diagnostics;

namespace CESCA.API.Middleware.ExceptionHandler
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var response = new ReturnResponse<object>
            {
                StatusCode = StatusCodes.Status500InternalServerError,
                Message = "Unexpected error occur",
                Data = null
            };

            httpContext.Response.StatusCode = response.StatusCode;
            await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
            return true;
        }
    }
}
