const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  const subscribeMessage = {
    type: 'Subscribe'
  };
  ws.send(JSON.stringify(subscribeMessage));
});

ws.on('message', function incoming(message) {
  console.log(`Received message: ${message}`);
});
