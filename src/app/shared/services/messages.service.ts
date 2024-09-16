import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private messageService: MessageService
  ) { }

  MessageSuccess(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  MessageError(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary, detail });
  }

}
