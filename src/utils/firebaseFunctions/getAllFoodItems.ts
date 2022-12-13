import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestoredb } from "../../firebase.config";

export default async () =>
{
    const items = await getDocs(
        query(
            collection(firestoredb, 'foodItems'),
            orderBy('id', 'desc'),
        )
    );
    return items.docs.map((doc) => doc.data());
};