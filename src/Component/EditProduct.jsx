import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", price: "", rating: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:2000/products/${id}`)
      .then(res => setForm(res.data))
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`http://localhost:2000/products/${id}`, form);
      toast.success("Product updated!");
      navigate("/");
    } catch {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="form-page">
      <div className="empty-state"><p>Loading...</p></div>
    </div>
  );

  return (
    <div className="form-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Edit Product</span>
      </div>

      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Edit Product</h2>
          <p className="form-desc">Update the details for "{form.name}"</p>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              className="form-input"
              name="name"
              value={form.name}
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
              value={form.price}
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
              value={form.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              className="form-input"
              name="image"
              value={form.image}
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
              {submitting ? "Saving..." : "Save Changes"}
            </button>
            <Link to={`/view/${id}`} className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
