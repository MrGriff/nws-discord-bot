import {Client } from "discord.js";
import {Message} from "./messages/Message";
import {Got} from "got";
import {JSDOM} from "jsdom";
import Server from "./Server";

class Bot {

    client: Client;
    got: Got;
    config: any;
    message: any;
    running: boolean;
    servers: Server[];
    serverClass: string;
    serverClassName: string;
    serverClassDown: string;

    constructor(client: Client, config: any){
        this.client = client;
        this.config = config;
        this.message = Message.messagesOf('fr');
        this.running = false;
        this.servers = [];
        this.serverClass = this.config.scrap.server;
        this.serverClassName = [this.serverClass, this.config.scrap.serverName].join('-');
        this.serverClassDown = [this.serverClass, this.config.scrap.serverDown].join('-');
    }

    login(){
        this.client.login(this.config.discord.clientId);
        console.log(this.message.login_succeded);
    }

    async scrap(){
        this.servers = [];
        let response = await this.got(this.config.newworld);
        let dom = new JSDOM(response.body);
       
        let nodeList = [...dom.window.document.querySelectorAll(this.serverClass)];
        
        nodeList.forEach(this.extractServerInfos);
        if( server.isUp){
          if(lastUp !== server.isUp){
            channel.send('Peta vient de passer en ligne ! 😀');
          }
          console.log('✔️ Peta est up ✔️')
          client.user.setActivity('✔️ Peta est up ✔️');
        } else {
          if(lastUp !== server.isUp){
            channel.send('Peta vient de passer en hors ligne ! 😭');
          }
          console.log('❌ Peta est down ❌');
          client.user.setActivity('❌ Peta est down ❌');
        }
        lastUp = isUp;
    }

    extractServerInfos(element :HTMLElement){
        let server = new Server();
        server.name = element.getElementsByClassName(serverName)[0].textContent.trim();
        if(element.getElementsByClassName(serverName)[0].textContent.indexOf(this.config.newworld.server) !== -1){
            if(element.getElementsByClassName(serverDown).length === 0){
                server.isUp = true;
            }
        }
    }

}

export = Bot;