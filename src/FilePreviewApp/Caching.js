
class SimpleCache{
    stores = new Map();

    getStore(name){
        if (!name)
            return undefined;
        return this.stores.get(name);
    }
    createStore(name, weak=false){
        if (!name)
            return undefined;
        if (this.stores.has(name))
            return this.stores.get(name);
        this.stores.set(name, weak ? new WeakMap() : new Map());
        return this.stores.get(name);
    }
    removeStore(name){
        if (!name)
            return undefined;
        return (this.stores.delete(name));
    }
}
export default new SimpleCache();