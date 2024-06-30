import { readdirSync } from "fs";
import Command from "./Command.js";

export default class Scene {
    commands: Command[] = [];

    constructor(public name: string) {
        this.importCommands();
    }

    async importCommands() {
        for (let dirent of readdirSync("./dist/commands/", {withFileTypes: true})) {
            if (!dirent.name.endsWith("")) continue;
        
            let commandClass = (await import("../commands/" + dirent.name)).default;
            let command:Command = new commandClass();

            if(command.sceneName.length == 0 || command.sceneName.includes(this.name)) this.commands.push(command);
        }
    }
}