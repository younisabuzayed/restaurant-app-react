import React from 'react';

type BadgeProps =
{
  count: number
}
const Badge = ({ count }: BadgeProps) => {
  return (
    <div
      className=' bg-cartNumBg w-5 h-5 flex justify-center items-center rounded-full absolute -top-2 -right-2 '>
        <p
          className='text-xs text-white font-semibold'>{count}</p>
    </div>
  );
};

export default React.memo(Badge);