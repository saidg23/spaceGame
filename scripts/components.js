let compType = {PHYSICS: 0, GEOMETRY: 1, BOID: 2, KEYBOARD_CONTROL: 3, POINT_AND_CLICK: 4};

function PhysicsComp(direction, speed = 0, acceleration)
{
    this.type = compType.PHYSICS;
    this.direction = direction;
    this.speed = speed;
    this.acceleration = acceleration;
}

function GeometryComp(pos, size, shape, angle)
{
    this.type = compType.GEOMETRY;
    this.pos = pos;
    this.angle = angle;
    this.size = size;
    this.shape = shape;
}

function KeyboardControlComp(isActive = true)
{
    this.type = compType.KEYBOARD_CONTROL;
    this.isActive = isActive;
}

function PointAndClickComp(shape, isActive = true)
{
    this.type = compType.POINT_AND_CLICK;
    this.isActive = isActive;
    this.isSelected = false;
    this.target = null;
    this.shape = shape;
}
