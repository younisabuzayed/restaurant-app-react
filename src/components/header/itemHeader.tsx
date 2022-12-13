import React from 'react';
type ItemHeaderProps = {
  title: string,
  style?: string,
}
const ItemHeader = ({title, style}: ItemHeaderProps) => {
  return (
    <li 
      className={'text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out '+ style}>
        {title}
    </li>
  );
};

export default React.memo(ItemHeader);