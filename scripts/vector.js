function Vector2(x = 0, y = 0)
{
    this.x = x;
    this.y = y;

    this.getMagnitude = function()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    this.scale= function(scaleAmount)
    {
        return new Vector2(this.x * scaleAmount, this.y * scaleAmount);
    }

    this.getNormal = function()
    {
        let magnitude = this.getMagnitude();
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    this.getVectorAngle = function()
    {
        let angle = Math.atan2(this.y, this.x);
        if(angle < 0)
        {
            angle = 2 * Math.PI + angle;
        }
        return angle;
    }
}

function getDirectionalVector(angle)
{
    let x = Math.cos(angle);
    let y = Math.sin(angle);
    return new Vector2(x, y);
}

function addVector2(a, b)
{
    return new Vector2(a.x + b.x, a.y + b.y);
}

function subtractVector2(a, b)
{
    return new Vector2(a.x - b.x, a.y - b.y);
}
