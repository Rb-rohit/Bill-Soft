const bills = [
    {id: 101, customer: "Rahul", amount: 850, payment: "Cash"},
    {id: 102, customer: "Amit", amount: 1200, payment: "UPI"},
    {id: 103, customer: "Akash", amount: 5260, payment: "Card"},
];

const RecentBills = () => {
    return (
        <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Recent Bills</h2>

            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th>Bill No</th>
                        <th>Customer</th>
                        <th>Amoount</th>
                        <th>Payment</th>
                    </tr>
                </thead>

                <tbody>
                    {bills.map((bill) => {
                        <tr key={bill.id} className="border-b hover:bg-gray-50">
                            <td>#{bill.id}</td>
                            <td>{bill.customer}</td>
                            <td>{bill.amount}</td>
                            <td>₹{bill.payment}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default RecentBills;