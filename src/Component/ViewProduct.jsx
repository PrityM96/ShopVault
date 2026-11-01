import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:2000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${product?.name}"?`)) return;
    try {
      await axios.delete(`http://localhost:2000/products/${id}`);
      toast.success("Product deleted");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!product) return (
    <div className="view-page">
      <div className="empty-state"><p>Loading product...</p></div>
    </div>
  );

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating) ? '★' : '☆').join('');

  return (
    <div className="view-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="view-card">
        <img src={product.image} alt={product.name} className="view-card-image" />

        <div className="view-card-body">
          <div>
            <h2 className="view-card-name">{product.name}</h2>
            <p className="view-card-price">₹{Number(product.price).toLocaleString('en-IN')}</p>
          </div>

          <div className="view-card-meta">
            <div className="view-meta-item">
              <span>⭐</span>
              <span><strong>{product.rating} / 5</strong> rating</span>
              <span style={{ color: '#e8c97e', letterSpacing: 2, marginLeft: 'auto' }}>{stars}</span>
            </div>
            <div className="view-meta-item">
              <span>🆔</span>
              <span>Product ID: <strong>{product.id}</strong></span>
            </div>
          </div>

          <div className="view-card-actions">
            <Link to={`/edit/${product.id}`} className="btn btn-primary">
              ✏️ Edit Product
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              🗑 Delete
            </button>
            <Link to="/" className="btn btn-ghost">← Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
