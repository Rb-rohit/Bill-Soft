import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const SalesChart = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchWeeklySales = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/sales/weekly"
                );

                const days = ["Sun", "Mon","Tue", "Wed", "Thu", "Fri", "Sat"];

                const formatted = res.data.map(item => ({
                    day: days[item._id - 1],
                    sales: item.totalSales
                }));

                setData(formatted);

            }catch (error) {
                console.log(error);
            }
        };

        fetchWeeklySales();
    }, []);
    
    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Weekly Sales</h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#6366f1" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;