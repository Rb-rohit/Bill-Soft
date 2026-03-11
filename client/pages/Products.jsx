import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    barcode: "",
    price: "",
    stock: ""
  });

  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const token = localStorage.getItem("token");

  // fetch product
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products?page=${page}&limit=5`,{
      headers: {Authorization: `Bearer ${token}` }
    });
    setProducts(res.data.products || []);
    setPages(res.data.pages || 1);
    }catch (error) {
      console.log(error.response?.data || error.message);
      setProducts([]); 
    }
    
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  //handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //add/ Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          form,
          {headers: {Authorization: `Bearer ${token}`} }
        );
        setEditId(null);
      }else {
        await axios.post(
          "http://localhost:5000/api/products/add",
          form,
          { headers: {Authorization: `Bearer ${token}`} }
        );
      }

      setForm({ name: "", barcode: "", price: "", stock: "" });
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  // edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      barcode: product.barcode,
      price: product.price,
      stock: product.stock
    });
    setEditId(product._id);
  };


  // delete product
  const handleDelete = async (_id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
      `http://localhost:5000/api/products/${_id}`,
      { headers: {Authorization: `Bearer ${token}`} }
    );

    fetchProducts();
    setPage(1);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
    
  };
  return (
    <div style={{padding: "20px"}}>
      <h2>
        Product Management
      </h2>

      {/* form  */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          name='name'
          placeholder='Product Name'
          value={form.name}
          onChange={handleChange}
          required
        />

        <input 
          name='barcode'
          placeholder='Barcode'
          value={form.barcode}
          onChange={handleChange}
          required
        />

        <input 
          name='price'
          type='number'
          placeholder='price'
          value={form.price}
          onChange={handleChange}
          required
        />

        <input 
          name='stock'
          type='number'
          placeholder='Stock'
          value={form.stock}
          onChange={handleChange}
          required
        />

        <button type='submit' className=" py-2 disabled:opacity-70 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Table  */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Barcode</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr 
              key={p._id}
              style={{
                backgroundColor:
                  p.lowStockLimit && p.stock <= p.lowStockLimit ? "#ffe5e5" : "white"
              }}
            >
              <td>{p.name}</td>
              <td>{p.barcode}</td>
              <td>₹{p.price}</td>
              <td>
                {p.stock}
                {p.stock <= p.lowStockLimit && (
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    ⚠ Low
                  </span>
                )}
              </td>
              <td>
                <button onClick={()=> handleEdit(p)}>Edit</button>
                <button 
                  style={{ marginLeft: "10px", color: "red"}}
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination Button  */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(prev => prev + 1)}>
            Next
          </button>
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  }
};

export default Products