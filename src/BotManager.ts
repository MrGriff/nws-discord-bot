import { Client, Message } from "discord.js";
import {Messages} from "./messages/Messages";
import { Bot } from "./Bot";
import config from "../config.js";

export class BotManager {
    private client:Client;
    private bot: Bot;
    private message: any;
    constructor(){
        this.client = new Client();
        this.bot = new Bot(this.client, config);
    }

    init(){
        this.message = Messages.messagesOf('fr');
        this.client.on("ready", this.start);
        this.client.on("message", this.listening);
        console.log(this.message.hello)
        this.start();
    }

    start(){
        if(this.bot !== undefined){
            this.bot.login();
            this.bot.start();
        }
    }

    stop(){
        
    }

    retry(){

    }

    listening(msg: Message){
        if (msg.content === "!up") {
            msg.reply("Peut-être peut-être pas, qui sait ? La relativité de l'univers et un tout que personne ne peut quantifier ou même imaginer. Je te laisse t'abandonner à toi et ton sub subconscient.");
        }
    }
}