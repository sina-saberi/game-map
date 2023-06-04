using AutoMapper;
using game_maps.Application.Base;
using game_maps.Application.ViewModels.Categorie;
using game_maps.Application.ViewModels.Game;
using game_maps.Application.ViewModels.Group;
using game_maps.Application.ViewModels.Location;
using game_maps.Application.ViewModels.Map;
using game_maps.Core.Base;
using game_maps.Core.Entities;
using game_maps.Core.Types;

namespace game_maps.Application.Configurations
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Game, GameViewModel>()
                .ReverseMap();

            CreateMap<Map, MapViewModel>()
                .ReverseMap();

            CreateMap<Map, MapDetailViewModel>()
                .ReverseMap();

            CreateMap<Group, GroupViewModel>()
                .ReverseMap();

            CreateMap<Categorie, CategorieViewModel>()
                .ForMember(x => x.Count, x => x.MapFrom(x => x.Locations.Count()));

            CreateMap<Location, LocationViewModel>()
                .ForMember(x => x.CategorieName, x => x.MapFrom(x => x.Categorie != null ? x.Categorie.Title : ""))
                .ForMember(x => x.Icon, x => x.MapFrom(x => x.Categorie != null ? x.Categorie.Icon : ""))
                .ForMember(x => x.IsDone, x => x.MapFrom(x => x.UserMarks != null && x.UserMarks.Any() && x.UserMarks.First().IsDone));

            CreateMap<Location, LocationDetailViewModel>()
                .ForMember(x => x.Type, x => x.MapFrom(x => x.Type == LocationType.Mark ? "mark" : "location"))
                 .ForMember(x => x.IsDone, x => x.MapFrom(x => x.UserMarks != null && x.UserMarks.Any() && x.UserMarks.First().IsDone));

            CreateMap<Location, AddLocationViewModel>()
                 .ReverseMap();

            CreateMap<Media, MediaViewModel>()
                .ReverseMap();

            CreateMap<UserMark, UserLocationMarkViewModel>()
                .ReverseMap();
        }
    }
}
