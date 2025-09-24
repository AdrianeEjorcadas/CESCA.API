using CESCA.API.Services.Interface;

namespace CESCA.API.Services.Implementation
{
    public class SKUGeneratorService : ISKUGeneratorService
    {
        public string GenerateSKU(string category, string productName)
        {
            string date = DateTime.Now.ToString("yyyyMMdd");
            string uniqueCode = Guid.NewGuid().ToString().Substring(0, 8);

            return $"{GetCategoryCode(category)}-{GetProductCode(productName)}-{date}-{uniqueCode.ToUpper()}";
        }

        private string GetCategoryCode(string category)
        {
            return new string(category
                    .Where(char.IsLetter)
                    .Take(3)
                    .ToArray())
                    .ToUpper();
        }

        private string GetProductCode(string productName)
        {
            return new string(productName
                .Where(char.IsLetter)
                .Take(3)
                .ToArray())
                .ToUpper();
        }
    }
}
