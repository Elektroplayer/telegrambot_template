import Scene from "./Scene.js";
import Cache from "../lib/Cache.js";

export default class User {
    scene?: Scene;

    constructor(public id:number) {}
    
    async init() {
        // Если нужно что-то инициализировать асинхронно
    }

    setScene(sceneName: string) {
        this.scene = Cache.scenes.find(x => x.name == sceneName);
    }
}