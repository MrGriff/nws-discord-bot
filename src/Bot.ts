import { Client, TextChannel } from "discord.js";
import {Messages} from "./messages/Messages";
import got from "got";
import {JSDOM} from "jsdom";
import { Server } from "./Server";

export class Bot {
    client: Client;
    channel: TextChannel;
    config: any;
    message: any;
    running: boolean;
    lastUp: boolean;
    servers: Server[];
    serverClass: string;
    serverClassName: string;
    serverClassDown: string;

    constructor(client: Client, config: any){
        this.client = client;
        this.channel = client.channels.cache.find((channel:TextChannel) => channel.name === this.config.discord.channelName) as TextChannel; ;
        this.config = config;
        this.message = Messages.messagesOf('fr');
        this.running = false;
        this.servers = [];
        this.serverClass = this.config.scrap.server;
        this.serverClassName = [this.serverClass, this.config.scrap.serverName].join('-');
        this.serverClassDown = [this.serverClass, this.config.scrap.serverDown].join('-');
    }

    public login(){
        this.client.login(this.config.discord.clientId)
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

    public start(){
      setInterval(()=>{
        this.scrap();
      }, 5000);
    }

    public async scrap(){
        this.servers = [];
        await got(this.config.newworld.serverStatusUrl)
        .then((response) => {
          let dom = new JSDOM(response.body);
          let nodeList = [...dom.window.document.querySelectorAll('.' + this.serverClass)];
          nodeList.forEach((elm:HTMLElement) => {this.extractServerInfos(elm)});
          this.notify();
        }).catch(e =>{
          throw(e);
        });
    }

    public extractServerInfos(element :HTMLElement){
        let server = new Server();
        server.name = element.getElementsByClassName(this.serverClassName)[0].textContent.trim();
        if(element.getElementsByClassName(this.serverClassDown).length === 0){
            server.isUp = true;
        }
        this.servers.push(server);
    }

    public notify(){
      let server = this.getServer(this.config.newworld.server);
      if(server){
        if( server.isUp){
          if(this.lastUp !== server.isUp){
            this.sendToChannel(this.message.channel_server_up(this.config.newworld.server));
          }
          console.log(this.message.activity_server_up(this.config.newworld.server));
          this.updateActivity(this.message.activity_server_up(this.config.newworld.server));
        } else {
          if(this.lastUp !== server.isUp){
            this.sendToChannel(this.message.channel_server_down(this.config.newworld.server));
          }
          console.log(this.message.activity_server_down(this.config.newworld.server));
          this.updateActivity(this.message.activity_server_down(this.config.newworld.server));
        }
        this.lastUp = server.isUp;
      } else {
        console.log(this.message.error_server_not_found(this.config.newworld.server));
      }
    }

    public sendToChannel(msg:string){
      if(this.channel !== undefined){
        this.channel.send(msg);
      }
    }

    public updateActivity(act:string){
      this.client.user.setActivity(act);
    }

    public getServer(serverName: string):Server{
      return this.servers.find((server:Server)=>{
        if(server.name === serverName){
          return server;
        } else {
          return false;
        }
      });
    }

}