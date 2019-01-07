
export class Node {
    id: string;
    name: string;
    parent: string;
    children: any[];
    type: string;
    constructor(name?) {
        this.name = name;
        this.parent = '';
        this.children = [];
    }
}


