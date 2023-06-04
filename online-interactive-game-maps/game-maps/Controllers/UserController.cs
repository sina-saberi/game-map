using game_maps.Application.ViewModels.User;
using game_maps.Core.Entities;
using game_maps.Infrastructure.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
namespace game_maps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> manager;
        private readonly EncryptionUtility utility;

        public UserController(UserManager<User> manager, EncryptionUtility utility)
        {
            this.manager = manager;
            this.utility = utility;
        }

        [HttpPost(nameof(RegisterUser))]
        public async Task<IActionResult> RegisterUser(UserRegiserViewModel model)
        {
            var res = await manager.CreateAsync(new()
            {
                UserName = model.UserName,
                Email = model.Email,
            }, model.Password);
            if (res.Succeeded)
                return Ok(res);
            return BadRequest(res);
        }

        [HttpPost(nameof(Login))]
        public async Task<IActionResult> Login(LoginViewModel model)
        {

            var user = await manager.FindByEmailAsync(model.Email);
            if (user is null) return NotFound();

            var result = await manager.CheckPasswordAsync(user, model.Password);
            if (!result) return BadRequest();

            var token = utility.GetNewToken(user.Id);

            return Ok(token);
        }
    }
}
