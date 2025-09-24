using AutoMapper;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;

namespace CESCA.API.Helpers.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Product Mapping

            //Base mapping
            CreateMap<Product, ProductDTO>();
            //Extended Mapping
            CreateMap<Product, ProductResponseDTO>()
                .IncludeBase<Product, ProductDTO>()
                .ForMember(dest => dest.IsArchived, opt => opt.MapFrom(src => src.IsArchived))
                .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => src.IsDeleted));
        }
    }
}
