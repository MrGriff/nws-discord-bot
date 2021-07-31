import { Client, TextChannel, Message } from "discord.js";
import {Messages} from "./messages/Messages";
import got from "got";
import {JSDOM} from "jsdom";
import { Server } from "./Server";
import config from "../config.js";

/**
 * Scrapping the status New World page and save the status of each servers
 * Bot
 */
export class Bot {
    client: Client;
    channel: TextChannel;
    message: any;
    running: boolean;
    lastUp: boolean;
    servers: Server[];
    serverClass: string;
    serverClassName: string;
    serverClassDown: string;

    constructor(client: Client){
        this.client = client;
        this.channel = client.channels.cache.find((channel:TextChannel) => channel.name === config.discord.channelName) as TextChannel; ;
        this.message = Messages.messagesOf(config.general.local);
        this.running = false;
        this.servers = [];
        this.serverClass = config.scrap.server;
        this.serverClassName = [this.serverClass, config.scrap.serverName].join('-');
        this.serverClassDown = [this.serverClass, config.scrap.serverDown].join('-');
    }

    /**
     * Login the client
     */
    public login(){
        this.client.login(config.discord.clientId)
        .catch(
          (e) => {
            throw(e);
          }
        )
        .then(
          (e) => {
            console.log(this.message.login_succeded);
          }
        );
      
    }

    /**
     * Start scrapping every 30000ms
     */
    public start(){
      setInterval(()=>{
        this.scrap();
      }, 30000);
    }

    /**
     * Scrapping the status page
     */
    public async scrap(){
        this.servers = [];
        await got(config.newworld.serverStatusUrl)
        .then((response) => {
          let dom = new JSDOM(response.body);
          let nodeList = [...dom.window.document.querySelectorAll('.' + this.serverClass)]; // Get all servers
          nodeList.forEach((elm:HTMLElement) => {this.extractServerInfos(elm)}); // Extract server infos
          this.notify(config.newworld.server); // Update the activity's bot
        }).catch(e =>{
          throw(e);
        });
    }

    /**
     * Extract the name and the status from dom
     * @param element 
     */
    public extractServerInfos(element :HTMLElement){
        let server = new Server();
        server.name = element.getElementsByClassName(this.serverClassName)[0].textContent.trim();
        if(element.getElementsByClassName(this.serverClassDown).length === 0){
            server.isUp = true;
        }
        this.servers.push(server);
    }

    /**
     * Update bot's status
     * @param serverName 
     */
    public notify(serverName: string){
      let server = this.getServer(serverName);
      if(server){
        if( server.isUp){
          if(this.lastUp !== server.isUp){
            this.sendToChannel(this.message.channel_server_up(config.newworld.server));
          }
          console.log(this.message.activity_server_up(config.newworld.server));
          this.updateActivity(this.message.activity_server_up(config.newworld.server));
        } else {
          if(this.lastUp !== server.isUp){
            this.sendToChannel(this.message.channel_server_down(config.newworld.server));
          }
          console.log(this.message.activity_server_down(config.newworld.server));
          this.updateActivity(this.message.activity_server_down(config.newworld.server));
        }
        this.lastUp = server.isUp;
      } else {
        console.log(this.message.error_server_not_found(config.newworld.server));
      }
    }

    /**
     * Reply for the up command
     * @param msg 
     * @param serverName 
     */
    public reply(msg:Message, serverName:string){
      let server = this.getServer(serverName);
      if(server){
        if( server.isUp){
          console.log(this.message.reply_server_up(serverName));
          msg.reply(this.message.reply_server_up(serverName));
        } else {
          console.log(this.message.reply_server_down(serverName));
          msg.reply(this.message.reply_server_down(serverName));
        }
      } else {
        console.log(this.message.reply_server_not_found(serverName));
        msg.reply(this.message.reply_server_not_found(serverName));
      }
    }

    /**
     * Sent a message to the config channel
     * @param msg 
     */
    public sendToChannel(msg:string){
      if(this.channel !== undefined){
        this.channel.send(msg);
      }
    }

    /**
     * Update the activity of the bot
     * @param act 
     */
    public updateActivity(act:string){
      this.client.user.setActivity(act);
    }

    /**
     * Return a Server from his name
     * @param serverName 
     * @returns 
     */
    public getServer(serverName: string):Server{
      //TODO: if scrapping is stopped, scrap before getting the server
      return this.servers.find((server:Server)=>{
        if(server.name === serverName){
          return server;
        } else {
          return false;
        }
      });
    }

}