let keyPressed = "none";
let mouseEvent = new MouseEvent("mousedown");

window.addEventListener("keydown", keyPress);
window.addEventListener("keyup", keyRelease);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseup", mouseUp);

function keyPress(e)
{
    keyPressed = e.code;
    window.removeEventListener("keydown", keyPress);
}

function keyRelease(e)
{
    keyPressed = "none";
    window.addEventListener("keydown", keyPress);
}

function mouseDown(e)
{
    mouseEvent = e;
}

function mouseUp(e)
{
    mouseEvent = e;
}
