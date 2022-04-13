import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>){

    const formData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));
    
    const request = new HttpRequest('POST', 'api/anexos', formData);
    return this.http.request(request);
  }

}
