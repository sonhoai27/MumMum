import {AsyncStorage} from "react-native";

export const _storeData = async (key, data, cb) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
        cb({
            message: 200
        })
    } catch (error) {
        cb({
            message: 400
        })
    }
};

export const _retrieveData = async (key,cb) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            cb(JSON.parse(value))
        }else {
            cb({
                message: 400
            })
        }
    } catch (error) {
        cb({
            message: 400
        })
    }
};
export const _removeData = async (key,cb) => {
    try {
        const value = await AsyncStorage.removeItem(key);
        if (value !== null) {
            cb({
                message: 200
            })
        }else {
            cb({
                message: 400
            })
        }
    } catch (error) {
        cb({
            message: 400
        })
    }
};