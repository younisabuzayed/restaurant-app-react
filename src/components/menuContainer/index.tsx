import React from 'react';
import { IoFastFood } from 'react-icons/io5';
import { useStateValue } from '../../context/stateProvider';
import { categories } from '../../utils/data';
import RowContainer from '../RowContainer';
import CategoryItem from './categoryItem';
const MenuContainer = () => {
  const [filter, setFilter] = React.useState('chicken');
  const [{foodItems}, dispatch] = useStateValue() as any;
  const filterCategory = foodItems?.filter((n: { category: string }) => n.category === filter);
  return (
    <section
      className='w-full my-6'
      id={'menu'}>
        <div
          className='w-full flex flex-col items-center justify-center'>
            <p
              className='
              text-2xl font-semibold capitalize
              relative text-headingColor before:absolute
              before:w-24 before:h-1 before:bg-gradient-to-tr 
              from-orange-200 to-orange-600 before:rounded-lg
              before:-bottom-1 transition-all duration-100
              ease-in-out mr-auto'>
                Our Hot Dishes
            </p>
            <div
              className='
              w-full flex items-center
              justify-start lg:justify-center gap-8
              py-6 overflow-x-scroll scrollbar-none'>
                {categories 
                  ? categories.map((item) => (
                      <CategoryItem
                        key={item.id}
                        name={item.name}
                        isSelected={item.urlParamName === filter}
                        onSelect={() => setFilter(item.urlParamName)} />
                  )) 
                  : null
                }
            </div>
            <RowContainer
              flag={false}
              data={filterCategory} />
        </div>
    </section>
  );
};

export default React.memo(MenuContainer);