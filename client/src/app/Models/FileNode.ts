
export class FileNode {
    children: any[];
    filename: string;
    type: string;
    minValue: number;
    maxValue: number;
    _id: number;
    constructor(filename?, type?, minValue?, maxValue?) {
        this.filename = filename;
        this.type = type;
        this.children = [];
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}
