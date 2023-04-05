const WebSocket = require('ws');
const assert = require('assert');

describe('WebSocket Server', function() {
  let ws;
  let client;

  before(function() {
    ws = new WebSocket('ws://localhost:8080');
  });

  after(function() {
    ws.close();
  });

  beforeEach(function() {
    client = new WebSocket('ws://localhost:8080');
  });

  afterEach(function() {
    client.close();
  });

  it('should handle Subscribe method and return Subscribed status message', function(done) {
    client.on('open', function open() {
      const subscribeMessage = {
        type: 'Subscribe'
      };
      client.send(JSON.stringify(subscribeMessage));
    });

    client.on('message', function incoming(message) {
      const data = JSON.parse(message);
      assert.equal(data.type, 'Subscribe');
      assert.equal(data.status, 'Subscribed');
      done();
    });
  });

  it('should handle Unsubscribe method and return Unsubscribed status message', function(done) {
    console.log(done)
  })
})