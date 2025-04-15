using ProductCatalogService.Model;
using MongoDB.Driver;

namespace ProductCatalogService.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductService(IConfiguration config)
        {
            var settings = config.GetSection("ProductCatalogDB").Get<ProductCatalogDB>();
            if (settings == null)
            {
                throw new ArgumentNullException(nameof(settings), "1");
            }
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _products = database.GetCollection<Product>(settings.ProductsCollectionName);
        }

        public async Task<List<Product>> GetAsync() => await _products.Find(_ => true).ToListAsync();

        public async Task<Product?> GetAsync(string id) => await _products.Find(p => p.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Product product) => await _products.InsertOneAsync(product);

        public async Task UpdateAsync(string id, Product updatedProduct) =>
            await _products.ReplaceOneAsync(p => p.Id == id, updatedProduct);

        public async Task DeleteAsync(string id) => await _products.DeleteOneAsync(p => p.Id == id);
    }
}
