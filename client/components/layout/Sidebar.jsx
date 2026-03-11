import { BarChart3, FileText, LayoutDashboard, Package, Settings, Users } from "lucide-react"
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-gray-900 text-white fixed">
            <h1 className="text-2xl font-bold p-5 border-gray-700">
                Billing System
            </h1>

            <ul className="p-4 space-y-4">
                <li className="flex items-center gap-3 hover:text-yellow-400 cursor-pointer">
                    <LayoutDashboard size={20} /> Dashboard
                </li>

                <li className="flex items-center gap-3 hover:text-yellow-400 cursor-pointer">
                    <Link to={"/Billing"} className="flex items-center gap-3"> <FileText size={20} /> New Bill </Link>
                </li>

                <li className="flex items-center gap-3 hover:text-yellow-400 cursor-pointer">
                    <Link to={"/Product"} className="flex gap-3"><Package size={20} /> Products</Link>
                </li>

                <li className="flex items-center gap-3 hover:text-yellow-400 cursor-pointer">
                    <Users size={20} /> Customers
                </li>

                <li className="flex items-center gap-3 hover:text-yellow-400 cursor-pointer">
                    <BarChart3 size={20} /> Reports
                </li>

                <li className="flex items-center gap-3 hover:text-yellow-400 cursor-pointer">
                    <Settings size={20} /> Settings
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;