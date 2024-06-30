import TelegramBot from "node-telegram-bot-api";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Переменные окружения
            MONGO_URI: string;
            TOKEN: string;
        }
    }

    interface CommandName {
        buttons?: Array< { title: string, emoji?: string } | string> | { title: string, emoji?: string } | string,
        command?: string
    }

    // Костыль, но работает. Позже придумаю что лучше
    type BotEvents = TelegramBot.MessageType | 'message'
}

export {};