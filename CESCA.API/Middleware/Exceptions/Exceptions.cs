namespace CESCA.API.Middleware.Exceptions
{
    public static class Exceptions
    {
        public class NotFoundException : Exception
        {
            public NotFoundException(string message) : base (message)
            {
            }
        }
    }
}
