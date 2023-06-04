using game_maps.Application.IServices;
using Microsoft.AspNetCore.Mvc;

namespace game_maps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameService gameService;
        public GameController(IGameService gameService)
        {
            this.gameService = gameService;
        }

        [HttpGet(nameof(GetGames))]
        public async Task<IActionResult> GetGames()
        {
            return Ok(await gameService.GetAll());
        }

        [HttpGet(nameof(GetGame))]
        public async Task<IActionResult> GetGame(string slug)
        {
            var res = await gameService.Get(slug);
            if (res is not null)
                return Ok(res);
            return NotFound();
        }
    }
}
