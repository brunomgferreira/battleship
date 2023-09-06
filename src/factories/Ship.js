class Ship {

    constructor(length) {
        this.length = length;
        this.hits = [];
        this.row = null;
        this.column = null;
        this.isVertical = null;
    }

    hit(position) {
        if (this.hits.includes(position) || position < 0 || position >= this.length)
            return;
        this.hits.push(position);
    }

    isSunk() {
        return (this.hits.length === this.length);
    }

    setCoords(row, column) {
        this.row = row;
        this.column = column;
    }

    setIsVertical(isVertical) {
        this.isVertical = isVertical;
    }
}

export default Ship;