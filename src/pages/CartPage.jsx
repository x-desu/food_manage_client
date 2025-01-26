import { useSelector, useDispatch } from 'react-redux';
import { incrementItem, decrementItem, removeItem, clearCart } from '../../cart/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useCreateOrderMutation } from '../../services/createApi';
import toast from 'react-hot-toast';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const [createOrder,{isLoading,error,isSuccess}] = useCreateOrderMutation()
    const navigate = useNavigate()
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
                <p className="text-gray-500">Add some delicious items to your cart</p>
                <Link 
                    to="/" 
                    className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                    Browse Menu
                </Link>
            </div>
        );
    }

    const handleCheckout = async() => {
      try {
        const order = {
            items:cartItems.map(item=>({
                id:item.id,
                quantity:item.quantity
            })),
            totalAmount:total
        }
        console.log(order)
       const res = await createOrder(order).unwrap()
       console.log(res)
       toast.success(res?.message||"success")
       navigate('/success')
      } catch (error) {
        toast.error("error Ordering")
        console.log("error adding order",error)
      }
    }


    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
                <button 
                    onClick={() => dispatch(clearCart())}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <Trash2 size={20} />
                    Clear Cart
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                        <div key={item.id} className="p-4 flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-orange-600 font-medium">₹{item.price}</p>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 bg-orange-500 rounded-lg overflow-hidden">
                                    <button 
                                        onClick={() => dispatch(decrementItem({ id: item.id }))}
                                        className="px-3 py-2 text-white hover:bg-orange-600 transition-colors cursor-pointer"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-white font-medium min-w-[20px] text-center">
                                        {item.quantity}
                                    </span>
                                    <button 
                                        onClick={() => dispatch(incrementItem({ id: item.id }))}
                                        className="px-3 py-2 text-white hover:bg-orange-600 transition-colors cursor-pointer"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button 
                                    onClick={() => dispatch(removeItem({ id: item.id }))}
                                    className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-lg font-semibold">₹{total}.00</span>
                    </div>
                    <button onClick={handleCheckout}
                        className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
