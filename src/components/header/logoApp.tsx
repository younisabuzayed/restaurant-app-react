import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets/img';

const LogoApp = () => {
  return (
    <Link
      to="/"
      className='flex items-center gap-2'>
        <img
          src={Logo}
          className="w-7 md:w-10  object-cover"
          alt='logo' />
        <span
          className='text-headingColor md:text-xl text-lg font-bold'>Restaurant</span>
    </Link>
  );
};

export default React.memo(LogoApp);