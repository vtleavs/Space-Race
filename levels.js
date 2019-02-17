function buildLevels()
{
    var level0 = Object.create(Level);
    level0.start_location = vec3(-0.5, 0.0, 1.0);
    level0.start_direction = 0.0;
    level0.par_time = 3000;
    level0.finish_box = buildWall(.2, -.5, .5, 1.0);
    levels.push(level0);

    var level1 = Object.create(Level);
    level1.start_location = vec3(-.5, 0.0, 1.0);
    level1.start_direction = 0.0;
    level1.par_time = 5000;
    level1.finish_box = buildWall(.4, -.2, .2, .4);
    level1.walls = [
        buildWall(-1.0, .5, 2.0, .05),
        buildWall(-1.0, -.5, 2.0, .05),
        buildWall(0.95, -.5, .05, 1.0),
        buildWall(-1.0, -.5, .05, 1.0),
        buildWall(-.025, -.25, .05, 0.5)
    ];
    levels.push(level1);

    var level2 = Object.create(Level);
    level2.start_location = vec3(-.65, 0.0, 1.0);
    level2.start_direction = 0.0;
    level2.par_time = 7500;
    level2.finish_box = buildWall(.6, -.2, .2, .4);
    level2.walls = [
        buildWall(-1.0, .5, 2.0, .05),
        buildWall(-1.0, -.5, 2.0, .05),
        buildWall(0.95, -.5, .05, 1.0),
        buildWall(-1.0, -.5, .05, 1.0),
        buildWall(-.35, -.5, .05, 0.65),
        buildWall(.3, -.15, .05, 0.65)
    ];
    levels.push(level2);

    var level3 = Object.create(Level);
    level3.start_location = vec3(-0.75, -0.8, 1);
    level3.start_direction = Math.PI/2.0;
    level3.par_time = 30000;
    level3.finish_box = buildWall(-0.325, 0.0, 0.3, 0.15);
    level3.walls = [
        buildWall(-0.925, -0.7, 0.05, 1.4),
        buildWall(-0.925, 0.7, 1.1, 0.05),
        buildWall(0.175, 0.65, 0.1, 0.1),
        buildWall(0.275, 0.6, 0.1, 0.15),
        buildWall(0.375, 0.55, 0.1, 0.2),
        buildWall(0.475, 0.5, 0.2, 0.25),
        buildWall(0.675, 0.6, 0.25, 0.15),
        buildWall(0.875, -0.5, 0.05, 1.1),
        buildWall(-0.325, -0.7, 1.25, 0.2),
        buildWall(-0.625, -0.7, 0.3, 0.9),
        buildWall(-0.325, 0.15, 0.5, 0.05),
        buildWall(0.175, 0.15, 0.1, 0.1),
        buildWall(0.275, 0.15, 0.1, 0.15),
        buildWall(0.375, 0.15, 0.1, 0.2),
        buildWall(0.475, 0.15, 0.2, 0.25),
        buildWall(-0.025, -0.3, 0.7, 0.45),
        buildWall(-0.425, 0.2, 0.05, 0.2),
        buildWall(-0.125, 0.4, 0.05, 0.3)
    ];
    levels.push(level3);
}
