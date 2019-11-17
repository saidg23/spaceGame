let keyPressed = "none";
let mouseEvent = null;

window.addEventListener("keydown", keyPress);
window.addEventListener("keyup", keyRelease);
window.addEventListener("click", mouseClick);

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

function mouseClick(e)
{
    mouseEvent = e;
}
