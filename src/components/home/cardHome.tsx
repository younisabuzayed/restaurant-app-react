import React from 'react';
type cardHomePageProps = {
  name?: string,
  img?: string,
  description?: string,
  price?: string | number,
}
const CardHome = ({name, img, description, price }: cardHomePageProps) => {
  return (
    <div
      className='
      lg:w-190 p-4 bg-cardOverlay 
      backdrop-blur-md rounded-2xl flex
      flex-col items-center justify-center
      drop-shadow-lg'>
        <img 
          src={img}
          className="w-20 lg:w-40 -mt-10 lg:-mt-20" 
          alt="i1" />
        <p
          className='text-base lg:text-lg font-semibold text-textColor mt-1 lg:mt-2'>{name}</p>
        <p
          className='text-[10px] lg:text-sm text-lighttextGray font-semibold m-0 lg:my-1'>{description}</p>
        <p
          className='text-[10px] lg:text-sm font-semibold text-textColor' >
            <span
              className='text-[8px] text-red-500'>$</span>{" "}
            {price}
        </p>
    </div>
  );
};

export default React.memo(CardHome);