import axios from "axios";
import { useEffect, useState } from "react";

const SalesHistory = () => {
    const [sales, setSales] = useState([]);

    const fetchSales = async () => {
        try {
            const token = localStorage.getItem("token");

        const res = await axios.get(
            "http://localhost:5000/api/sales",
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        setSales(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-4">
                Sales History
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full border rounded-lg">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Invoice</th>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Payment</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>

                <tbody>

                {sales.map((sale) => (
                    <tr
                        key={sale._id}
                        className="border-t hover:bg-gray-50"
                    >
                        <td className="p-3 font-medium">
                            {sale.invoiceNumber}
                        </td>

                        <td className="p-3">
                            {sale.customerName}
                        </td>

                        <td className="p-3 text-green-600 font-semibold">
                            ₹{sale.grandTotal}
                        </td>

                        <td className="p-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                                {sale.paymentMethod.toUpperCase()}
                            </span>
                        </td>

                        <td className="p-3">
                            {new Date(sale.createdAt).toLocaleDateString()}
                        </td>

                        <td className="p-3">
                            <a
                                href={`http://localhost:5000/api/sales/${sale._id}/invoice`}
                                target="_blank"
                                className="text-indigo-600 hover:underline"
                            >
                                Download
                            </a>
                        </td>
                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    </div>
    );
};

export default SalesHistory;