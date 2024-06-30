import Timer from "../structures/Timer.js";
import { CronJob } from "cron";

export default class TestTimer extends Timer {
    async init() {
        // С помощью cron делаем так, чтобы какое-то действие выполнялось строго в определённое время.
        // Но, в теории, можно использовать в инициализации просто интервал
        new CronJob('0 40 9 * * 0-5', this.exec, null, true, 'Europe/Moscow'); 
    }

    async exec() {
        // Тут что мы будем делать
    }
}
