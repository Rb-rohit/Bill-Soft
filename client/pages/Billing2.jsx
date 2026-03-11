
import axios from "axios";
import { useEffect, useRef, useState } from "react";



export default function Billing2() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);

    const inputRef = useRef(null);

    const token = localStorage.getItem("token");

    // fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(
                "http://localhost:5000/api/products",
                {headers: { Authorization: `Bearer ${token}` }}
            );
            setProducts(res.data);
        };
         if (inputRef.current) {
    inputRef.current.focus();
  }
        fetchProducts();
    }, []);

    // add to cart
    const addToCart = (product) => {
        const exist = cart.find((item) => item._id === product._id);

        if (exist) {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }

        setSearch("");
    };

    //update quantity
    const updateQty = (id, qty) => {
        if (qty <= 0) return;

        setCart(
            cart.map((item) => 
                item._id === id ? { ...item, quantity: qty } : item
            )
        );
    };

    //remove item
    const removeItem = (id) => {
        setCart(cart.filter((item) => item._id !== id));
    };

    // calculation totals
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const tax = subtotal * 0.05;  //5% tax
    const grandTotal = subtotal + tax;

    // filter products
    const filteredProducts = products.filter((p) => {
        const text = `${p.name || ""} ${p.barcode || ""}`.toLowerCase();
        return text.includes((search || "").toLowerCase());
    });

    // barcode handler 
    const handleBarcodeScan = (e) => {
  if (e.key === "Enter") {
    const product = products.find(
      (p) => p.barcode === search
    );

    if (product) {
      addToCart(product);
    } else {
      alert("Product not found");
    }

    setSearch("");

    // Refocus automatically
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }
};

    return(
        <div style={styles.container}>
            {/* left side - product search  */}
            <div style={styles.left}>
                <h3>Search Product</h3>
                <input 
                    ref={inputRef}
                    type="text"
                    placeholder="Search by name or barcode..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleBarcodeScan}
                    style={styles.searchInput}
                />

                <div style={styles.productList}>
                    {search &&
                        filteredProducts.map((p) => (
                            <div
                                key={p._id}
                                style={styles.productItem}
                                onClick={() => addToCart(p)}
                            >
                                {p.name} - ₹{p.price}
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* right side - cart */}
            <div style={styles.right}>
                <h3>Cart</h3>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>
                                    <input 
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        style={{ width: "50px" }}
                                        onChange={(e) => 
                                        updateQty(item._id, Number(e.target.value))
                                        }
                                    />
                                </td>
                                <td>₹{item.price}</td>
                                <td>₹{item.price * item.quantity}</td>
                                <td>
                                    <button onClick={() => removeItem(item._id)}>
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* total section  */}
                <div style={styles.totalSection}>
                    <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                    <p>Tax: ₹{tax.toFixed(2)}</p>
                    <h2>Grand Total: ₹{grandTotal.toFixed(2)}</h2>

                    <button style={styles.checkoutBtn}>
                        Complete Sale
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        height: "90vh"
    },
    left: {
        width: "40%",
        padding: "20px",
        borderRight: "1px solid #ddd"
    },
    right: {
        width: "60%",
        padding: "20px"
    },
    searchInput: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px"
    },
    productList: {
        maxHeight: "400px",
        overflowY: "auto"
    },
    productItem: {
        padding: "10px",
        borderBottom: "1px solid #eee",
        cursor: "pointer"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse"
    },
    totalSection: {
        marginTop: "20px",
        textAlighn: "right"
    },
    checkoutBtn: {
        padding: "10px 20px",
        fontSize: "16px",
        marginTop: "10px"
    }
};