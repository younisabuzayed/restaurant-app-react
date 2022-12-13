/* eslint-disable no-empty-pattern */
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Header } from './components';
import { actionType } from './context/reducer';
import { useStateValue } from './context/stateProvider';
import Routers from './routers';
import { cart, getAllfoodItems } from './utils/firebaseFunctions';
function App() {
  const [{user }, disptach] = useStateValue() as any;
  const fetchData = async () => {
    await getAllfoodItems()
    .then(data => {
      disptach({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
    await cart.get(user.uid)
    .then(data => {
      disptach({
        type: actionType.SET_CART_ITEMS,
        cartItems: data,
      });
    });
  };
  React.useEffect(() =>{
    fetchData();
  },[]);
  return (
    <AnimatePresence mode='wait'>
        <div 
          className="w-screen h-auto flex flex-col bg-primary">
            <Header />
            <main
              className='mt-14 md:mt-24 py-4 md:px-16 px-4 w-full'>
                <Routers />
            </main>
        </div>
    </AnimatePresence>
  );
}

export default App;