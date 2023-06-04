using AutoMapper;
using game_maps.Application.IServices;
using game_maps.Application.ViewModels.Categorie;
using game_maps.Application.ViewModels.Group;
using game_maps.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace game_maps.Application.Services
{
    public class GroupService : IGroupService
    {
        private readonly GameMapsContext context;
        private readonly IMapper mapper;
        public GroupService(GameMapsContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<GroupViewModel>> GetAll(string slug)
        {

            var data = await (
                from map in context.Maps
                join location in context.Locations on map.Id equals location.MapId
                join category in context.Categories on location.CategorieId equals category.Id
                join @group in context.Groups on category.GroupId equals @group.Id
                where map.Slug == slug && location.CategorieId != null
                select new
                {
                    LocationId = location.Id,
                    Category = category,
                    Group = @group
                }).GroupBy(x => x.Group.Id).ToListAsync();

            var groups = data.Select(gp =>
            {
                var group = mapper.Map<GroupViewModel>(gp.First().Group);
                var groupedCategories = gp.GroupBy(x => x.Category.Id);
                group.Categories = groupedCategories.Select(cat =>
                {
                    var categorie = mapper.Map<CategorieViewModel>(cat.First().Category);
                    categorie.Count = cat.Count();
                    return categorie;
                }).ToList();
                return group;
            });
            return groups;
        }
    }
}
