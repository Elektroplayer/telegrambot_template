import { readdirSync } from "fs";
import Event from "./Event.js";
import Scene from "./Scene.js";
import Cache from "../lib/Cache.js";
import Query from "./Query.js";

export default class Main {
    scenesNames = ["main"];

    run() {
        this.initEvents();
        this.initQueries();
        this.initScenes();
    }

    async initQueries() {
        for (let dirent of readdirSync("./dist/queries/", {withFileTypes: true})) {
            if (!dirent.name.endsWith("")) continue;
        
            let queryClass = (await import("../queries/" + dirent.name)).default;
            let query:Query = new queryClass();

            Cache.queries.push(query);
        }
    }

    async initEvents() {
        for (let dirent of readdirSync("./dist/events", {withFileTypes: true})) {
            if (!dirent.name.endsWith(".js")) continue;

            console.log(`[loader] [+] Ивент ${dirent.name}`);
        
            let eventClass = (await import("../events/" + dirent.name)).default;
            let event:Event = new eventClass();

            Cache.bot.on(event.name, event.exec);
        }
    }

    async initScenes() {
        this.scenesNames.forEach(sceneName => {
            console.log(`[loader] [+] Сцена ${sceneName}`);

            Cache.scenes.push(new Scene(sceneName));
        });
    }
}