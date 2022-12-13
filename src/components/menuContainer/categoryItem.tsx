import React from 'react';
import { IoFastFood } from 'react-icons/io5';
import { motion } from 'framer-motion';
type CategoryItemProps = {
  name?: string,
  isSelected?: boolean, 
  onSelect?: React.MouseEventHandler<HTMLDivElement> | undefined,
};
const CategoryItem = ({name, isSelected, onSelect }: CategoryItemProps ) => {
  
  return (
    <motion.div
      whileTap={{ scale: 0.75 }}
      onClick={onSelect}
      className={`
      group ${isSelected ? "bg-cartNumBg" : 'bg-white'} min-w-[94px] h-28
      cursor-pointer rounded-lg drop-shadow-sm hover:drop-shadow-xl
      flex flex-col gap-3 justify-center items-center
      duration-100 ease-in-out transition-all hover:bg-cartNumBg`}>
      <div
        className={`
          w-10 h-10  ${isSelected ? 'bg-white' : "bg-cartNumBg"} 
          rounded-full group-hover:bg-white flex items-center 
          justify-center shadow-lg`}>
            <IoFastFood
              className={`${isSelected ? 'text-textColor' : 'text-white'} group-hover:text-textColor text-lg`} />
      </div>
      <p
        className={`text-sm ${isSelected ?  "text-white" :'text-textColor'} group-hover:text-white`}>
          {name}
      </p>
  </motion.div>
  );
};

export default CategoryItem;