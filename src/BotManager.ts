import { Client } from "discord.js";
import {Message} from "./messages/Message";
import Bot from "./Bot";
import config from "../config.js";

class BotManager {
    client:Client;
    bot: Bot;
    message: any;
    constructor(){
        this.client = new Client();
        this.bot = new Bot(this.client, config);
    }

    init(){
        this.message = Message.messagesOf('fr');
        this.client.on("ready", this.start);
        this.client.on("message", this.listening);
        console.log(this.message.hello)
    }

    start(){
        this.bot.login();
    }

    stop(){
        
    }

    retry(){

    }

    listening(){

    }
}

export = BotManager;