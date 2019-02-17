// Benji Leavitt
// 02/20/2019

function rotateShape(theta)
{
    // cos(Θ)   sin(Θ)  0
    // -sin(Θ)  cos(Θ)  0
    // 0        0       1
    var transMat = [Math.cos(theta),  -Math.sin(theta),  0.0,
                    Math.sin(theta),  Math.cos(theta),   0.0,
                    0.0,              0.0,               1.0];
    return transMat;
}

function scaleShape(sx, sy)
{
    // sx   0   0
    // 0    sy  0
    // 0    0   1
    var transMat = [sx,  0.0, 0.0,
                    0.0, sy,  0.0,
                    0.0, 0.0, 1.0];
    return transMat;
}

function translateShape(tx, ty)
{
    // 1    0   tx
    // 0    1   ty
    // 0    0   1
    var transMat = [1.0,  0.0,  0.0,
                    0.0,  1.0,  0.0,
                    tx, ty, 1.0];
    return transMat;
}

function dotMat3(mat1, mat2)
{
    var resMat = [];
    for(var h = 0; h < 3; h++)
    {
        for(var i = 0; i < 3; i++)
        {
            var val = 0.0;
            for(var j = 0; j < 3; j++)
            {
                val += mat1[i+j*3] * mat2[h*3+j];
            }
            resMat.push(val);
        }
    }
    return resMat;
}
