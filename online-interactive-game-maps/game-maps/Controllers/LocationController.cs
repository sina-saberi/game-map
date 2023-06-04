using game_maps.Application.IServices;
using game_maps.Application.ViewModels.Location;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace game_maps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService service;
        public LocationController(ILocationService service)
        {
            this.service = service;
        }
        [HttpGet(nameof(GetLocations))]
        public async Task<IActionResult> GetLocations(string slug)
        {
            bool isLogin = Guid.TryParse(User.Identity!.Name, out var id);
            try
            {
                return Ok(await service.GetAll(slug, isLogin ? id : null));
            }
            catch (Exception er)
            {
                return NotFound(er);
            }
        }
        [HttpGet(nameof(GetLocation))]
        public async Task<IActionResult> GetLocation(int id)
        {
            bool isLogin = Guid.TryParse(User.Identity!.Name, out var userId);
            return Ok(await service.Get(id, isLogin ? userId : null));
        }
        [HttpPost(nameof(MarkLocation))]
        [Authorize]
        public async Task<IActionResult> MarkLocation(UserLocationMarkViewModel model)
        {
            try
            {
                if (User.Identity != null && User.Identity.Name != null)
                {
                    var userId = Guid.Parse(User.Identity.Name);
                    return Ok(await service.MarkLocation(model, userId));
                }
                return Unauthorized();
            }
            catch (Exception er)
            {
                return BadRequest(er);
            }
        }
        [HttpPost(nameof(AddLocation))]
        [Authorize]
        public async Task<IActionResult> AddLocation(AddLocationViewModel model)
        {
            try
            {
                if (User.Identity != null && User.Identity.Name != null)
                {
                    var res = await service.AddLocation(model, Guid.Parse(User.Identity.Name));
                    return Ok(res);
                }
                return Unauthorized();
            }
            catch (Exception er)
            {
                return BadRequest(er);
            }

        }

        [HttpDelete(nameof(RemoveLocation))]
        [Authorize]
        public async Task<IActionResult> RemoveLocation(int Id)
        {
            try
            {
                if (User.Identity != null && User.Identity.Name != null)
                    await service.RemoveLocation(Id, Guid.Parse(User.Identity.Name));
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
