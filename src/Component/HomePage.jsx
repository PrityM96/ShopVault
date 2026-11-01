import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:2000/products")
      .then(res => setProducts(res.data))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await axios.delete(`http://localhost:2000/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Product Catalogue</h1>
          <p className="page-subtitle">{products.length} items in your store</p>
        </div>
        <Link to="/add" className="btn btn-primary">+ New Product</Link>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <h3>No products yet</h3>
              <p>Add your first product to get started</p>
            </div>
          ) : (
            products.map((p, i) => (
              <div
                key={p.id}
                className="product-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="product-card-image-wrap">
                  <img src={p.image} alt={p.name} className="product-card-image" />
                  <div className="product-card-badge">⭐ {p.rating}</div>
                </div>
                <div className="product-card-body">
                  <h3 className="product-card-name">{p.name}</h3>
                  <p className="product-card-price">₹{Number(p.price).toLocaleString('en-IN')}</p>
                  <div className="product-card-actions">
                    <Link to={`/view/${p.id}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                      View
                    </Link>
                    <Link to={`/edit/${p.id}`} className="btn btn-ghost">Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(p.id, p.name)}>
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
