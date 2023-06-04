using AutoMapper;
using game_maps.Application.IServices;
using game_maps.Application.ViewModels.Location;
using game_maps.Core.Entities;
using game_maps.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace game_maps.Application.Services
{
    public class LocationService : ILocationService
    {
        private readonly GameMapsContext context;
        private readonly IMapper mapper;
        public LocationService(GameMapsContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        public async Task<LocationViewModel> AddLocation(AddLocationViewModel model, Guid userId)
        {
            var map = await context.Maps.FirstOrDefaultAsync(x => x.Slug == model.MapSlug);
            if (map != null)
            {
                var location = mapper.Map<Location>(model);
                location.UserId = userId;
                location.Type = Core.Types.LocationType.Mark;
                location.MapId = map.Id;
                var res = await context.Locations.AddAsync(location);
                await context.SaveChangesAsync();
                return mapper.Map<LocationViewModel>(res.Entity);
            }
            return null!;
        }
        public async Task<LocationDetailViewModel> Get(int id, Guid? userId)
        {
            var res = await context.Locations
                .Include(x => x.Medias)
                .Include(x => x.UserMarks)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (res is not null)
                return mapper.Map<LocationDetailViewModel>(res);
            return null!;
        }
        public async Task<IEnumerable<LocationViewModel>> GetAll(string slug, Guid? userId)
        {
            var res = await (
                from map in context.Maps
                join location in context.Locations on map.Id equals location.MapId
                from categorie in context.Categories.Where(x => location.CategorieId == x.Id).DefaultIfEmpty()
                from marker in context.UserMarks.Where(x => location.Id == x.LocationId && x.UserId == userId).DefaultIfEmpty()
                where map.Slug == slug && (location.UserId == null || location.UserId == userId)
                select new LocationViewModel()
                {
                    Id = location.Id,
                    Icon = categorie.Icon,
                    Longitude = location.Longitude,
                    Latitude = location.Latitude,
                    IsDone = marker == null ? false : marker.IsDone,
                    CategorieName = categorie.Title,
                }).ToListAsync();

            return res;
        }
        public async Task<UserLocationMarkViewModel> MarkLocation(UserLocationMarkViewModel model, Guid userId)
        {
            var marker =
                await context.UserMarks
                .FirstOrDefaultAsync(x => x.UserId == userId && x.LocationId == model.LocationId);
            if (marker is not null)
            {
                marker.IsDone = model.IsDone;
                context.UserMarks.Update(marker);
            }
            else
            {
                marker = new UserMark
                {
                    IsDone = model.IsDone,
                    LocationId = model.LocationId,
                    UserId = userId,
                };
                await context.UserMarks.AddAsync(marker);
            }
            await context.SaveChangesAsync();
            return mapper.Map<UserLocationMarkViewModel>(marker);
        }
        public async Task RemoveLocation(int Id, Guid userId)
        {
            var location = await context.Locations.FirstOrDefaultAsync(x => x.Id == Id && x.UserId == userId);
            if (location is not null)
            {
                context.Locations.Remove(location);
                await context.SaveChangesAsync();
            }
        }
    }
}
