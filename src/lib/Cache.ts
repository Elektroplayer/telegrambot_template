import TelegramBot from "node-telegram-bot-api";
import Scene from "../structures/Scene.js";
import User from "../structures/User.js";
import Query from "../structures/Query.js";

// Что-то, что нужно сохранить и иметь доступ откуда угодно
class Cache {
    bot: TelegramBot = new TelegramBot(process.env.TOKEN, { polling: true });
    
    users: User[] = [];
    scenes: Scene[] = [];
    queries: Query[] = [];

    async getUser(userId: number) {
        let user = this.users.find((u) => u.id == userId);

        if (user) return user;
        else {
            let newUser = new User(userId);

            await newUser.init();

            this.users.push(newUser);

            return newUser;
        }
    }
}

export default new Cache();
