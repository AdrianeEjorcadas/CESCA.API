namespace CESCA.API.Helpers.Email
{
    public static class EmailTemplates
    {
        public static string GetConfirmationEmail(string userName, string email , string confirmationLink)
        {
            return $@"
                <html>
                <body style='font-family:Segoe UI, sans-serif;'>
                    <h2>Welcome, {userName}!</h2>
                    <p>Thanks for signing up. Please confirm your email by clicking 
    1                   <span>
                            <a href='{confirmationLink}'>here</a>
                        </span>
                    </p> 
                    
                    <p>If you didn’t request this, you can safely ignore it.</p>
                    </body>
                </html>
            ";
        }
    }
}
