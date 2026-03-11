import axios from "axios";
import { useState } from "react"


const BillSummary = ({ cart = {cart}, setCart = {setCart} }) => {
    const [payment, setPayment] = useState("Cash");

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    const handleGenerateBill = async () => {
        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/sales",
                {
                    customerName: "Rakesh",
                    paymentMethod: payment.toLocaleLowerCase(),
                    items: cart.map(item => ({
                        productId: item._id,
                        quantity: item.qty
                    }))
                },
                {headers: { Authorization: `Bearer ${token}` }}
            );

            alert("Sale saved successfully");
            setCart([]); // clear cart
        } catch (error) {
        console.error(error);
        console.log("ERROR:", error.response?.data);

        alert(
            error.res?.data?.message || "Failed to generate bill" 
            
        );
    }
    };

    return (
        <div className="mt-6 border-t pt-4">
            <div className="flex justify-between">
                <span>subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold mt-2">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
                <button className="bg-blue-500 text-white p-2 rounded">Cash</button>
                <button className="bg-green-500 text-white p-2 rounded">UPI</button>
                <button className="bg-purple-500 text-white p-2 rounded">Card</button>
            </div>

            <button onClick={() => setPayment("Cash")}>Cash</button>
            <button onClick={() => setPayment("UPI")}>UPI</button>
            <button onClick={() => setPayment("Card")}>Card</button>

            <button onClick={handleGenerateBill} className="w-full bg-black text-white p-3 mt-4 rounded-lg">Generate Bill</button>

            <p className="mt-2">Payment: {payment}</p>
        </div>
    );
};

export default BillSummary;