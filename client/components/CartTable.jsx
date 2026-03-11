import { useEffect, useRef } from "react";

const CartTable = ({cart, setCart, selectedItemId, setSelectedItemId}) => {
    const rowRefs = useRef({});
    const changeQty = (id, type) => {
        setCart(prev =>
            prev.map(item => {
            if (item._id === id) {
                const qty =
                    type === "inc" 
                    ? item.qty + 1 
                    : Math.max(1, item.qty - 1);
                return { ...item, qty };
            }
            return item;
            })
        );
    };

    const removeItem = (id) => {
        setCart(prev => 
            prev.filter(item => item._id !== id))
    };

    useEffect(() => {
        if (selectedItemId && rowRefs.current[selectedItemId]) {
            rowRefs.current[selectedItemId].scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }, [selectedItemId]);

    return (
        <div className="h-[400px] overflow-y-auto">
            <table className="w-full text-sm">
            <thead>
                <tr className="border-b">
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cart.map(item => (
                    <tr 
                        key={item._id} 
                        ref={el => (rowRefs.current[item._id] = el)}
                        onClick={() => setSelectedItemId(item._id)}
                        className={`cursor-pointer ${
                            selectedItemId === item._id 
                            ? "bg-blue-100"
                            : ""
                        }`}
                    >
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{item.price}</td>
                        <td>₹{item.qty * item.price}</td>
                        <td>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeItem(item._id)
                                }}
                                className="text-red-500"
                            >X</button>
                        </td>
                        <td>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeQty(item._id, "dec");
                                }}
                            >
                                -
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeQty(item._id, "inc");
                                }}
                            >
                                +
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        
    );
};

export default CartTable;