using game_maps.Application.IServices;
using Microsoft.AspNetCore.Mvc;

namespace game_maps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly IMapService maps;

        public MapController(IMapService maps)
        {
            this.maps = maps;
        }

        [HttpGet(nameof(GetMaps))]
        public async Task<IActionResult> GetMaps(string slug)
        {
            var res = await maps.GetAll(slug);
            if (res is not null)
                return Ok(res);
            return NotFound();
        }

        [HttpGet(nameof(GetMap))]
        public async Task<IActionResult> GetMap(string slug)
        {
            var res = await maps.Get(slug);
            if (res is not null)
                return Ok(res);
            return BadRequest();
        }
    }
}
