/**
 * Created by guillaumelebedel on 18/12/15.
 */

export default class ConfigManager {
    static setConfig(item, itemContent, saveToState) {
        if (!item || !item.length || !itemContent)
            return;
        return localStorage.setItem(item, JSON.stringify(itemContent));
    }
    static getConfig(item) {
        if (!item || !item.length)
            return null;
        return JSON.parse(localStorage.getItem(item));
    }
}
