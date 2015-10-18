function Player (options) {
    if (options) {
        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                this[prop] = options[prop];
            }
        }
    }

    // part of the route
    this.cut = 0;

    // route duration
    this.time = 0;

    // 200px/s ~ 10m/s = max speed of 100
    this.speedFactor = 200;

    // 150px/s ~ 7.5m/s = max acceleration of 100
    this.accelerationFactor = 150;
}

Player.prototype.update = function (elapsed) {
    if (!this.route) {
        return;
    }

    this.time += elapsed;

    var rx           = this.route.coords[0].x,
        ry           = this.route.coords[0].y,
        acceleration = this.accelerationFactor * (this.person.acceleration / 100),
        maxSpeed     = this.speedFactor * (this.person.speed / 100),
        speed        = Math.min(acceleration * (this.time / 1000), maxSpeed),
        pxPerFrame   = (speed * (elapsed / 1000)),
        isXPositive  = rx > this.position.x,
        isYPositive  = ry > this.position.y;

    if (rx !== this.position.x)
        this.x = Math[isXPositive ? 'min' : 'max'](this.x + pxPerFrame * (isXPositive ? 1 : -1), rx);

    if (ry !== this.position.y)
        this.y = Math[isYPositive ? 'min' : 'max'](this.y + pxPerFrame * (isYPositive ? 1 : -1), ry);

    if (ry === this.y && this.label === 'Q' && !this.printed) {
        this.printed = true;
        console.log(this.time);
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