using AutoMapper;
using game_maps.Application.IServices;
using game_maps.Application.ViewModels.Game;
using game_maps.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace game_maps.Application.Services
{
    public class GameService : IGameService
    {
        private readonly IMapper mapper;
        private readonly GameMapsContext context;
        public GameService(IMapper mapper, GameMapsContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        public async Task<GameViewModel> Get(string slug)
        {
            var res = await context.Games.SingleOrDefaultAsync(x => x.Slug == slug);
            if (res is not null)
                return mapper.Map<GameViewModel>(res);
            return null!;
        }
        public async Task<IEnumerable<GameViewModel>> GetAll()
        {
            var res = await context.Games.ToListAsync();
            return mapper.Map<IEnumerable<GameViewModel>>(res);
        }
    }
}
