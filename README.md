# ccapi

JavaScript interface to use the Canon Camera RESTful API over Wi-Fi.

## Installation

```bash
npm install canon-ccapi
```

## Usage

```javascript
const camera = new CCAPI("192.168.1.60:8080");

const cards = await camera.storage();
const files = await camera.files(cards[0]);
const thumb = await camera.thumbnail(files[0]);
```

See [example/index.html](./example/index.html) for full example.

## Compatibility

Tested on Canon EOS R6.

## How enable CCAPI on camera

See [Latest-CCAPI](https://developers.canon-europe.com/s/article/Latest-CCAPI) for camera compatibility list.

The Camera Control API is not enabled by default. To enable it, you need to install the latest firmware on your camera and sign-up for the Canon Developer Program. Then activate your camera using thier activation tool.

For instructions on how to enable CCAPI on your camera, see [Camera Control API](https://developers.canon-europe.com/s/camera).
