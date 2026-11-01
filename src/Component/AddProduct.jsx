import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", rating: "", image: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("http://localhost:2000/products", form);
      toast.success("Product added!");
      navigate("/");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Add Product</span>
      </div>

      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Add New Product</h2>
          <p className="form-desc">Fill in the details to list a new product</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              className="form-input"
              name="name"
              placeholder="e.g. iPhone 15 Pro"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <input
              className="form-input"
              name="price"
              type="number"
              placeholder="e.g. 99999"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rating (1–5)</label>
            <input
              className="form-input"
              name="rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="e.g. 4.5"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              className="form-input"
              name="image"
              placeholder="https://..."
              onChange={handleChange}
            />
          </div>

          {form.image && (
            <div style={{ marginBottom: 20 }}>
              <img
                src={form.image}
                alt="Preview"
                style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                onError={e => e.target.style.display = 'none'}
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ flex: 1, justifyContent: 'center' }}>
              {submitting ? "Adding..." : "Add Product"}
            </button>
            <Link to="/" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
