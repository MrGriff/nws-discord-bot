import { Client } from "discord.js";
import {Message} from "./messages/Message";

class BotManager {
    client:Client;
    message: any;
    constructor(){
        this.client = new Client();
    }

    init(){
        this.message = Message.messagesOf('fr');
        console.log(this.message.hello)
    }
}

export = BotManager;