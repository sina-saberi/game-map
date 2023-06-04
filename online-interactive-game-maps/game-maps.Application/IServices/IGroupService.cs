using game_maps.Application.ViewModels.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace game_maps.Application.IServices
{
    public interface IGroupService
    {
        public Task<IEnumerable<GroupViewModel>> GetAll(string slug);
    }
}
