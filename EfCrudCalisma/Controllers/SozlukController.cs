using EfCrudCalisma.Data;
using Microsoft.AspNetCore.Mvc;

namespace EfCrudCalisma.Controllers
{
    public class SozlukController : Controller
    {
        private readonly SozlukContext _context;
        public SozlukController(SozlukContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Yeni()
        {
            return View();
        }
        [HttpPost, ValidateAntiForgeryToken]
        public IActionResult Yeni(Girdi girdi)
        {
            if (ModelState.IsValid)
            {
                _context.Girdiler.Add(girdi);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View();
        }
        public IActionResult Sil(int id)
        {
            var girdi = _context.Girdiler.FirstOrDefault(x => x.Id == id);
            if (girdi == null)
            {
                return NotFound();
            }
            return View(girdi);
        }
        [ActionName("Sil")]
        [HttpPost,ValidateAntiForgeryToken]
        public IActionResult SilOnay(int id)
        {
            var girdi = _context.Girdiler.FirstOrDefault(x => x.Id == id);
            if (girdi == null)
            {
                return NotFound();
            }
            _context.Girdiler.Remove(girdi);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }
        public IActionResult Duzenle(int id)
        {
            var girdi = _context.Girdiler.FirstOrDefault(x => x.Id == id);
            if (girdi == null)
            {
                return NotFound();
            }
            return View(girdi);
        }
        
        [HttpPost,ValidateAntiForgeryToken]
        public IActionResult Duzenle(Girdi girdi)
        {
            if (ModelState.IsValid)
            {
                _context.Update(girdi);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View();
        }
    }
}