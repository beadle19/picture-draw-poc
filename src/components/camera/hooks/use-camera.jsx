import { useState } from 'react'

export function useCamera() {
    const [stream, setStream] = useState(null)

    async function takePicture() {
        if (!stream) {
            const localStream = await navigator.mediaDevices.getUserMedia({
                video: true, 
                audio: false
            })
            setStream(localStream)
        }

        const canvas = document.createElement('canvas')
        const video = document.createElement('video')

        video.srcObject = stream;
        video.play();

        const context = canvas.getContext('2d')
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const data = canvas.toDataURL('image/png')
        return data;
    }

    return { takePicture }
}