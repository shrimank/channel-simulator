import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Message } from '../models/message';
import { environment } from '../../environments/environment';

@Injectable()
export class FacebookService {

    messageRecieved = new Subject<any>();

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {

    }

    sendMessage(message) {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',

        });
        let data = {
            'verify_token': '5ac5c66ea8667f38b899928d',
            input: message
        }

        this.http.post(`${this.apiUrl}/webhook`, data, { headers: headers }).subscribe((res: any) => {
            res.timestamp = new Date();
            
                let message = new Message(res.message, 'assets/images/bot.png', res.timestamp);
                
            this.messageRecieved.next(message);
        });


    }

    sendSlackMessage(message) {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',

        });
        let data = {
            'verify_token': '5ac60ab30499fd0b76a2e796',
            input: message
        }

        this.http.post(`${this.apiUrl}/webhook`, data, { headers: headers }).subscribe((res: any) => {
            
            console.log("SLACK",res);

                let message = new Message(res.message, 'assets/images/bot.png', new Date());
       
            this.messageRecieved.next(message);
        });


    }

    sendTwitterMessage(message) {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',

        });
        let data = {
            'verify_token': '5ac60b6a0499fd0b76a2ecb6',
            input: message
        }

        this.http.post(`${this.apiUrl}/webhook`, data, { headers: headers }).subscribe((res: any) => {
            res.timestamp = new Date();
            let message = new Message(res.message, 'assets/images/bot.png', res.timestamp);
            this.messageRecieved.next(message);
        });


    }


}