using game_maps.Application.ViewModels.Game;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.IServices
{
    public interface IGameService
    {
        Task<IEnumerable<GameViewModel>> GetAll();
        Task<GameViewModel> Get(string slug);
    }
}
