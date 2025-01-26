import { useGetOrderOfUserQuery } from "../../services/createApi"
import toast from "react-hot-toast";
import { IKImage } from 'imagekitio-react';
import { format } from 'date-fns';

const OrderHistory = () => {
    const { data: orders, isLoading, error } = useGetOrderOfUserQuery(undefined, {
        // Disable automatic retries on error
        retry: false,
        // Refetch every 30 seconds
        pollingInterval: 30000,
    });
    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }
    console.log(orders)

    if (error) {
        console.error('Order fetch error:', error);
        toast.error(error.message)
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-semibold text-gray-600">Unable to load orders</h2>
                <p className="text-gray-500">Please try again later</p>
            </div>
        );
    }

    if (!orders?.length) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-semibold text-gray-600">No orders yet</h2>
                <p className="text-gray-500">Start ordering some delicious food!</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
            
            <div className="space-y-6">
                {orders.map((order) => (
                    <div 
                        key={order._id} 
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {/* Order Header */}
                        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Order ID: <span className="font-medium">{order._id}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Placed: {format(new Date(order.createdAt), 'PPp')}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-orange-500">
                                    ₹{order.totalAmount}.00
                                </p>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                                    ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                    order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                    'bg-gray-100 text-gray-800'}`}
                                >
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4">
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        {item.id && (
                                            <>
                                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                    <IKImage
                                                        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                                                        path={item.id.image}
                                                        transformation={[{
                                                            height: 100,
                                                            width: 100
                                                        }]}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                        lqip={{ active: true }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-800">
                                                        {item.id.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Quantity: {item.quantity} × ₹{item.id.price}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-800">
                                                        ₹{item.quantity * item.id.price}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory