import { Message } from './models/message';
import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: Message = new Message();
  private client: Client;
  conectado: boolean = false;
  messages: Message[] = [];
  constructor() { }

  ngOnInit(): void {
    this.client = new Client;
    this.client.webSocketFactory = () => {
      return new SockJS("http://localhost:8080/chat-websocket");
    };

    this.client.onConnect = (frame) => {
      console.log("Conectado : " + this.client.connected + " : " + frame);
      this.conectado = true;

      this.client.subscribe('/chat/message', e => {
        let message: Message = JSON.parse(e.body) as Message;
        this.messages.push(message);
        console.log(message);
      });
    };

    this.client.onDisconnect = (frame) => {
      console.log("Conectado : " + this.client.connected + " : " + frame);
      this.conectado = false;
    };

    this.client.activate();

  }

  conectar(): void {
    this.client.activate();
  }

  desconectar(): void {
    this.client.deactivate();
  }

  sendMessage(): void {
    this.client.publish({
      destination: '/app/message',
      body: JSON.stringify(this.message)
    })
    
    this.message.text = '';
  }

}
