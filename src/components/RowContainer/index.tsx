import { motion } from 'framer-motion';
import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { NotFound } from '../../assets/img';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/stateProvider';
import { cart } from '../../utils/firebaseFunctions';

type RowContainerProps = {
    flag?: boolean,
    data: Array<any>,
    refContainer?: React.LegacyRef<HTMLDivElement> | undefined
};
const RowContainer = ({flag, data, refContainer }: RowContainerProps) => {
  const [{ user, cartItems }, dispatch] = useStateValue() as any;
  const addToCart =async (items: any) => {
    const findedProduct = await cartItems?.map((item: any) => item.id === items.id
    ? {
      ...item,
      qty: item.qty + 1,
    }
    : null
    )[0];

    findedProduct
      ? cart.update(findedProduct, user.uid, items.id)
      : cart.addToCart(items, user.uid, items.id);
    
    const lastCartItems = await cart.get(user.uid).then(data => data);

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: lastCartItems,
    });
    // localStorage.setItem('cartItems', JSON.stringify(lastCartItems));
  };
  return (
    <div
      ref={refContainer}
      className={`
      w-full my-12 flex gap-x-4 items-center
      ${flag 
        ? "overflow-x-scroll scrollbar-none" 
        : "overflow-x-hidden flex-wrap justify-center"}
      drop-shadow-sm scroll-smooth `}>
        {data?.length !== 0
          ? data?.map((item) => (
            <div
              key={item.id}
              className='
              w-full min-w-[300px] md:min-w-[340px] md:w-340 h-[225px] my-12
              bg-cardOverlay backdrop-blur-lg
              rounded-lg p-2 hover:drop-shadow-lg
              flex flex-col items-center justify-between'>
                <div
                  className='
                  w-full flex justify-between
                  items-center '>
                    <motion.div
                      className=' w-40 h-40 -mt-8'
                      whileHover={{
                        scale: 1.2,
                      }}>
                        <img 
                          className='w-full h-full object-contain'
                          src={item?.imageUrl} 
                          alt={item.name} />

                    </motion.div>
                    <motion.div
                      whileTap={{
                        scale: 0.75,
                      }}
                      className='
                      w-8 h-8 rounded-full cursor-pointer
                      bg-red-700 flex justify-center 
                      items-center hover:shadow-md'
                      onClick={() => addToCart(item)}>
                        <MdShoppingBasket
                          className='text-white' />
                    </motion.div>
                </div>
                <div
                  className='
                  w-full flex items-end 
                  justify-end flex-col gap-1 '>
                    <p
                      className='text-textColor text-base font-semibold md:text-lg'>{item?.title}</p>
                    <p
                      className=' text-sm text-gray-500'>{item?.calories} calories</p>
                    <div
                      className='flex items-center gap-8'>
                        <p
                          className='text-lg text-headingColor font-semibold'>
                            <span
                              className='text-sm text-red-500'>$</span>{" "}
                            {item?.price}
                        </p>
                </div>
              </div>
          </div>
          )) 
          : <div
              className='w-full h-full flex flex-col items-center justify-center gap-2'> 
                <img
                  src={NotFound}
                  className=" h-60" />
                <p
                  className='text-xl font-semibold'>Products Not Available</p>
            </div>
        }
    </div>
  );
};

export default React.memo(RowContainer);