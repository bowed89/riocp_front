import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher('root', {
      cluster: '', 
      wsHost: '127.0.0.1',
      wsPort: 6001,
      forceTLS: false,
      enabledTransports: ['ws'],
      disableStats: true,
      authEndpoint: 'http://127.0.0.1:6001/broadcasting/auth', 
      auth: {
        headers: {
          'X-CSRF-Token': this.getCSRFToken() 
        }
      }
    });
  }

  listenToMenuUpdates(callback: (data: any) => void) {
    const channel = this.pusherClient.subscribe('menu-pestania');
    channel.bind('App\\Events\\MenuUpdated', callback);
  }

  private getCSRFToken(): string {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? (meta as HTMLMetaElement).content : '';
  }
}
