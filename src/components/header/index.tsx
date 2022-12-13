import React from 'react';
import Badge from './badgeCart';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { MdAdd, MdLogout, MdShoppingBasket } from 'react-icons/md';

import ItemHeader from './itemHeader';

import { app } from '../../firebase.config';
import { useStateValue } from '../../context/stateProvider';
import { actionType } from '../../context/reducer';

import LogoApp from './logoApp';
import { Avatar } from '../../assets/img';

const CartNav = ({ onClickCart, cartItems= [] }: {
  onClickCart?: React.MouseEventHandler<HTMLDivElement> | undefined,
  cartItems: [],
}) =>
{
  return (
    <div
      className='relative flex justify-center items-center px-1 cursor-pointer '
      onClick={onClickCart}>
        <MdShoppingBasket 
          className='text-textColor text-2xl hover:text-headingColor' />
        {cartItems && cartItems.length > 0 
          ?<Badge
            count={cartItems.length} /> 
          : null}
    </div>
  );
};

export const Header = () => {
  const [isMenu, setIsMenu] = React.useState<boolean>(false);
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue() as any;

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();


  const onClickLoginAndDropDown = async () =>
  {
    if(!user)
    {
      const {user: { refreshToken, providerData }} = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      // console.log(response.user);
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    }
    else
    {
      setIsMenu(!isMenu);
    }
    
  };
  const logout = () =>
  {
    setIsMenu(false);
    localStorage.removeItem('user');
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const onClickShowCart= () =>
  {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <header
      className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-10 bg-primary'>
        {/* desktop & tablet */}
        <div
          className='hidden md:flex w-full h-full justify-between'>
            <LogoApp />
            <div
              className='flex items-center gap-8'>
                <motion.ul
                  initial={{opacity: 0, x: 200}}
                  animate={{opacity: 1, x: 0}}
                  exit={{opacity: 0, x: 200}}
                  className='flex items-center gap-8'>
                    <ItemHeader title='Home' />
                    <ItemHeader title='Menu' />
                    <ItemHeader title='About Us' />
                    <ItemHeader title='Service' />
                </motion.ul>
                <CartNav
                  onClickCart={onClickShowCart}
                  cartItems={cartItems} />
                <div
                  className='relative'>
                    <motion.img
                      whileTap={{ scale: 0.6}}
                      alt='user-profile'
                      src={user ? user.photoURL : Avatar}
                      referrerPolicy='no-referrer'
                      onClick={onClickLoginAndDropDown}
                      className="w-10 min-w-[40px] h-10 min-h-[40px] shadow-xl rounded-full cursor-pointer" />
                    { isMenu 
                        ? <motion.div
                            className='absolute flex flex-col w-40 bg-gray-50 shadow-xl rounded-lg right-0 top-12'
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }} >
                              {user && user.email === 'youniszayed1998@gmail.com' 
                                ? <Link
                                    to={'/create-item'}>
                                      <p 
                                        className='
                                          px-4 flex py-2 
                                          items-center gap-3
                                          cursor-pointer hover:bg-slate-100 transition-all 
                                          duration-100 ease-in-out text-textColor text-base'
                                          onClick={() => setIsMenu(false)} >
                                          New Item <MdAdd />
                                        </p>
                                  </Link>
                                : null
                              }
                              <p 
                                className='
                                  px-4 flex py-2 
                                  items-center gap-3 
                                  cursor-pointer hover:bg-slate-100 transition-all 
                                  duration-100 ease-in-out text-textColor text-base'
                                  onClick={logout}>
                                  Logout <MdLogout />
                              </p>
                          </motion.div>
                        : null
                    }
                </div>
            </div>
        </div>
        {/* Mobile */}
        <div
          className='flex items-center justify-between md:hidden w-full h-full'>
            <CartNav
              onClickCart={onClickShowCart}
              cartItems={cartItems} />
            <LogoApp />
            <div
              className='relative'>
                <motion.img
                  whileTap={{ scale: 0.6}}
                  alt='user-profile'
                  src={user ? user.photoURL : Avatar}
                  referrerPolicy='no-referrer'
                  onClick={onClickLoginAndDropDown}
                  className="w-10 min-w-[40px] h-10 min-h-[40px] shadow-xl rounded-full cursor-pointer" />
                { isMenu 
                    ? <motion.div
                        className='absolute flex flex-col w-40 bg-gray-50 shadow-xl rounded-lg right-0 top-12'
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }} >
                          {user && user.email === 'youniszayed1998@gmail.com' 
                            ? <Link
                                to={'/create-item'}>
                                  <p 
                                    className='
                                      px-4 flex py-2 
                                      items-center gap-3
                                      cursor-pointer hover:bg-slate-100 transition-all 
                                      duration-100 ease-in-out text-textColor text-base'>
                                      New Item <MdAdd />
                                    </p>
                              </Link>
                            : null
                          }
                          <ul
                            className='flex flex-col '>
                              <ItemHeader 
                                title='Home' 
                                style='px-4 py-2 hover:bg-slate-100'/>
                              <ItemHeader 
                                title='Menu' 
                                style='px-4 py-2 hover:bg-slate-100' />
                              <ItemHeader 
                                title='About Us' 
                                style='px-4 py-2 hover:bg-slate-100'/>
                              <ItemHeader 
                                title='Service' 
                                style='px-4 py-2 hover:bg-slate-100'/>
                          </ul>
                          <p 
                            className='
                              px-4 flex py-2 
                              items-center gap-3 
                              cursor-pointer hover:bg-slate-100 transition-all 
                              duration-100 ease-in-out text-textColor text-base'
                            onClick={logout}>
                              Logout <MdLogout />
                          </p>
                      </motion.div>
                    : null
                }
            </div>
        </div>
    </header>
  );
};
