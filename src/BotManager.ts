import { Client, Message } from "discord.js";
import {Messages} from "./messages/Messages";
import { Bot } from "./Bot";
import config from "../config.js";

export class BotManager {
    private client:Client;
    private bot: Bot;
    private message: any;
    
    /**
     * Bot Manager
     * 
     * @constructor
     */
    constructor(){
        this.client = new Client();
        this.bot = new Bot(this.client);
    }

    init(){
        this.message = Messages.messagesOf(config.general.local);
        this.client.on("ready", () => {this.start()}); // When logged, start scrapping
        this.client.on("message", (msg: Message) => {this.listening(msg)}); // Enable the listener
        if(this.bot !== undefined){
            this.bot.login(); // Logon the bot
        }
        console.log(this.message.hello)
    }

    start(){
        this.bot.start();
    }

    stop(){
        //TODO: A stop scrapping command
    }

    retry(){
        //TODO: A retry scrapping command
    }

    /**
     * listening all discord messages from the connected serveurs
     * @param {Message} msg Message from a channel
     * @returns 
     */
    listening(msg: Message){
        if(this.bot === undefined) return;
        let up = config.discord.commands.up;
        if (msg.content.startsWith(up)) { // If up command triggered
            let serverName = msg.content.slice(up.length).trim();
            if(serverName !== undefined && serverName !== ""){  // Check the server passed in params
                this.bot.reply(msg, serverName);
            } else { // No server name provided, config's server used
                this.bot.reply(msg, config.newworld.server);
            }
        }
    }
}