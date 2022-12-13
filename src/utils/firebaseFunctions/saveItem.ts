import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { firestoredb } from "../../firebase.config";

export default async (data: any) =>
{
    await setDoc(
        doc(
            firestoredb,
            'foodItems',
            `${Date.now()}`,
        ),
        data,
        {
          merge: true,
        }
    );
};