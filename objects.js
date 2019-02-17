var Level =
{
    walls: [],
    par_time: 0,
    start_location: vec3(0.0, 0.0, 1.0),
    start_direction: 0,
    num_walls: 0,
    finish_box: [
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0)
    ]
}

var Ship =
{
    x_location: 0.0,
    y_location: 0.0,
    x_speed: 0.0,
    y_speed: 0.0,
    max_speed: .01,
    rotate_speed: .05,
    direction: 0.0,
    coast_dir: 0.0,
    speed: 0.0,
    coast_rate: .0001,
    acc_rate: .0005,
    vertices: [
        vec3(-0.05, 0.04, 1),
        vec3(-0.05, -0.04, 1),
        vec3(0.05, 0.0, 1)
    ],
    colors: [],
    move: function()
    {
        this.x_location += this.x_speed;
        this.y_location += this.y_speed;
    },
    rotate: function(dir)
    {
        this.direction += this.rotate_speed * dir;
    },
    accelerateTo: function(rate, goal, deadband, follow)
    {
        if(this.speed > goal)
            this.speed -= rate;
        else if(this.speed < goal)
            this.speed += rate;

        if(this.speed <= goal + deadband && this.speed >= goal - deadband)
            this.speed = goal;

        if(follow)
            this.coast_dir = this.direction;

        this.x_speed = this.speed * Math.cos(this.coast_dir);
        this.y_speed = this.speed * Math.sin(this.coast_dir);
    }
}

function buildWall(x_location, y_location, width, height)
{
    var vertices = [];

    vertices.push(vec3(x_location, y_location, 1.0));
    vertices.push(vec3(x_location, y_location + height, 1.0));
    vertices.push(vec3(x_location + width, y_location + height, 1.0));
    vertices.push(vec3(x_location + width, y_location, 1.0));

    return vertices;
}

function shipCaptured()
{
    var p1 = levels[level].finish_box[0];
    var p2 = levels[level].finish_box[1];
    var p3 = levels[level].finish_box[2];
    var p4 = levels[level].finish_box[3];

    var res = 0;

    for(var j = 0; j < ship.vertices.length; j++)
    {
        var x = ship.vertices[j][0];
        var y = ship.vertices[j][1];
        var w = 1;

        var sx = x * Math.cos(ship.direction)
               + y * Math.sin(ship.direction)
               + w * ship.x_location;
        var sy = x * -Math.sin(ship.direction)
               + y * Math.cos(ship.direction)
               + w * ship.y_location;

        if(sx >= p1[0] && sx <= p4[0] && sy >= p1[1] && sy <= p2[1])
        {
            res++;
        }
    }

    if(res == 3)
        return true;
    return false;
}

function shipCollision()
{
    for(var i = 0; i < levels[level].walls.length; i++)
    {
        var p1 = levels[level].walls[i][0];
        var p2 = levels[level].walls[i][1];
        var p3 = levels[level].walls[i][2];
        var p4 = levels[level].walls[i][3];

        for(var j = 0; j < ship.vertices.length; j++)
        {
            var x = ship.vertices[j][0];
            var y = ship.vertices[j][1];
            var w = 1;

            var sx = x * Math.cos(ship.direction)
                   + y * Math.sin(ship.direction)
                   + w * ship.x_location;
            var sy = x * -Math.sin(ship.direction)
                   + y * Math.cos(ship.direction)
                   + w * ship.y_location;

            if(sx >= p1[0] && sx <= p4[0]
                && sy >= p1[1] && sy <= p2[1])
            {
                return true;
            }
        }
    }

    for(var j = 0; j < ship.vertices.length; j++)
    {
        var x = ship.vertices[j][0];
        var y = ship.vertices[j][1];
        var w = 1;

        var sx = x * Math.cos(ship.direction)
               + y * Math.sin(ship.direction)
               + w * ship.x_location;
        var sy = x * -Math.sin(ship.direction)
               + y * Math.cos(ship.direction)
               + w * ship.y_location;

        if(sx < -1.0 || sx > 1.0
            || sy < -1.0 || sy > 1.0)
        {
            return true;
        }
    }



    return false;
}
