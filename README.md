# Requirements

-   [FFmpeg](https://ffmpeg.org/).
-   See [rtsp-simple-server](https://github.com/aler9/rtsp-simple-server)
-   Configure [RTSP Web Cam](https://github.com/aler9/rtsp-simple-server#serve-a-webcam)

# About

The Node Face API RTSP Stream library uses [face-api.js](https://justadudewhohacks.github.io/face-api.js/docs/index.html) and [node-rtsp-stream](https://github.com/kyriesent/node-rtsp-stream#readme) to consumes data messages from RTSP Stream and detect faces on it.

# How to Use

```bash
mkdir test-face-detect
cd test-face-detect
npm init -y
npm install --save fvi-node-face-api-rtsp-stream
```

## Dev

```bash
git clone https://github.com/salespaulo/fvi-node-face-api-rtsp-stream
cd fvi-node-face-api-rtsp-stream
npm install
npm run dev
# OR
npm run test
```

## Instantiate

```javascript
const FaceApiRtspStream = require('fvi-node-face-api-rtsp-stream')

const instance = FaceApiRtspStream({
    name: 'ID',
    url: 'rtsp://',
    port: 6789,
    score: 0.5,
    stream: 'new node-rtsp-stream/videoStream()',
})
```

## Starting/Stoping

```javascript
instance
    .start()
    .then(res => console.log('Initializate'))
    .catch(e => console.error(e))

instance.stop()
```

## Events

```javascript
instance.on('error', e => console.error(e))
instance.on('warn', message => console.log(message))
instance.on('data', event => console.log(event))
instance.on('detect', event => console.log(event))
instance.on('start', event => console.log(event))
instance.on('stop', event => console.log(event))
```

# Lab

Into directory `lab` you find tests with this library using [WebSocket](https://github.com/websockets/ws) and [jsmpeg.js](https://github.com/phoboslab/jsmpeg). Let's join it!

-   _index.js_: Starts `fvi-node-face-api-rtsp-stream`, collects face detects, draw details and send, `WebSocket.socket.send`, buffered image to `ws-index.html`.

-   _ws-index.html_: Connects via [WebSocket](https://github.com/websockets/ws), get buffered images with detections and show.
-   _jmpeg-index.html_: Connects via [jsmpeg.js](https://github.com/phoboslab/jsmpeg), nd show.

## Run

```bash
npm i
cd lab
node ws-index.test.js
```

> After this, opens browser url http://localhost:8081 to see images.

# Licence

MIT
