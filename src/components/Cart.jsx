import { ShoppingCart } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';

const Cart = ({ itemCount = 0 }) => {
    const cartRef = useRef(null);

    // Wiggle animation w
    useEffect(() => {
        if (itemCount > 0 && cartRef.current) {
            cartRef.current.classList.add('animate-wiggle');
            
            setTimeout(() => {
                cartRef.current?.classList.remove('animate-wiggle');
            }, 1000);
        }
    }, [itemCount]);

    return (
        <Link to="/cart" className="relative">
            <div ref={cartRef} className="relative p-2 transition-colors hover:text-orange-500">
                <ShoppingCart size={24}  className='text-orange-400'/>
                {itemCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {itemCount > 99 ? '99+' : itemCount}
                    </div>
                )}
            </div>
        </Link>
    );
};

Cart.propTypes = {
    itemCount: PropTypes.number
};

export default Cart;
