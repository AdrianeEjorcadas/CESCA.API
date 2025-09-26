using CESCA.API.Models.Response;
using Microsoft.AspNetCore.Diagnostics;
using static CESCA.API.Middleware.Exceptions.Exceptions;

namespace CESCA.API.Middleware.ExceptionHandler
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var response = new ReturnResponse<object>();
            response.Message = exception.Message;
            response.Data = (exception.InnerException != null ? $"Inner Exception: {exception.InnerException.Message}" : "");

            switch (exception)
            {
                case NotFoundException ex:
                    response.StatusCode = StatusCodes.Status404NotFound;
                    break;

                case SupplierCreationException ex:
                    response.StatusCode = StatusCodes.Status400BadRequest;
                    break;

                case InvalidOperationException ex:
                    response.StatusCode= StatusCodes.Status400BadRequest;
                    break;
 
                default:
                    response.StatusCode = StatusCodes.Status500InternalServerError;
                    response.Message = "Unexpected Error Occured";
                    break;
            }

            httpContext.Response.StatusCode = response.StatusCode;
            await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
            return true;
        }
    }
}
