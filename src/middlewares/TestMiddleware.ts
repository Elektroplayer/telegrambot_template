import { Message } from "node-telegram-bot-api";
import Middleware from "../structures/Middleware.js";
import User from "../structures/User.js";

class TestMiddleware extends Middleware {
    type = Middleware.types.Pre;

    exec(user: User, msg: Message): number | void {
        let condition = true;

        console.log(user, msg);

        if(condition) return 0;
        else return 1; // Можно вернуть 1, если нужно прервать какое-то действие (только если тип Pre)
    }
}

export default new TestMiddleware();