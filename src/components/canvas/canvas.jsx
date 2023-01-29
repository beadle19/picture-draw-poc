// import React, { useRef } from 'react'

// export function Canvas({ image }) {
//     const canvasRef = useRef(null)
//     const [image, setImage] = useState(image)

//     const handleLoadImage = e => {
//         const img = e.target
//         setImage(img.src)
//     }

//     function handleDraw(event) {
//         const { offsetX, offsetY } = event.nativeEvent;
//         const context = canvasRef.current.getContext('2d')
//         context.fillRect(offsetX, offsetY, 10, 10)
//     }

//     return (
//         <canvas
//             ref={canvasRef}
//             onClick={handleDraw}
//             width={640}
//             height={480}
//         />
//     )
// }

import React, { useRef, useState } from 'react'

export function Canvas({ imageSrc }) {
    const newImage = new Image()
    newImage.src = imageSrc

    const canvasRef = useRef(null)

    const [image, setImage] = useState(imageSrc)
    const [drawing, setDrawing] = useState(false)
    const [lines, setLines] = useState([])

    const handleLoadImage = e => {
        const file = e.target.files[0];
        const objectURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = objectURL;
        img.onload = function() {
            setImage(img);
        };
    }

    const handleMouseDown = e => {
        const coordinates = [e.clientX, e.clientY]
        setDrawing(true)
        setLines([...lines, [coordinates]])
    }

    const handleMouseMove = e => {
        if (!drawing) return

        const coordinates = [e.clientX, e.clientY]
        setLines(prevLines => prevLines.slice(-1)[0].concat([coordinates]))
    }

    const handleMouseUp = () => {
        setDrawing(false)
    }

    React.useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
                context.drawImage(image, 0, 0)
                context.lineWidth = 2
                context.lineJoin = 'round'
                context.lineCap = 'round'

                lines.forEach(line => {
                    context.beginPath()
                    line.forEach(([x, y], i) => {
                        context.moveTo(x, y)
                        context.lineTo(...line[i + 1] || line[0])
                    })
                    context.stroke()
                })
            }
        }
    }, [canvasRef, image, lines])

    // function handleDraw(event) {
    //     const { offsetX, offsetY } = event.nativeEvent;
    //     const context = canvasRef.current.getContext('2d')
    //     context.fillRect(offsetX, offsetY, 10, 10)
    // }

    // return (
    //     <canvas
    //         ref={canvasRef}
    //         onClick={handleDraw}
    //         width={640}
    //         height={480}
    //     />
    // )

    return (
        <>
            <input type="file" onChange={handleLoadImage} />
            <canvas
                width={500}
                height={500}
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
        </>
    )
}