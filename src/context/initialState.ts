import { fetchCart, fetchUser } from "../utils/fetchLocalSorageData";

const userInfo = fetchUser();
// const cartInfo = fetchCart();
export const initialState = {
    user: userInfo ? userInfo : null,
    foodItems: null,
    cartShow: false,
    cartItems: null,
};