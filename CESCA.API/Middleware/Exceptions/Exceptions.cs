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

        public class SupplierNotFoundException : Exception
        {
            public SupplierNotFoundException(string message) : base(message) 
            {
                
            }
        }

        public class SupplierCreationException : Exception
        {
            public SupplierCreationException(string message) : base(message)
            {
            }
        }

        public class ProductNotFoundException : Exception
        {
            public ProductNotFoundException(string message) : base(message)
            {
                
            }
        }

        public class ProductCreationException : Exception
        {
            public ProductCreationException(string message) : base(message)
            {
                
            }
        }
    }
}
