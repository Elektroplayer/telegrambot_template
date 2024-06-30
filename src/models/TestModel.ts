import mongoose from "mongoose";

interface ITestInterface {
    enabled: boolean,
    text: string,
    inline_keyboard?: {text: string, url?: string}[][]
}

const schema = new mongoose.Schema<ITestInterface>({
    enabled: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        required: true
    },
    inline_keyboard: {
        type: [[{text: String, url: String}]]
    }
}, { collection: "test" });

export default mongoose.model("test", schema);