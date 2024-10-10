import dbService from "../utils/firebaseDB";

const table = 'passwords';


const passwordService = {
    list: async (userId) => {
        const docs = await dbService.query(table, [
            ['user_id', '==', userId]
        ]);

        return docs
    },
    save: async (userId, data) => {
        const saveData = {
            app_name: data.appName,
            password: data.password,
            user_id: data.userId
        }

        const savedApp = await dbService.query(table, [
            ['app_name', '==', saveData.app_name],
            ['user_id', '==', userId]
        ]);

        let savedPassword = {
            message: 'Password already exists',
            status: false
        };

        if (!savedApp.length > 0) {
            savedPassword = await dbService.add(table, saveData);
        }

        return savedPassword;
    },
    delete: async (id) => {
        return await dbService.delete("passwords", id);
    }
}

export default passwordService