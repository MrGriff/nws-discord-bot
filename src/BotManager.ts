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
        this.bot = new Bot(this.client);
    }

    init(){
        this.message = Messages.messagesOf('fr');
        this.client.on("ready", this.start);
        this.client.on("message", (msg: Message) => {this.listening(msg)});
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
        if(this.bot === undefined) return;
        let up = config.discord.commands.up;
        if (msg.content.startsWith(up)) {
            let serverName = msg.content.slice(up.length).trim();
            if(serverName !== undefined && serverName !== ""){
                this.bot.reply(msg, serverName);
            } else {
                this.bot.reply(msg, config.newworld.server);
            }
        }
    }
}