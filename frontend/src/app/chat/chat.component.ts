import { Message } from './models/message';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  message: Message = new Message();
  private client: Client;
  conectado: boolean = false;
  messages: Message[] = [];
  private http: HttpClient;
  files: Set<File>;
  temArquivo: boolean = false;
  modoEnvio: boolean = false;
  constructor(private service: ChatService) { }

  ngOnInit(): void {
    this.scrollToBottom();
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
      this.publishMessage()

    }

    this.client.onDisconnect = (frame) => {
      this.conectado = false;
    }

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  conectar(): void {
    this.client.activate();
  }

  desconectar(): void {
    this.client.deactivate();
  }

  publishMessage(): void{
    this.client.publish({
      destination: '/chat/mensagens',
      body: JSON.stringify(this.message)
    })
  }

  sendMessage(): void {
    this.message.type = "MENSAGEM";
    this.publishMessage()

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
      this.temArquivo = false;
    } else {
      (document.getElementById('customFileLabel') as HTMLElement).innerHTML = fileNames.join(', ');
      this.temArquivo = true;
    }

  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files).subscribe((response: any) => {
        for (let i = 0; i < response.body?.length; i++) {
          this.message.info = response.body[i].nome;
          this.message.text = "http://localhost:8080/anexos/" + response.body[i].id;
          this.message.type = "ANEXO";
          this.publishMessage()

          this.message.text = '';
          (document.getElementById('customFileLabel') as HTMLElement).innerHTML = 'Selecione o arquivo';
          this.temArquivo = false;
        }
      });


    }

  }

  trocarEnvio(): void {
    if (this.modoEnvio == true) this.modoEnvio = false;
    else this.modoEnvio = true;
  }

}
