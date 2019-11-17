let keyPressed = "none";

window.addEventListener("keydown", keyPress);
window.addEventListener("keyup", keyRelease);

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
