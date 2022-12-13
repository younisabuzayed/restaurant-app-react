import React from 'react';
import { Delivery, HeroBg } from '../../assets/img';
import { heroData } from '../../utils/data';
import CardHome from './cardHome';
const Home = () => {
  return (
    <section
      id='home'
      className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
        <div
          className='
            py-2 flex flex-1 
            flex-col items-start gap-6' >

            <div
              className='
                flex items-center gap-2
                justify-center bg-orange-100 px-3
                py-1 rounded-full'>
                <p
                  className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
                <div
                  className='w-10 h-10 bg-white rounded-full overflow-hidden drop-shadow-lg'>
                    <img
                      src={Delivery} 
                      className="w-full h-full object-contain"
                      alt='bike-delivery' />
                </div>
            </div>

            <p
              className='
              text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide
              text-headingColor'>
                The Fastest Delivery in 
                <span
                  className='text-orange-600 text-[3rem] lg:text-[5rem]' > Your City</span>
            </p>

            <p
              className='text-base text-textColor text-center md:w-[80%] md:text-left'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa neque corporis a aspernatur totam amet laboriosam quos, nihil fugiat animi expedita sapiente vitae doloremque est molestiae? Quos alias odit veniam.
            </p>
            
            <button 
              type='button'
              className='
              bg-gradient-to-br from-orange-400 to-orange-600 
              w-full px-4 py-2 
              rounded-lg hover:shadow-lg transition-all
              ease-in-out text-white font-semibold
              md:w-auto'> Order Now</button>
        </div>
        <div
          className='flex py-2 flex-1 items-center relative' >
            <img 
              src={HeroBg} 
              className="ml-auto h-420 w-full lg:w-auto lg:h-650 " 
              alt="hero" />
            <div
              className='
              w-full h-full absolute
              flex items-center justify-center
              left-0 top-0 gap-4
              flex-wrap lg:px-32'>
                {heroData && heroData.map(item => (
                  <CardHome
                    key={item.id}
                    name={item.name}
                    img={item.imageSrc}
                    description={item.decp}
                    price={item.price} />
                ))}
                {/* <div
                  className='
                  w-190 p-4 bg-cardOverlay 
                  backdrop-blur-md rounded-2xl flex
                  flex-col items-center justify-center'>
                    <img 
                      src={I1}
                      className="w-40 -mt-20" 
                      alt="i1" />
                    <p
                      className='text-lg font-semibold text-textColor mt-2'>Icecream</p>
                    <p
                      className='text-sm text-lighttextGray font-semibold my-1'>Chocolte & vanilla</p>
                    <p
                      className='text-sm font-semibold text-textColor' >
                        <span
                          className='text-xs text-red-500'>$</span>{" "}
                        5.50
                    </p>
                </div> */}
            </div>
        </div>
    </section>
  );
};

export default Home;
