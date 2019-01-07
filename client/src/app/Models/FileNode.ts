
export class FileNode {
    children: FileNode[];
    filename: string;
    type: any;
    minValue: number;
    maxValue: number;
    constructor(filename?, type?, minValue?, maxValue?) {
        this.filename = filename;
        this.type = type;
        this.children = [];
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}
