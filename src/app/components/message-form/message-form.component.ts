import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@app/models';
import { DialogflowService } from '@app/services';
import { FacebookService } from '../../services/facebook.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit, OnDestroy {

  @Input('message')
  public message: Message;

  @Input('messages')
  public messages: Message[];



  subscription: Subscription;

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.subscription = this.facebookService.messageRecieved.subscribe(msg => {
      this.messages.push(msg);
    });
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);

    this.facebookService.sendMessage(this.message.content);
    this.message = new Message('', 'assets/images/user.png');
  }

  public sendTwitterMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);

    this.facebookService.sendTwitterMessage(this.message.content);
    this.message = new Message('', 'assets/images/user.png');
  }

  public sendSlackMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);

    this.facebookService.sendSlackMessage(this.message.content);
    this.message = new Message('', 'assets/images/user.png');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
