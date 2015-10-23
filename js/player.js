function Player (options) {
    if (options) {
        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                this[prop] = options[prop];
            }
        }
    }

    // part of the route
    this.section = 0;

    // route duration
    this.time = 0;

    // 170px/s ~ 8.5m/s = max speed of 100
    this.speedFactor = 170;

    // 240px/s ~ 12m/s = max acceleration of 100
    this.accelerationFactor = 240;
}

Player.prototype.update = function (elapsed) {
    if (!this.route) {
        return;
    }

    this.time += elapsed;

    var rx           = this.position.x + this.route.sections[this.section].x,
        ry           = this.position.y + this.route.sections[this.section].y,
        acceleration = this.accelerationFactor * (this.person.acceleration / 100),
        maxSpeed     = this.speedFactor * (this.person.speed / 100),
        speed        = Math.min(acceleration * (this.time / 1000), maxSpeed),
        pxPerFrame   = (speed * (elapsed / 1000)),
        isXPositive  = rx > this.position.x,
        isYPositive  = ry > this.position.y;

    if (rx !== this.position.x) {
        this.x = Math[isXPositive ? 'min' : 'max'](this.x + pxPerFrame * (isXPositive ? 1 : -1), rx);
    }

    if (ry !== this.position.y) {
        this.y = Math[isYPositive ? 'min' : 'max'](this.y + pxPerFrame * (isYPositive ? 1 : -1), ry);
    }

    if (this.x === rx && this.y === ry) {
        console.log(this.time)
        this.section += 1;
    }
};

Player.prototype.render = function () {
    var ctx = pm.playersCtx;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    
    ctx.font = "9px Arial";
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillText(this.label, this.x - 3, this.y + 4);
};

Player.prototype.setPosition = function (x, y) {
    this.position = {
        x: x,
        y: y
    };

    this.x = x;
    this.y = y;
};