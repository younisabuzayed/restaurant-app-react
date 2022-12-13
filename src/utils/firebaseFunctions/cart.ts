import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestoredb } from "../../firebase.config";

const cart= () => {};

cart.addToCart = async (data: any, userId: any, productId: any) =>
{
    await setDoc(
        doc(
            firestoredb,
            `users/${userId}/cart`,
            productId,
        ),
        data,
        {
          merge: true,
        }
    );
};

cart.get = async ( userId: any) =>
{
    const items = await getDocs(
        query(
            collection(firestoredb, `users/${userId}/cart`),
            orderBy('id', 'desc'),
        )
    );
    return items.docs.map((doc) => doc.data());
};
cart.update =async (data: any, userId: any, productId: any) => {
    // const getFilterProduct = await data?.filter((item: any) => item?.id === productId)[0];
    // console.log(';dssds',data);
    
    await setDoc(
        doc(
            firestoredb,
            `users/${userId}/cart/${productId}`,
        ),
        data,
        {
          merge: true,
        }
    );
};
cart.delete = async (userId: any, productId: any) => {
    deleteDoc(
        doc(
            firestoredb,
            `users/${userId}/cart/${productId}`,
        )
    );
};
cart.deleteAll =async (userId: any) => {
    const items = await getDocs(
        query(
            collection(firestoredb, `users/${userId}/cart`),
            orderBy('id', 'desc'),
        )
    );
    items.forEach((data) => {
        deleteDoc(
          doc(
              firestoredb,
              `users/${userId}/cart/${data.id}`,
          )
        );
    });
};
export default  cart;

