import { motion } from 'framer-motion';
import React from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { EmptyCart } from '../../assets/img';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/stateProvider';
import { cart } from '../../utils/firebaseFunctions';
import CartItem from './cartItem';
const CartContainer = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue() as any;
  const [flag, setFlag] = React.useState(1);
  const [tot, setTot] = React.useState(0);
  React.useEffect(() => {
    // cart.get(user.uid).then(data => console.log(data));
    const totalPrice = cartItems.reduce(function (accumulator:any, item:any) {      
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    // console.log(tot);
  }, [tot, flag, cartItems]);
  // console.log(cartItems);
  
  const clearCart = () => {
    cart.deleteAll(user.uid);
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    // localStorage.setItem("cartItems", JSON.stringify([]));
  };
  const onClickShowCart= () =>
  {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <motion.div
      initial={{opacity: 0, x: 200}}
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, x: 200}}
      className='
      w-full md:w-375 h-screen bg-white
      fixed flex flex-col top-0 right-0 z-50'>
        <div
          className='
          w-full flex items-center justify-between
          p-4' >
            <motion.div
              whileTap={{ scale: 0.75}}
              onClick={onClickShowCart}>
                <MdOutlineKeyboardBackspace
                  className='text-textColor text-3xl cursor-pointer' />
            </motion.div>
            <p
              className='text-textColor text-lg font-semibold'> Cart</p>
            <motion.p
              whileTap={{ scale: 0.80}}
              className='
              flex items-center gap-2 p-1 px-2 my-2
              bg-gray-100 rounded-md hover:shadow-md
              cursor-pointer text-base text-textColor'
              onClick={clearCart}>
                Clear
                <RiRefreshFill />
            </motion.p>  
        </div>
        {/* body cart  */}
        {cartItems && cartItems.length > 0 
          ? (
            <div
              className='
              w-full h-full bg-cartBg flex flex-col '>
                {/* Cart list items */}
                <div
                  className='
                  w-full h-370 md:h-42 px-6 py-10
                  flex flex-col gap-3 overflow-y-scroll
                  scrollbar-none'>
                    {/* Cart Item */}
                    { cartItems 
                        && cartItems.map((item: any) => (
                          <CartItem
                            flag={flag}
                            setFlag={setFlag}
                            qtyCart={item.qty}
                            key={item?.id}
                            id={item?.id}
                            imageSrc={item?.imageUrl}
                            name={item?.title}
                            price={item?.price} />
                        ))
                        
                    }
                </div>
                {/* cart total */}
                <div
                  className='
                  w-full flex flex-1 flex-col py-8 px-2 gap-2
                  bg-cartTotal rounded-t-[2rem] items-center 
                  '>
                    <div
                      className='w-full flex items-center justify-between'>
                        <p
                          className='text-gray-400 text-lg'>Sub Total:</p>
                        <p
                          className='text-gray-400 text-lg'>$ {tot.toFixed(2)}</p>
                    </div>
                    <div
                      className='w-full flex items-center justify-between gap-1'>
                        <p
                          className='text-gray-400 text-lg'>Delivery:</p>
                        <p
                          className='text-gray-400 text-lg'>$ 2.9</p>
                    </div>
                    <div
                      className='w-full border-b border-gray-600 my-2' />
                    <div
                      className='w-full flex items-center justify-between'>
                        <p
                          className='text-gray-200 text-xl font-semibold'>Total:</p>
                        <p
                          className='text-gray-200 text-xl font-semibold'>${(tot + 2.5).toFixed(2)}</p>
                    </div>
                    {user 
                      ? <motion.button
                          whileTap={{ scale: 0.8 }}
                          className="
                          w-full bg-orange-600 p-2 text-gray-50 rounded-full
                          text-lg my-2 hover:shadow-lg hover:bg-orange-500">
                            Check Out
                        </motion.button>
                      : null}
                </div>
            </div>
          )
          : (
            <div
              className='
              w-full h-full flex flex-col
              items-center justify-center gap-6'>
                <img
                  className='w-300'
                  src={EmptyCart}
                  alt="empty-cart" />
                <p
                  className='text-xl text-textColor font-semibold'>
                    Add some items to your cart
                </p>
            </div>
          )
        }
        
    </motion.div>
  );
};

export default CartContainer;