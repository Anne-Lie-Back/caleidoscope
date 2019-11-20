window.addEventListener('load', draw)

// Vi definerar nåra globla variabler för enkelhetens skull
// Lägg till fler om du behöver
let nrOfDots = 500;
let multiplier = 50;

const dots = [];
const dotSize = 5;
const radius = 200;
const centerPoint = {
    x:300,
    y:300
};

function draw() {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCirce(context);
    drawDots(context);
    drawLines(context);
}

/**
 * Draws the outline circle for this projekt.
 * @param {CanvasRenderingContext2D} context
 */
function drawCirce(context) {

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
    context.stroke();
}

/**
 * Draws each dot onto the outline circle.
 * @param {CanvasRenderingContext2D} context
 */
function drawDots(context) {

    context.fillStyle="lightgreen";
    context.beginPath();

    for(let i = 0; i < nrOfDots; i++){
    const angle = (2 * Math.PI / nrOfDots * i) - Math.PI / 2; // - Math.PI/2 is for changing startingpoint to 12 o'clock.
    const x =  centerPoint.x + radius * Math.cos(angle);
    const y =  centerPoint.y + radius * Math.sin(angle);

    context.moveTo(x, y);
    context.arc(x, y, 5, 0, 2 * Math.PI);
    //dots.push({x,y});
    
    //vi sprarar objekt-värden för x och y på alla index-positioner
    dots[i] = {x,y}
    }

    context.fill();
}

/**
 * Draws a line from each dot to another based on the multiplier value.
 * @param {CanvasRenderingContext2D} context
 */
function drawLines(context) {

    
    // TODO: skriv koden här
    for(let i = 0; i < nrOfDots; i++){
        const startDot = dots[i];
        const endDot = dots[i * multiplier % nrOfDots];
        
        context.strokeStyle = `hsl(${i}, 100%, 70%)`;
        context.beginPath();
        context.moveTo(startDot.x, startDot.y);
        context.lineTo(endDot.x, endDot.y);
        context.stroke();
        context.closePath();
    }
    


    

    /*    for(let i = 0; i < nrOfDots; i++){
        const angle = (2 * Math.PI / nrOfDots * i) - Math.PI / 2; // - Math.PI/2 is for changing startingpoint to 12 o'clock.
        const x =  centerPoint.x + radius * Math.cos(angle);
        const y =  centerPoint.y + radius * Math.sin(angle);
        context.lineTo(x,y);  
        context.arc(x, y, 5, 0, 2 * Math.PI);
        dots.push();
        }  */
    
}