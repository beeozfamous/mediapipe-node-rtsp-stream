import VideoStream from 'node-rtsp-stream/videoStream'
import FaceApiRtspStreamConsumer from './facial'

interface RtspStreamOpts {
    name: String
    url: String
    port: Number
    jsmpegPort: Number
    stream: VideoStream
    score: Number
    weightsDir: String
}

export default (opts: RtspStreamOpts) => new FaceApiRtspStreamConsumer(opts)
