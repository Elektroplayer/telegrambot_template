import mongoose from 'mongoose';
import Main from './structures/Main.js';

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI); // Подключаем MongoDB

let main = new Main(); // Создание класса и запуск начальных процессов
main.run();