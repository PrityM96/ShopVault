import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './Component/HomePage'
import EditProduct from './Component/EditProduct'
import ViewProduct from './Component/ViewProduct'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddProduct from './Component/AddProduct'

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            Shop<span>Vault</span>
          </Link>
          <div className="navbar-actions">
            <Link to="/add" className="btn btn-primary">
              + Add Product
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/edit/:id' element={<EditProduct />} />
          <Route path='/view/:id' element={<ViewProduct />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        theme="dark"
        toastStyle={{
          background: '#1a1a1a',
          border: '1px solid #2e2e2e',
          color: '#f0ede8',
          fontFamily: 'DM Sans, sans-serif',
        }}
      />
    </>
  )
}

export default App
