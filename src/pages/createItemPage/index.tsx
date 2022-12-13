import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md';
import { categories } from '../../utils/data';
import { Loader } from '../../components';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.config';
import { getAllfoodItems, saveItem } from '../../utils/firebaseFunctions';
import { useStateValue } from '../../context/stateProvider';
import { actionType } from '../../context/reducer';
const CreateItem =() => {
  const [title, setTitle] = React.useState('');
  const [calories, setCalories] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState<string | undefined>(undefined);
  const [imageAesst, setImageAesst] = React.useState<any | null>(null);
  const [fields, setFields] = React.useState(false);
  const [alertStatus, setAlertStatus] = React.useState('danger');
  const [msg, setMsg] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [{ foodItems }, disptach] = useStateValue() as any;
  const fetchData = async () => {
    await getAllfoodItems()
    .then(data => {
      disptach({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  const clearData = () =>
  {
    setTitle('');
    setImageAesst(null);
    setCalories('');
    setCategory("other");
    setPrice('');
  };

  const onChangeUploadImage= (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const imageFile = e.target.files![0];
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`); 
    const uploadImage = uploadBytesResumable(storageRef, imageFile);
    uploadImage.on(
      'state_changed', 
      (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) =>
      {
        console.log(error);
        setFields(true);
        setMsg('Error while uploading: Try Again');
        setAlertStatus('danger');
        setTimeout(() =>
        {
          setFields(false);
          setIsLoading(false);
        },4000);
      },
      () =>
      {
        getDownloadURL(uploadImage.snapshot.ref)
        .then(downloadURL => 
        {
          setImageAesst(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg('Image uploaded successfully');
          setAlertStatus('success');
        setTimeout(() =>
        {
          setFields(false);
        },4000);
        });
      }
    );
    // setImageAesst()
  };
  const onClickDeleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAesst);
    deleteObject(deleteRef)
    .then(()=>{
      setImageAesst(null);
      setIsLoading(false);
      setFields(true);
      setMsg('Image deleted successfully');
      setAlertStatus('success');
      setTimeout(() =>
      {
        setFields(false);
      },4000);
    });
  };
  const onClickSave=()=>{
    try {
      if(!title || !imageAesst || !calories || !price || !categories)
      {
        setFields(true);
        setMsg('Required fields can\'t be empty');
        setAlertStatus('danger');
        setTimeout(() =>
        {
          setFields(false);
          setIsLoading(false);
        },4000);
      }
      else
      {
        const data = {
          id: `${Date.now()}`,
          title,
          imageUrl: imageAesst,
          category,
          calories,
          price,
          qty: 5,
        };
        saveItem(data)
        .then(() => {
          setIsLoading(false);
          setFields(true);
          setMsg('Data Item uploaded successfully');
          setAlertStatus('success');
          clearData();
          setTimeout(() =>
          {
            setFields(false);
          },4000);
        });
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading: Try Again');
      setAlertStatus('danger');
      setTimeout(() =>
      {
        setFields(false);
        setIsLoading(false);
      },4000);
    }
    fetchData();
  };
  return (
    <div
      className='
      w-full min-h-screen flex items-center
      justify-center '>
        <div
          className='
          border border-gray-200 w-[90%]
          md:w-[75%] p-4 rounded-lg gap-4
          flex flex-col items-center justify-center'>
            {
              fields && (
                <motion.p
                  initial={{opacity: 0}}
                  animate={{ opacity: 1}}
                  exit={{opacity: 0}}
                  className={`
                  w-full p-2 rounded-lg text-center
                  text-lg font-semibold
                  ${
                    alertStatus === 'danger' 
                     ? 'bg-red-200 text-red-800'
                     : 'bg-emerald-200 text-emerald-800'
                  }`}>
                  {msg}
                </motion.p>
              )
            }
            <div
              className='
              w-full py-2 border-b
              border-gray-300 flex items-center
              gap-2'>
                <MdFastfood
                  className='text-xl text-gray-500' />
                <input
                  placeholder='Enter Title'
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="
                  w-full h-full text-lg 
                  bg-transparent placeholder:text-gray-400 outline-none
                  border-none text-textColor" />
            </div>
            <div
              className='w-full'>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="
                  w-full outline-none text-base
                  border-b-2 p-2 rounded-md cursor-pointer">
                    <option
                      value="other"
                      className='bg-white'>Select Category</option>
                    {categories.length !== 0 
                      ? categories.map((item) => (
                          <option
                            key={item.id}
                            value={item.urlParamName}
                            className="
                            text-base border-0 outline-none 
                            capitalize bg-white text-headingColor">{item.name}</option>
                        ))
                      : null
                    }
                </select>
            </div>
            <div
              className='
              w-full h-225 md:h-420 border-2 
              border-dotted border-gray-300 group
              flex justify-center items-center 
              cursor-pointer rounded-lg'>
                {
                  isLoading
                    ? <Loader />
                    : <>
                        {!imageAesst 
                          ? <>
                              <label
                                className='
                                w-full h-full flex
                                flex-col items-center justify-center cursor-pointer'>
                                  <div
                                    className='w-full h-full flex
                                    flex-col items-center justify-center '>
                                      <MdCloudUpload
                                        className='text-gray-500 text-3xl hover:text-gray-700' />
                                      <p
                                       className='text-gray-500 hover:text-gray-700'> Click here to upload</p>
                                  </div>
                                  <input
                                    type="file"
                                    accept='image/*'
                                    name='uploadimage'
                                    onChange={onChangeUploadImage}
                                    className="w-0 h-0" />
                              </label>
                            </> 
                          : <>
                              <div
                                className='relative h-full'>
                                  <img
                                    src={imageAesst}
                                    alt="upload-image"
                                    className='w-full h-full object-cover' />
                                  <button
                                    type='button'
                                    className='
                                    bg-red-500 absolute bottom-3
                                    right-3 text-xl p-3
                                    rounded-full cursor-pointer outline-none
                                    hover:shadow-md duration-300 transition-all
                                    ease-in-out'
                                    onClick={onClickDeleteImage}>
                                      <MdDelete
                                        className='text-white' />
                                  </button>
                              </div>
                            </>
                        }
                      </>
                }
            </div>
            <div
              className='
              w-full flex flex-col
              md:flex-row items-center gap-3'>
                <div
                  className='
                  w-full py-3 flex
                  border-b border-gray-300 items-center
                  gap-2'>
                    <MdFoodBank
                      className='text-gray-200 text-2xl' />
                    <input
                      type="text"
                      placeholder="Calories"
                      required
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="
                      w-full h-full text-lg
                      bg-transparent outline-none border-none
                      placeholder:text-gray-400 text-textColor" />
                </div>
                <div
                  className='
                  w-full py-3 flex
                  border-b border-gray-300 items-center
                  gap-2'>
                    <MdAttachMoney
                      className='text-gray-200 text-2xl' />
                    <input
                      type="text"
                      placeholder="Price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="
                      w-full h-full text-lg
                      bg-transparent outline-none border-none
                      placeholder:text-gray-400 text-textColor" />
                </div>
            </div>
            <div
              className='flex items-center w-full'>
                <button
                  type='button'
                  className='
                  ml-0 md:ml-auto w-full 
                  md:w-auto bg-emerald-500 px-12 py-2
                  rounded-lg border-none outline-none
                  text-lg text-white font-semibold'
                  onClick={onClickSave}>Save</button>
            </div>
        </div>
    </div>
  );
};

export default CreateItem;