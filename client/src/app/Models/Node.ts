
export class Node {
    id: string;
    name: string;
    parent: string;
    children: any[];   
    constructor(name) {
        this.name = name;
        this.parent = '';
        this.children = [];
    }
}


