﻿using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;

namespace CESCA.API.Services.Interface
{
    public interface IProductService
    {
        Task<ProductResponseDTO> AddProductAsync(ProductDTO productDto, CancellationToken ct);
    }
}
