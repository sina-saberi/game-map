using game_maps.Application.ViewModels.Map;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.IServices
{
    public interface IMapService
    {
        public Task<IEnumerable<MapViewModel>> GetAll(string slug);
        Task<MapDetailViewModel> Get(string slug);
    }
}
