import { CallbackQuery } from "node-telegram-bot-api";
import Query from "../structures/Query.js";
import User from "../structures/User.js";

export default class TestQuery extends Query {
    name = ["name"];

    async exec(user: User, query: CallbackQuery): Promise<void> {
        if(!query?.message?.text) return; // не знаю как, но на всякий случай

        // Какой-то полезный код
    }
}