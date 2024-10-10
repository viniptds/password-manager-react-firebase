import { collection, doc, setDoc, getDoc, deleteDoc, addDoc, query, getDocs, where } from "firebase/firestore";
import { db } from "./firebase";

function returnDataListWithId(list) {
    const returnList = [];
    list.forEach((item) => {
        const itemData = item.data();
        itemData.id = item.id;
        returnList.push(itemData);
    })
    return returnList
}

const dbService = {
    add: async (col, data) => {
        const ref = collection(db, col);
        return await addDoc(ref, data);
    },

    set: async (col, id, data) => {
        const ref = doc(db, col, id);
        return await setDoc(ref, data);
    },

    get: async (col, id) => {
        const ref = doc(db, col, id);
        return await getDoc(ref);
    },

    list: async (col) => {
        const ref = collection(db, col);
        const docs = await getDocs(query(ref));

        return returnDataListWithId(docs);
    },

    delete: async (col, id) => {
        const ref = doc(db, col, id);
        return await deleteDoc(ref);
    },

    exists: async (col, id) => {
        const ref = doc(db, col, id);
        const document = await getDoc(ref);
        return document.exists();
    },

    searchBy: async (col, field, operator, value) => {
        const ref = collection(db, col);
        const q = query(ref, where(field, operator, value));
        const documents = await getDocs(q);

        return returnDataListWithId(documents);
    },

    query: async (col, conditions) => {
        const ref = collection(db, col);

        const queryConstraints = [];
        conditions.forEach(item => {
            queryConstraints.push(where(item[0], item[1], item[2]));
        })

        const q = query(ref, ...queryConstraints);

        const documents = await getDocs(q);

        return returnDataListWithId(documents);
    },
}

export default dbService;