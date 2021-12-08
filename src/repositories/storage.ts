import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

    private readonly KEY = "SN_TOKEN";

    public async get() {
        const json = await AsyncStorage.getItem(this.KEY);
        return json ? JSON.parse(json) : null;
    }

    public async save(userInfo: any) {
        const json = JSON.stringify(userInfo);
        await AsyncStorage.setItem(this.KEY, json);
    }

}

export default new Storage();