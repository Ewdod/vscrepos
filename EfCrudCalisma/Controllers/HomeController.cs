using EfCrudCalisma.Data;
using EfCrudCalisma.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace EfCrudCalisma.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SozlukContext _context; // artik bu sekilde yapilacak

        //SozlukContext _db = new SozlukContext(); bu artik burada yazilmayacak

        public HomeController(ILogger<HomeController> logger, SozlukContext context) // buna dependency injection deniyor
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            // anasayfada rastgele bir kelime ve anlamini gosterelim
            int adet = _context.Girdiler.Count();
            int skip = new Random().Next(adet); // 0 - 3
            var sozcuk = _context.Girdiler.Skip(skip).First();
            return View(sozcuk);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}