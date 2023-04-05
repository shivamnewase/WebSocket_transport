const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log("server listining on port 8080");
let subscribers = new Set();

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let data;
    try {
      data = JSON.parse(message);
    } catch (error) {
      const response = {
        type: 'Error',
        error: 'Bad formatted payload, non JSON',
        updatedAt: Date.now()
      };
      return ws.send(JSON.stringify(response));
    }

    switch (data.type) {
      case 'Subscribe':
        subscribers.add(ws);
        const subscribeResponse = {
          type: 'Subscribe',
          status: 'Subscribed',
          updatedAt: Date.now()
        };
        setTimeout(() => ws.send(JSON.stringify(subscribeResponse)), 4000);
        break;
      case 'Unscubscribe':
        subscribers.delete(ws);
        const unsubscribeResponse = {
          type: 'Unscubscribe',
          status: 'Unsubscribed',
          updatedAt: Date.now()
        };
        setTimeout(() => ws.send(JSON.stringify(unsubscribeResponse)), 8000);
        break;
      case 'CountSubscribers':
        const countSubscribersResponse = {
          type: 'CountSubscribers',
          count: subscribers.size,
          updatedAt: Date.now()
        };
        ws.send(JSON.stringify(countSubscribersResponse));
        break;
      default:
        const errorResponse = {
          type: 'Error',
          error: 'Requested method not implemented',
          updatedAt: Date.now()
        };
        ws.send(JSON.stringify(errorResponse));
        break;
    }
  });

  const heartbeat = setInterval(() => {
    const heartbeatResponse = {
      type: 'Heartbeat',
      updatedAt: Date.now()
    };
    ws.send(JSON.stringify(heartbeatResponse));
  }, 1000);
});
