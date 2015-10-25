function Route (route, player) {
    this.name = route;
    this.player = player;
    
    if (route) {
        this[route](player);
    }
}

Route.prototype.render = function () {
    // var ctx = pm.fieldCtx;

    // ctx.beginPath();
    // ctx.moveTo(this.player.x, this.player.y);
    
    // this.coords.forEach(function (point) {
    //     ctx.lineTo(point.x, point.y);
    // });

    // ctx.lineWidth = 2;
    // ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    // ctx.stroke();
    // ctx.closePath();
};

Route.prototype.quickIn = function (player) {
    var isLeft = player.x < 250;

    this.coords = [
        {
            x: player.x,
            y: player.y - 40
        },{
            x: player.x + (isLeft ? 20 : -20),
            y: player.y - 60
        },{
            x: player.x + (isLeft ? 500 - 20 - player.x : -player.x + 20),
            y: player.y - 60
        }
    ];
};

Route.prototype.shortCurl = function (player) {
    var isLeft = player.x < 250;

    this.coords = [
        {
            x: player.x,
            y: player.y - 60
        },{
            x: player.x + (isLeft ? 100 : -100),
            y: player.y - 160
        },{
            x: player.x + (isLeft ? 100 : -100),
            y: player.y - 140
        }
    ];
};

Route.prototype.skinyPost = function (player) {
    var isLeft = player.x < 250;

    this.coords = [
        {
            x: player.x,
            y: player.y - 100
        },{
            x: player.x + (isLeft ? 60 : -60),
            y: player.y - 280
        }
    ];
};

Route.prototype.out = function (player) {
    var isLeft = player.x < 250;

    this.fn = function (x, y, distance) {
        var newX, newY;

        if (y > player.position.y - 100) {
            newX = x;
            newY = y - distance;
        } else {
            player.
            newX = Math.min(x + (isLeft ? -distance : distance), 490);
            newY = y;
        }

        return {
            x: newX,
            y: newY
        };
    };
};

Route.prototype.up = function (player) {
    this.sections = [
        {
            x     : 0,
            y     : -player.y + 10,
            speed : 0,
            delay : 0
        }
    ];
};