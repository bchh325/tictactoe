import React from "react";
import { getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export const useFetchData = (docRef) => {
  const [documents, setDocuments] = React.useState();

  const getData = async () => {
    try {
      const docSnap = await getDoc(docRef);
      setDocuments(docSnap)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getData()
  }, []);
  return documents;
};