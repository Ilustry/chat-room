import { Message } from './models/message';
import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { ChatService } from './chat.service';

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
  private http: HttpClient;
  files: Set<File>;
  constructor(private service: ChatService) { }

  ngOnInit(): void {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS("http://localhost:8080/chat-websocket");
    }
    this.client.onConnect = (frame) => {
      this.conectado = true;

      this.client.subscribe('/chat/mensagens', e => {
        let message: Message = JSON.parse(e.body) as Message;
        message.date = new Date();
        this.messages.push(message);
      });

      this.message.type = "NOVO_USUARIO";

      this.client.publish({
        destination: '/chat/mensagens',
        body: JSON.stringify(this.message)
      })

    }

    this.client.onDisconnect = (frame) => {
      this.conectado = false;
    }

  }

  conectar(): void {
    this.client.activate();
  }

  desconectar(): void {
    this.client.deactivate();
  }

  sendMessage(): void {
    this.message.type = "MENSAGEM";
    this.client.publish({
      destination: '/chat/mensagens',
      body: JSON.stringify(this.message)
    })

    this.message.text = '';
  }

  onChange(event: any) {

    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    if (fileNames.length == 0) {
      (document.getElementById('customFileLabel') as HTMLElement).innerHTML = 'Selecione o arquivo';
    } else {
      (document.getElementById('customFileLabel') as HTMLElement).innerHTML = fileNames.join(', ');
    }

  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files).subscribe((response: any) => {
        for (let i = 0; i < response.body?.length; i++) {
          this.message.info = response.body[i].nome;
          this.message.text = "http://localhost:8080/anexos/" + response.body[i].id;
          this.message.type = "ANEXO";
          this.client.publish({
            destination: '/chat/mensagens',
            body: JSON.stringify(this.message)
          })

          this.message.text = '';
          (document.getElementById('customFileLabel') as HTMLElement).innerHTML = 'Selecione o arquivo';
        }
      });


    }

  }



}
