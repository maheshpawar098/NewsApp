import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: any) => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  } catch (error) {
  }
};

const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key, () => {});
    return null;
  } catch (error) {
  }
};

const keys = {
  FAVORITES: 'FAVORITES',
  SCORE: 'SCORE',
  LAST_READ_NEWS_TIME: "LAST_READ_NEWS_TIME",
  STORIES: 'STORIES',
};

const localStorage = {
  setItem,
  getItem,
  removeItem,
  keys,
};

export default localStorage;
