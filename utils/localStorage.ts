import AsyncStorage from "@react-native-async-storage/async-storage";

export default class {
  static AUTH_USER = "AUTH_USER";
  static AUTH_TOKEN = "AUTH_TOKEN";

  static ACTIVE_TRAVEL = "ACTIVE_TRAVEL";

  /**
   * Sets or removes an item in local storage
   * @param key
   * @param value
   */
  static async setItem(
    key: string,
    value: string | object | null = null
  ): Promise<void> {
    try {
      if (value) {
        if (typeof value === "object") {
          value = JSON.stringify(value);
        }
        await AsyncStorage.setItem(key, value);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Fetches `key` value from local storage
   * @param key
   * @returns
   */
  static async getItem(key: string): Promise<object | string | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value?.indexOf("{") === 0) {
        return JSON.parse(value) as object;
      }

      return value;
    } catch (_) {}

    return null;
  }
}
