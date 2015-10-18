function Playmaker () {
    this.$field = $('#field-canvas');
    this.fieldCtx = this.$field[0].getContext('2d');

    this.$players = $('#players-canvas');
    this.playersCtx = this.$players[0].getContext('2d');

    this.tick = this.tick.bind(this);

    this.people = {};
    this.players = {};

    this.animating = false;
}

Playmaker.prototype.init = function () {
    // create players
    $.getJSON('/people.json', function (data) {
        data.forEach(function (person) {
            this.people[person.id] = new Person({
                name         : person.name,
                speed        : person.speed,
                acceleration : person.acceleration
            });
        }, this);

        // create and render field
        this.field = new Field();

        // create and render formation
        this.formation = new Formation({
            name  : 'spread',
            side  : 'right',
            qb    : 'shotgun',
            start : 14
        });

        // create and/or render play
        this.play = new Play(true, {
            center : 'up',
            qb     : null,
            wrx    : 'up',
            wry    : 'up',
            slot   : 'up'
        });
    }.bind(this));
};

Playmaker.prototype.animate = function () {
    this.animating = true;
    this.tick();
};

Playmaker.prototype.reset = function () {
    this.animating = false;
    this.field = null;
    this.people = {};
    this.players = {};
    this.formation = null;
    this.play = null;

    this.clear();
    this.init();
};

Playmaker.prototype.tick = function () {
    var elapsed,
        currentTime;

    if (this.animating) {
        requestAnimationFrame(this.tick);
    } else {
        this.lastUpdateTime = null;
        return;
    }

    currentTime = +new Date;
    if (this.lastUpdateTime == null) {
        this.lastUpdateTime = currentTime;
    }

    elapsed = currentTime - this.lastUpdateTime;

    this.update(elapsed);
    this.render();
        
    this.lastUpdateTime = currentTime;
};

Playmaker.prototype.update = function (elapsed) {
    for (var player in this.players) {
        this.players[player].update(elapsed);
    }
};

Playmaker.prototype.render = function () {
    this.clear();
    this.field.render();

    for (var player in this.players) {
        this.players[player].render();
    }
};

Playmaker.prototype.clear = function () {
    this.fieldCtx.clearRect(0, 0, this.$field.width(), this.$field.height());
    this.playersCtx.clearRect(0, 0, this.$players.width(), this.$players.height());
};