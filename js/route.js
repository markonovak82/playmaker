function Route (route, player) {
    this.name = route;
    this.player = player;
    
    if (route) {
        this[route](player);
    }
}

Route.prototype.render = function () {
    var ctx = pm.fieldCtx;

    ctx.beginPath();
    ctx.moveTo(this.player.x, this.player.y);
    
    this.coords.forEach(function (point) {
        ctx.lineTo(point.x, point.y);
    });

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 0, 1)';
    ctx.stroke();
    ctx.closePath();
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

Route.prototype.out = function (player) {
    var isLeft = player.x < 250;

    // za vsak step v routu dodaj na kaksno hitrost more zabremzat igralec
    // oziroma za kolk se more zabremzat da ga spelje

    this.coords = [
        {
            x: player.x + (isLeft ? 100 : -100),
            y: player.y - 120
        },{
            x: player.x + (isLeft ? 500 - 20 - player.x : -player.x + 20),
            y: player.y - 120
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

Route.prototype.up = function (player) {
    this.coords = [
        {
            x: player.x,
            y: 20
        }
    ];
};