using game_maps.Application.ViewModels.Location;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.IServices
{
    public interface ILocationService
    {
        Task<IEnumerable<LocationViewModel>> GetAll(string slug, Guid? userId);
        Task<LocationDetailViewModel> Get(int id, Guid? userId);
        Task<UserLocationMarkViewModel> MarkLocation(UserLocationMarkViewModel model, Guid userId);
        Task<LocationViewModel> AddLocation(AddLocationViewModel model, Guid userId);
        Task RemoveLocation(int Id, Guid userId);
    }
}
