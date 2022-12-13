import { motion } from 'framer-motion';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { CartContainer, MenuContainer, RowContainer } from '../../components';
import Home from '../../components/home';
import { useStateValue } from '../../context/stateProvider';
export const Main = () => {
  const [{foodItems, cartShow}, disptach] = useStateValue() as any;
  const foodItemsFruits = foodItems?.filter((item: any) => item.category == 'fruits');
  const rowContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (srcollOffset: number) =>
  {
    rowContainerRef.current!.scrollLeft += srcollOffset;
  };
  React.useEffect(() => {},[cartShow]);
  return (
    <div
      className='flex flex-col w-full h-auto items-center justify-center'>
        <Home />
        <section
          className='w-full my-6'>
            <div
              className='
              w-full flex items-center
              justify-between my-6 '>
                <p
                  className='
                  text-2xl font-semibold capitalize
                  relative text-headingColor before:absolute
                  before:w-32 before:h-1 before:bg-gradient-to-tr 
                  from-orange-200 to-orange-600 before:rounded-lg
                  before:-bottom-1 transition-all duration-100
                  ease-in-out'>
                    Our fresh & healthy fruits
                </p>
                <div
                  className='
                  hidden md:flex gap-3 
                  items-center'>
                    <motion.div
                      whileTap={{scale: 0.75}}
                      className='
                      w-8 h-8 cursor-pointer rounded-lg
                      bg-orange-300 hover:bg-orange-500 hover:shadow-lg
                      transition-all duration-100 ease-in-out
                      flex items-center justify-center'
                      onClick={() => scroll(-200)}>
                        <MdChevronLeft
                          className='text-lg text-white' />
                    </motion.div>
                    <motion.div
                      whileTap={{scale: 0.75}}
                      className='
                      w-8 h-8 cursor-pointer rounded-lg
                      bg-orange-300 hover:bg-orange-500 hover:shadow-lg
                      transition-all duration-100 ease-in-out
                      flex items-center justify-center'
                      onClick={() => scroll(200)}>
                        <MdChevronRight
                          className='text-lg text-white' />
                    </motion.div>
                </div>
            </div>
            <RowContainer
              refContainer={rowContainerRef}
              flag={true}
              data={foodItemsFruits} />
        </section>
        <MenuContainer />
        {cartShow ? <CartContainer /> : null}
    </div>
  );
};
