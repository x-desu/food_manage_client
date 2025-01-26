import { Link } from "react-router"
import  IKImage  from 'imagekitio-react';
import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementItem, incrementItem } from "../../cart/cartSlice";
import PropTypes from 'prop-types';
import { useAuth } from "../../context/userContext";

const MenuItem = ({item}) => {

    const cart = useSelector((state)=>state.cart.items)
    const dispatch = useDispatch()
    const {user} = useAuth()
    const handleAddToCart = () => {
        dispatch(addItem({id:item._id,name:item.name,price:item.price}))
    }

    const handleIncrement = () => {
        dispatch(incrementItem({id: item._id}))
    }

    const handleDecrement = () => {
        dispatch(decrementItem({id: item._id}))
    }
    
    const cartItem = cart.find(cartItem=>cartItem.id === item._id)
    const quantity = cartItem?.quantity || 0
    
    if(user === 'admin'){
        return(
            <div>
            {/* Image */}
            <Link to={`/menu/${item._id}`} className="relative  w-full">
              <IKImage
                urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                path={item.image}
                transformation={[{
                  height: 300,
                  width: 400,
                  quantity:75
                }]}
                loading="lazy"
                
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-white/90 px-2 py-1 rounded-full text-xs sm:text-sm sm:font-medium text-gray-700">
                  {item.category}
                </span>
              </div>
            </Link>

            {/* Content */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2 min-h-16">
                  <Link to={`/menu/${item._id}`}>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 max-w-24 sm:max-w-fit flex-wrap ">
                  {item.name}
                </h3>
                  </Link>
                <span className="text-lg font-bold text-orange-600">
                  ₹{item.price}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-sm ${
                  item.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                </span>
                { quantity === 0? <button onClick={handleAddToCart} disabled={!item.stock>0} className="px-4 py-2  sm:px-4 sm:py-2 text-xs sm:text-base bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Add to Cart
                </button>:<div className="flex items-center gap-2 bg-orange-500 rounded-lg overflow-hidden">
                  <button 
                      onClick={handleDecrement}
                      className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
                  >
                      -
                  </button>
                  <span className="text-white font-medium min-w-[20px] text-center">
                      {quantity}
                  </span>
                  <button 
                      onClick={handleIncrement}
                      className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
                  >
                      +
                  </button>
                  </div>}
              </div>
            </div>
          </div>
        )
    }

  return (
        <div>
              {/* Image */}
              <div  className="relative  w-full">
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                  path={item.image}
                  transformation={[{
                    height: 300,
                    width: 400,
                    quantity:75
                  }]}
                  loading="lazy"
                  
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-white/90 px-2 py-1 rounded-full text-xs sm:text-sm sm:font-medium text-gray-700">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2 min-h-16">
                    <div >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 max-w-24 sm:max-w-fit flex-wrap ">
                    {item.name}
                  </h3>
                    </div>
                  <span className="text-lg font-bold text-orange-600">
                    ₹{item.price}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    item.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                  </span>
                  { quantity === 0? <button onClick={handleAddToCart} disabled={!item.stock>0} className="px-4 py-2  sm:px-4 sm:py-2 text-xs sm:text-base bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Add to Cart
                  </button>:<div className="flex items-center gap-2 bg-orange-500 rounded-lg overflow-hidden">
                    <button 
                        onClick={handleDecrement}
                        className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
                    >
                        -
                    </button>
                    <span className="text-white font-medium min-w-[20px] text-center">
                        {quantity}
                    </span>
                    <button 
                        onClick={handleIncrement}
                        className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
                    >
                        +
                    </button>
                    </div>}
                </div>
              </div>
            </div>
  )
}

MenuItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default MenuItem