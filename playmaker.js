function Playmaker () {
    this.field = new Field();

    this.field.$canvas.click(function () {
        this.field.enterEditMode();
    }.bind(this));

    $(document).click(function () {
        this.field.leaveEditMode();
    }.bind(this));
}

Playmaker.prototype.snapToGrid = function (x, y) {
    var newX = parseInt(x / 20, 10) + (x % 20 >= 10 ? 1 : 0);
    var newY = parseInt(y / 20, 10) + (y % 20 >= 10 ? 1 : 0);

    return { x: newX, y: newY };
};