export const fetchUser = () =>
{
    const userInfo = localStorage.getItem('user') !== undefined
      ? JSON.parse(localStorage.getItem('user') as string)
      : localStorage.clear();

  return userInfo;
};
export const fetchCart= () =>
{
    const cartInfo = localStorage.getItem('cartItems') !== undefined
      ? JSON.parse(localStorage.getItem('cartItems') as string)
      : localStorage.clear();

  return cartInfo ? cartInfo : [];
};