
import { Observable } from 'rxjs';
import { Client } from '@stomp/stompjs';

export class WebSocketClient {
  client!: Client;

  constructor(private brokerUrl: string) { }

  async connect() {
    return new Promise<void>((resolve) => {
      this.client = new Client({
        brokerURL: this.brokerUrl,
        connectHeaders: {},
        debug: function (str) {
          console.log("STOMP DEBUG: " + str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.client.onConnect = function (frame) {
        console.log('Connected to broker: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
        resolve();
      };

      this.client.onStompError = function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };

      this.client.activate();
    });
  }

  topic$(topic: string): Observable<any> {
    return new Observable<any>((o) => {
      const subscription = this.client.subscribe(topic, (message) => {
        if (message.body) {
          console.log('got message with body ' + message.body);
          o.next(JSON.parse(message.body));
        } else {
          console.log('got empty message');
        }
      });
    });
  }

  disconnect() {
    this.client.deactivate();
    console.log("Disconnected");
  }

  send(destination: string, message: any) {
    console.log("Sent to: " + destination);
    console.log(message);
    this.client.publish({ destination: destination, body: JSON.stringify(message) });
  }
}
