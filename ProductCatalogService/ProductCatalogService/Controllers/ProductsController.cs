using Microsoft.AspNetCore.Mvc;
using ProductCatalogService.Model;
using ProductCatalogService.Services;

namespace ProductCatalogService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductsController(ProductService productService) =>
            _productService = productService;

        [HttpGet]
        public async Task<List<Product>> Get() => await _productService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Product>> GetProductById(string id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> UpdateProduct(string id, Product updatedProduct)
        {
            var existingProduct = await _productService.GetAsync(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            updatedProduct.Id = id;
            await _productService.UpdateAsync(id, updatedProduct);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Product product)
        {
            await _productService.CreateAsync(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var product = await _productService.GetAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            await _productService.DeleteAsync(id);
            return NoContent();
        }
    }
}
