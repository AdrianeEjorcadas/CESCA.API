namespace CESCA.API.Helpers.Typography
{
    public static class TypographyHelper
    {
        public static string ToSentenceCase(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return input;

            input = input.ToLower();
            return char.ToUpper(input[0]) + input.Substring(1);
        }
    }
}
