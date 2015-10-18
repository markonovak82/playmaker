function Formation (options) {
    pm.players = {
        center: new Player({
            color  : 'yellow',
            label  : 'C',
            person : pm.people.tomaz
        }),
        qb: new Player({
            color  : 'yellow',
            label  : 'Q',
            person : pm.people.anton
        }),
        wrx: new Player({
            color  : 'yellow',
            label  : 'X',
            person : pm.people.klemen
        }),
        wry: new Player({
            color  : 'yellow',
            label  : 'Y',
            person : pm.people.uros
        }),
        slot: new Player({
            color  : 'yellow',
            label  : 'S',
            person : pm.people.marko
        }),
    };

    this[options.name](options.start, options.side, options.qb);
    this.render();
}

Formation.prototype.render = function () {
    for (var player in pm.players) {
        pm.players[player].render();
    }
};

Formation.prototype.spread = function (start, side, qb) {
    pm.players.center.setPosition(250, 200 + start * 20);
    pm.players.qb.setPosition(250, (200 + start * 20) + (qb === 'under' ? 30 : 80));
    pm.players.wrx.setPosition(80, 200 + start * 20);
    pm.players.wry.setPosition(460, 200 + start * 20);
    pm.players.slot.setPosition(side === 'left' ? 140 : 360, 200 + start * 20);
};

Formation.prototype.bunch = function (start, side, qb) {
    pm.players = {
        center: new Player(this.pm, {
            x      : 250,
            y      : 200 + start * 20,
            color  : 'yellow',
            label  : 'C',
            route  : new Route(this.pm, { player: 'center', route: 'out' }),
            speed  : 80,
            radius : 10
        }),
        qb: new Player(this.pm, {
            x      : 250,
            y      : (200 + start * 20) + (qb === 'under' ? 30 : 80),
            color  : 'gray',
            label  : 'Q',
            route  : new Route(this.pm, { player: 'qb' }),
            speed  : 80,
            radius : 10
        }),
        wrx: new Player(this.pm, {
            x      : side === 'left' ? 190 : 220,
            y      : 200 + start * 20,
            color  : 'red',
            label  : 'X',
            route  : new Route(this.pm, { player: 'wrx', route: 'shortCurl' }),
            speed  : 90,
            radius : 10
        }),
        wry: new Player(this.pm, {
            x      : side === 'left' ? 280 : 310,
            y      : 200 + start * 20,
            color  : 'brown',
            label  : 'Y',
            route  : new Route(this.pm, { player: 'wry', route: 'quickIn' }),
            speed  : 90,
            radius : 10
        }),
        slot: new Player(this.pm, {
            x      : side === 'left' ? 220 : 280,
            y      : 200 + start * 20,
            color  : 'pink',
            label  : 'S',
            route  : new Route(this.pm, { player: 'slot', route: 'skinyPost' }),
            speed  : 100,
            radius : 10
        }),
    };
};