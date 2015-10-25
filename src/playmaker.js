function Playmaker () {
    this.$field = $('#field-canvas');
    this.fieldCtx = this.$field[0].getContext('2d');

    this.$players = $('#players-canvas');
    this.playersCtx = this.$players[0].getContext('2d');

    this.$formationBtn = $('#formation');
    this.$playBtn = $('#play');
    this.$sideBtn = $('#side');
    this.$qbBtn = $('#qb');
    this.$positionBtn = $('#position');
    this.$setBtn = $('#set');
    this.$animateBtn = $('#animate');

    this.tick = this.tick.bind(this);
    this.set = this.set.bind(this);
    this.animate = this.animate.bind(this);

    this.people = {};
    this.players = {};

    this.animating = false;
    this.playersLoaded = false;
    this.formationsLoaded = false;
}

Playmaker.prototype.init = function () {
    // load all players
    if (!this.playersLoaded) {
        $.getJSON('/people.json', function (data) {
            data.forEach(function (person) {
                this.people[person.id] = new Person({
                    name         : person.name,
                    speed        : person.speed,
                    acceleration : person.acceleration
                });
            }, this);

            this.playersLoaded = true;
        }.bind(this));
    }

    // load all formations
    if (!this.formationsLoaded) {
        $.getJSON('/formations.json', function (data) {
            this.formations = data;

            for (var formation in data) {
                this.$formationBtn.append($('<option></option>').attr('value', formation).text(formation));
            }

            this.formationsLoaded = true;
        }.bind(this));
    }

    // prepare all buttons
    this.$setBtn.click(this.set);
    this.$animateBtn.click(this.animate);

    // render field
    this.field = new Field();
};

Playmaker.prototype.set = function () {
    if (!this.playersLoaded && !this.formationsLoaded) {
        return;
    }

    // clean everything first
    this.reset();

    // create selected formation
    this.formation = new Formation({
        name: this.$formationBtn.val(),
        side: this.$sideBtn.val(),
        qb: this.$qbBtn.val(),
        start: this.$positionBtn.val()
    });

    // rethink how will plays work
    this.play = new Play(true, {
        qb: null,
        center: 'up',
        wrx: 'up',
        wry: 'up',
        slot: 'up'
    });
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

    currentTime = new Date();
    if (this.lastUpdateTime === null) {
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