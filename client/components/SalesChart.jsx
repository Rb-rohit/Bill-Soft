import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const data = [
    {day: "Mon", sales: 4000},
    {day: "Tue", sales: 3000},
    {day: "Wed", sales: 5000},
    {day: "Thu", sales: 2700},
    {day: "Fri", sales: 6890},
    {day: "Sat", sales: 8000},
    {day: "Sun", sales: 4506},
];

const SalesChart = () => {
    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Weekly Sales</h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strockeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" strocke="#6366f1" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;