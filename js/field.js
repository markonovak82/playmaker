function Field () {
    this.render();
}

Field.prototype.render = function () {
    this.paintEndZones();
    this.paintGrid();
    this.paintFieldLines();
};

Field.prototype.paintEndZones = function () {
    var ctx = pm.fieldCtx;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.rect(0, 0, 500, 200);
    ctx.rect(0, 1200, 500, 1400);
    ctx.fill();
};

Field.prototype.paintGrid = function () {
    for (var i = 20; i <= 1400; i += 20) {
        this.line({
            sx     : 0,
            sy     : i + 0.5,
            ex     : 500,
            ey     : i + 0.5,
            dashed : 'grid',
            color  : 'rgba(255, 255, 255, 0.5)',
            width  : 1
        });
    }

    for (var i = 20; i <= 500; i += 20) {
        this.line({
            sx     : i + 0.5,
            sy     : 0,
            ex     : i + 0.5,
            ey     : 1400,
            dashed : 'grid',
            color  : 'rgba(255, 255, 255, 0.5)',
            width  : 1
        });
    }
};

Field.prototype.paintFieldLines = function () {
    for (var i = 200; i <= 1200; i += 100) {
        this.line({
            sx     : 0,
            sy     : i + 0.5,
            ex     : 500,
            ey     : i + 0.5,
            dashed : i === 300 || i === 1100 ? 'norunning' : false,
            color  : 'rgba(255, 255, 255, ' + ((i > 300 && i < 700) || (i > 700 && i < 1100) ? 0.2 : 1) + ')',
            width  : 3
        });
    }

    this.line({
        sx     : 230,
        sy     : 440.5,
        ex     : 270,
        ey     : 440.5,
        dashed : false,
        color  : 'rgba(255, 255, 255, 1)',
        width  : 3
    });

    this.line({
        sx     : 230,
        sy     : 960.5,
        ex     : 270,
        ey     : 960.5,
        dashed : false,
        color  : 'rgba(255, 255, 255, 1)',
        width  : 3
    });
};

Field.prototype.line = function (l) {
    var ctx = pm.fieldCtx;

    if (l.dashed === 'grid') {
        ctx.setLineDash([2, 2]);
    } else if (l.dashed === 'norunning') {
        ctx.setLineDash([10, 10]);
        ctx.lineDashOffset = 5;
    } else {
        ctx.setLineDash([]);
    }

    ctx.beginPath();
    ctx.moveTo(l.sx, l.sy);
    ctx.lineTo(l.ex, l.ey);
    ctx.lineWidth = l.width;
    ctx.strokeStyle = l.color;
    ctx.stroke();
    ctx.closePath();
};