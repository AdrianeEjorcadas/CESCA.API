using AutoMapper;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;
using CESCA.API.Services.Implementation;
using CESCA.API.Services.Interface;

namespace CESCA.API.Helpers.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Product Mapping
            CreateMap<Product, ProductDTO>(); //Base mapping
            CreateMap<Product, ProductResponseDTO>() //Extended Mapping
                .IncludeBase<Product, ProductDTO>()
                .ForMember(dest => dest.IsArchived, opt => opt.MapFrom(src => src.IsArchived))
                .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => src.IsDeleted));

            //ProductDTO to Product
            CreateMap<ProductDTO, Product>();
        }
    }
}
