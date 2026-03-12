import axios from 'axios';
import { useEffect, useState } from 'react';

import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, BarChart, Bar, PieChart, Pie} from "recharts";
import jsPDF from "jspdf";

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [paymentData, setPaymentData] = useState([]);

  const fetchStats = async () => {
      try {

        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            params: {
              fromDate,
              toDate
            },
            headers: {
              Authorization:`Bearer ${token}`
            }
          }
        );

        setStats(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    const fetchPaymentReport = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/dashboard/payment-report",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPaymentData(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    const downloadReport = () => {
      const doc = new jsPDF();

      doc.text("Sales Report", 20, 20);

      doc.text(`Today Revenue: ₹${stats.today.totalRevenue}`, 20, 40);
      doc.text(`Total Bills: ${stats.today.totalBills}`, 20, 50);

      doc.save("sales-report.pdf");
    };

  useEffect(() => {
    fetchStats();
    fetchPaymentReport();
  }, []);

  if (!stats) return <h2>Loading...</h2>;
  return (
    <div className='p-4'>
      <h1>Sales Report</h1>

      <div className='flex gap-4 mb-6'>

        <input 
          type='date'
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className='border p-2'
        />

        <input 
          type='date'
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className='border p-2'
        />

        <button
          onClick={fetchStats}
          className='bg-blue-500 text-white px-4 py-2'
        >
          Filter
        </button>
      </div>

      {/* today card  */}
      <div className='flex gap-4 mb-6'>

        <div className='p-4 border rounded shadow bg-white'>
          <h3>
            Today's Revenue
          </h3>
          <h2 className='text-2xl font-bold'>
            ₹{stats.today.totalRevenue}
          </h2>
        </div>

        <div className='p-4 border rounded shadow bg-white'>
          <h3> Today's Bills </h3>
          <h2 className='text-2xl font-bold'> {stats.today.totalBills} </h2>
        </div>

      </div>

      {/* Last 7 days sales  */}

      <h2>Last 7 Days Sales</h2>

      <LineChart 
        width={600}
        height={300}
        data={stats.dailySales}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey= "_id" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke='#8884d8'
        />
      </LineChart>

      {/* monthly sales  */}
      <h2 className='mt-6'>Monthly Revenue</h2>

      <BarChart
        width={600}
        height={300}
        data={stats.monthlySales}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="revenue"
          fill='#82ca9d'
        />
      </BarChart>

      {/* Payment Report */}
      <h2 className='mt-8'>Payment Mode Report</h2>

      <PieChart
        width={400}
        height={300}
      >
        <Pie
          data={paymentData}
          dataKey="total"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={100}
        />
        <Tooltip />
      </PieChart>

      {/*  download button */}

      <button
        onClick={downloadReport}
        className="bg-green-600 text-white px-4 py-2 mt-6"
      >
        Download PDF
      </button>

    </div>
  );
};

export default Reports;