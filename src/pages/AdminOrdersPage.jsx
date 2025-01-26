import { useGetAllOrdersAdminQuery, useUpdateOrderStatusMutation } from '../../services/createApi';
import { useAuth } from '../../context/userContext';
import { format } from 'timeago.js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router';

const AdminOrdersPage = () => {
    const {user} = useAuth()
    const [searchParam,setSearchParams] = useSearchParams()
    const [sort,setSort] = useState('date_desc')
    const { data: orders, isLoading, isError } = useGetAllOrdersAdminQuery(sort);
    const [updateOrderStatus,{isSuccess,isLoading:updateLoad}] = useUpdateOrderStatusMutation()
   console.log(user,orders)
    useEffect(()=>{
        console.log('admin admin')
    },[])
    // Update order status
    const handleUpdateStatus = async (orderId, status) => {
        try {
            await updateOrderStatus({ id: orderId, status }).unwrap();
            toast.success("updated!")
        } catch (error) {
            toast.error(error.message||"error")
            console.error('Error updating order status:', error);
        }
    };
   
    const handleChange = (e) =>{
        setSort(e.target.value)
        setSearchParams({sort:sort})
    }

    if (isLoading&&updateLoad) return <div>Loading orders...</div>;
    if (isError) return <div>Error fetching orders</div>;

    return (
        <div className="p-4">
            <div className='flex justify-between'>
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <select value={sort} onChange={handleChange}
            className="border border-gray-300 rounded-lg px-2 py-2 text-xs text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            >
            <option value="">Sort by</option>
            <option value="date_asc">Date: Oldest First</option>
            <option value="date_desc">Date: Newest First</option>
            <option value="comp">Completed</option>
            <option value="pend">Pending</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            </select>
                </div>
            <div className="space-y-4">
                {orders?.map((order) => (
                    <div key={order._id} className="bg-white rounded-lg shadow-md p-4">
                        {/* Order ID */}
                        <div className='flex justify-between flex-col sm:flex-row'>
                        <div className="text-sm font-medium text-gray-900">
                            Order ID: <span className="text-gray-500">#{order._id}</span>
                        </div>
                        <div>
                            <h3 className='text-xs '>Placed At: {format(order.createdAt)}</h3>
                        </div>
                        </div>

                        {/* User Details */}
                        <div className="text-sm text-gray-900 mt-2 flex flex-col gap-2">
                            <div className="">Name: {order.userId?.name}</div>
                            <div className="">Email: {order.userId?.email}</div>
                        </div>

                        {/* Total and Status */}
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <div className="text-sm text-gray-900">
                                Total: <span className="font-medium">₹{order.totalAmount}</span>
                            </div>
                            <div className="text-sm">
                                Status:{" "}
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        order.status === 'Completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 mt-4 gap-4">
                            <button
                                onClick={() => handleUpdateStatus(order._id, 'Completed')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                                    order.status === 'Completed'
                                        ? 'bg-green-500 text-white cursor-not-allowed'
                                        : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                                disabled={order.status === 'Completed'}
                            >
                                Complete
                            </button>
                            <button
                                onClick={() => handleUpdateStatus(order._id, 'Pending')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                                    order.status === 'Pending'
                                        ? 'bg-yellow-500 text-white cursor-not-allowed'
                                        : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                }`}
                                disabled={order.status === 'Pending'}
                            >
                                Pending
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrdersPage;