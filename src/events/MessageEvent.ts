import TelegramBot from "node-telegram-bot-api";
import Event from "../structures/Event.js";
import Cache from "../lib/Cache.js";
import Middleware from "../structures/Middleware.js";
import Command from "../structures/Command.js";

export default class MessageEvent extends Event {
    name = "message" as BotEvents;

    async exec(msg: TelegramBot.Message): Promise<void> {
        if (!msg.from || !msg.text || msg.chat.type == "channel") return;

        let user = await Cache.getUser(msg.from.id);

        if (!user.scene) user.setScene("main");

        let command = user.scene!.commands.find((c) => Command.commandName(c.name).includes(msg.text!) ) ?? user.scene!.commands.find(c => Command.commandName(c.name).length == 0);

        if (!command) {
            if (msg.chat.type == "private") {
                await Cache.bot.sendMessage(msg.chat.id, "Неизвестная команда");

                user.scene = Cache.scenes.find(x => x.name == "main");
            }
        } else {
            console.log(`[message] ${msg.from?.username ?? msg.from?.first_name ?? "Нет ника (?)"}, ${msg.from.id}: ${msg.text};` );

            // Проверяем, все ли middlewares "согласны"
            let condition = command.middlewares
                .filter(mw => mw.type == Middleware.types.Pre)
                .some(mw => ![0, undefined].includes(mw.exec(user, msg)!));

            if(condition) return;

            await command.exec(user, msg);

            // Выполняем, как я их называл postwares
            command.middlewares.filter(mw => mw.type == Middleware.types.Post).forEach(mw => mw.exec(user, msg));
        }
    }
}