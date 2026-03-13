import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


const Settings = () => {

    const [shopName, setShopName] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [address, setAddress] = useState("");

    const fetchSettings = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/settings"
        );

        setShopName(res.data.shopName);
        setGstNumber(res.data.gstNumber);
        setAddress(res.data.address);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async () => {
        await axios.put(
            "http://localhost:5000/api/settings",
            {
                shopName,
                gstNumber,
                address
            }
        );

        alert("Settings saved");
    };

    return(
        <div className="p-6 max-w-lg">

            <h2 className="text-2xl font-bold mb-4">
                Shop Settings
            </h2>

            <div className="space-y-4">
                <input 
                    type="text"
                    placeholder="Shop Name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <input 
                    type="text"
                    placeholder="GST Number"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <textarea 
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <button
                    onClick={handleSave}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default Settings;