import { Message } from "node-telegram-bot-api";
import Command from "../structures/Command.js";
import User from "../structures/User.js";
import Cache from "../lib/Cache.js";

export default class TestCommand extends Command {
    name = { command: "test" }; // Ещё есть buttons для кнопок
    sceneName = []; 

    async exec(user: User, msg: Message): Promise<void> {
        user.setScene("main");

        Cache.bot.sendMessage(msg.chat.id, `Тестовый текст`, {
            disable_web_page_preview: true,
            parse_mode: "HTML"
        });
    }
}