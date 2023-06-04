using AutoMapper;
using game_maps.Application.IServices;
using game_maps.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using game_maps.Application.ViewModels.Map;

namespace game_maps.Application.Services
{
    public class MapService : IMapService
    {
        private readonly GameMapsContext context;
        private readonly IMapper mapper;
        public MapService(GameMapsContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        public async Task<MapDetailViewModel> Get(string slug)
        {
            var res = await context.Maps.SingleAsync(x => x.Slug == slug);
            if (res is not null)
                return mapper.Map<MapDetailViewModel>(res);
            return null!;
        }
        public async Task<IEnumerable<MapViewModel>> GetAll(string slug)
        {
            var game = await context.Games
                .Include(x => x.Maps)
                .FirstOrDefaultAsync(x => x.Slug == slug);
            if (game is not null && game.Maps is not null)
            {
                return mapper.Map<IEnumerable<MapViewModel>>(game.Maps);
            }
            return null!;
        }
    }
}
