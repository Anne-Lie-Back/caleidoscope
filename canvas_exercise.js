window.addEventListener('load', init)
window.addEventListener('resize', draw)




function init(){
    window.addEventListener('keypress', onKeyPress)

    let isPointModeActive = false
    let nrOfDots = "10000"
    let multiplier = 0

    draw(Number(nrOfDots),multiplier)

        /**
     * 
     * @param {KeyboardEvent} event event
     */
    function onKeyPress(event){
        console.log(isPointModeActive)
        
        if(event.key === "p"){
            isPointModeActive = true
            nrOfDots = ""
        }

        if(Number.isInteger(Number(event.key)) && isPointModeActive){
            nrOfDots += event.key
        }

        draw(Number(nrOfDots), multiplier) 
    }
}

/**
 * The main function of this script responsible for drawing
 * multiple beatiful pattern onto the screen
 */
function draw(nrOfDots, multiplier) {
    
    // Get the canvas element and it's context
    const canvas = document.querySelector("canvas")
    const context = canvas.getContext("2d")

    // Resize to fullscreen canvas
    canvas.width = window.innerWidth 
    canvas.height = window.innerHeight
    
    //Define initial values

    const radius = Math.min(canvas.width, canvas.height)/2.5
    const center = {
        x: canvas.width/2,
        y: canvas.height/2
    }

    // Clears the screen before drawing
    // This means we can call the draw function more than once
    context.clearRect(0, 0, canvas.width, canvas.height)
    // Actual functions that draw content onto the canvas element
    const dots = generateDotPositions(nrOfDots, radius, center)
    drawCirce(context, radius, center)
    drawDots(context, nrOfDots, dots)
    drawLines(context, nrOfDots, multiplier, dots)
}

/**
 * @param {Number} nrOfDots
 * @param {Number} radius
 * @param{{ x:Number, y:Number }} center
 * @returns {Array< { x:Number, y:Number }>} a list of position
 */

function generateDotPositions(nrOfDots, radius, center){
    const dots = []

    for (let i = 0; i < nrOfDots; i++) {
        // Calculate new position values (x, y)
        const angle = (2 * Math.PI / nrOfDots * i) - Math.PI / 2
        const x = center.x + radius * Math.cos(angle)
        const y = center.y + radius * Math.sin(angle)
        // Store dots for later use. i innebär = spara på den plats som är "nu" (värdet ändras i loopen).
        dots[i] = { x, y }
    }
    return dots
}

/**
 * Draws a thin and faded outline circle on the screen.
 * @param {CanvasRenderingContext2D} context
 * @param {Number} radius
 * @param{dot} center
 */
function drawCirce(context, radius, center) {
/*     center = {
        x: 400,
        y: 400
    } */

    context.beginPath()
    context.strokeStyle = 'lightgrey'
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    context.stroke()
    context.closePath()
}

/**
 * Draws each dot onto the outline circle.
 * @param {CanvasRenderingContext2D} context
 * @param {Number} - nrOfDots
 * @param {Array<dot>} dots
 * 
 */
function drawDots(context, nrOfDots, dots) {
    const dotSize =25/ Math.sqrt(nrOfDots)
    // Prepare drawing dots
    context.beginPath()
    context.fillStyle = 'skyblue'

    // Add all dots
    for (let i = 0; i < nrOfDots; i++) {
        const {x, y} = dots[i]
    
        // Draw the dots
        context.moveTo(x, y)
        context.arc(x, y, dotSize, 0, 2 * Math.PI)
    }

    // End drawing dots
    context.fill()
    context.closePath()
}

/**
 * Draws a line from each dot to another based on the multiplier value.
 * @param {CanvasRenderingContext2D} context
 * @param {Number} - nrOfDots
 * @param{Number} - multiplier
 * @param {Array<dot>} dots
 */
function drawLines(context, nrOfDots, multiplier, dots) {

    for (let i = 0; i < nrOfDots; i++) {
        // Select starting dot and calulate next dot
        const startDot = dots[i]
        const endDot = dots[i * multiplier % nrOfDots]

        // Draw the line between the dots in different colors
        context.strokeStyle = `hsl(${360 / nrOfDots * i}, 100%, 70%)`
        context.beginPath()
        context.moveTo(startDot.x, startDot.y)
        context.lineTo(endDot.x, endDot.y)
        context.stroke()
        context.closePath()
    }
}

/**
 * An object with location properties in a 2D space
 * @typedef {{ x: Number, y:Number}} dot
 */
