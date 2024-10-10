import { collection, doc, setDoc, getDoc, deleteDoc, addDoc, query, getDocs, where } from "firebase/firestore";
import { db } from "./firebase";

function returnDataListWithId(list) {
    let returnList = [];
    list.forEach((item) => {
        let itemData = item.data();
        itemData.id = item.id;
        returnList.push(itemData);
    })
    return returnList
}

const dbService = {
    add: async (col, data) => {
        let ref = collection(db, col);
        return await addDoc(ref, data);
    },

    set: async (col, id, data) => {
        let ref = doc(db, col, id);
        return await setDoc(ref, data);
    },

    get: async (col, id) => {
        let ref = doc(db, col, id);
        return await getDoc(ref);
    },

    list: async (col) => {
        let ref = collection(db, col);
        let docs = await getDocs(query(ref));

        return returnDataListWithId(docs);
    },

    delete: async (col, id) => {
        let ref = doc(db, col, id);
        return await deleteDoc(ref);
    },

    exists: async (col, id) => {
        let ref = doc(db, col, id);
        let document = await getDoc(ref);
        return document.exists();
    },

    searchBy: async (col, field, operator, value) => {
        let ref = collection(db, col);
        let q = query(ref, where(field, operator, value));
        let documents = await getDocs(q);

        return returnDataListWithId(documents);
    },

    query: async (col, conditions) => {
        let ref = collection(db, col);

        let queryConstraints = [];
        conditions.forEach(item => {
            queryConstraints.push(where(item[0], item[1], item[2]));
        })

        let q = query(ref, ...queryConstraints);

        let documents = await getDocs(q);

        return returnDataListWithId(documents);
    },
}

export default dbService;