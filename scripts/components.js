let compType = {PHYSICS: 0, GEOMETRY: 1, BOID: 2, CONTROLLABLE: 3};

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

function ControllableComp()
{
    this.type = compType.CONTROLLABLE;
    this.active = true;
}
