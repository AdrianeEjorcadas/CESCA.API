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

        public class SupplierCreationException : Exception
        {
            public SupplierCreationException(string message) : base(message)
            {
            }
        }
    }
}
