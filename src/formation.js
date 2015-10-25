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

    var start = options.start.split(' ');
    start = (start[0] === 'own' ? 10 + 50 - parseInt(start[1], 10) : 10 + parseInt(start[1], 10));

    this.update(options.name, start, options.side, options.qb);
    this.render();
}

Formation.prototype.update = function (name, start, side, qb) {
    for (var player in pm.players) {
        var x = 0, y = 0,
            playerData = pm.formations[name].positions[player];

        if (player === 'qb') {
            if (typeof playerData.x === 'object') {
                x = playerData.x[qb];
            }
            if (typeof playerData.y === 'object') {
                y = playerData.y[qb];
            }
        } else {
            if (typeof playerData.x === 'object') {
                x = playerData.x[side];
            }

            if (typeof playerData.y === 'object') {
                y = playerData.y[side];
            }
        }

        pm.players[player].setPosition(250 + (x || playerData.x), (start * 20) + (y || playerData.y));
    }
};

Formation.prototype.render = function () {
    for (var player in pm.players) {
        pm.players[player].render();
    }
};