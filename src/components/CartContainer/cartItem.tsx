import { motion } from 'framer-motion';
import React from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/stateProvider';
import { cart } from '../../utils/firebaseFunctions';
let items: never[] = [];

type CartItemProps = {
  imageSrc?: string | undefined,
  name: string | undefined, 
  count?: number | string | undefined,
  price?: number | string | undefined
  id?: string,
  setFlag: (num: number) => void, 
  flag: number,
  qtyCart: number
};
const CartItem = ({imageSrc, name, count = 1, price, id='', setFlag, flag, qtyCart = 0 }: CartItemProps) => {
  const [{ user ,cartItems }, dispatch] = useStateValue() as any;  
  const [qty, setQty] =React.useState(qtyCart);
  const cartDispatch = async() => {
    // localStorage.setItem("cartItems", JSON.stringify(items));
    const lastCartItems = await cart.get(user.uid).then(data => data);

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: lastCartItems,
    });
  };
  const updateQty = (type: string, id: string) => {
    if (type == "add") {
      setQty(qty + 1);
      cartItems.map((item: any) => {
        if (item.id === id) {
          const lastQty = item.qty += 1;
          cart.update({
            ...item,
            qty: lastQty,
          }, user.uid, id);
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty == 1) {
        // items = cartItems.filter((item: any) => item.id !== id);
        cart.delete(user.uid, id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item: any) => {
          if (item.id === id) {
            const lastQty = item.qty -= 1;
            cart.update({
              ...item,
              qty: lastQty,
            }, user.uid, id);
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  React.useEffect(() => {
    items = cartItems;
    // setQty(cartItems?.filter((item: any) => item.id === id)[0]?.qty ? cartItems?.filter((item: any) => item.id === id)[0]?.qty : qtyCart);
  }, [qty, items, cartItems]);
  return (
    <div
      className='
      w-full p-1 px-2 bg-cartItem
      rounded-lg flex items-center gap-2'>
        <img 
          src={imageSrc}
          alt=""
          className='
          w-20 h-20 max-w-[60px]
          rounded-full object-contain' />
        <div
          className='flex flex-col gap-2'>
            <p
              className='text-base text-gray-50'>
                {name}
            </p>
            <p
            className='text-sm block text-gray-300 font-semibold'>
              <span>$</span>
              {" "}{(parseFloat(price as string) * qty).toFixed(2)}
            </p>
        </div>
        <div
          className='group flex items-center gap-2 ml-auto'>
            <motion.div 
              whileTap={{ scale: 0.75}}
              className="cursor-pointer"
              onClick={() => updateQty('add', id)}>
                <BiPlus
                  className='text-gray-50 text-lg' /> 
            </motion.div>

            <p
              className='
              w-5 h-5 rounded-sm bg-cartBg 
              text-gray-50 text-center justify-center'>
              {qty}
            </p>
            
            <motion.div 
              whileTap={{ scale: 0.75}}
              className="cursor-pointer"
              onClick={() => updateQty('remove', id)}>
                <BiMinus
                  className='text-gray-50 text-lg' /> 
            </motion.div>
        </div>
    </div>
  );
};

export default CartItem;