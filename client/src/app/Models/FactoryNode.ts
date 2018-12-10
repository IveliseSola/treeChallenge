import { Node } from './Node';

export class NodeFactory extends Node{
    min: number;
    max: number;
    parent: string;
    children: any[];
    constructor(name, min, max){
        super(name);
        this.min = min;
        this.max = max;
        // this.parent = '';
        // this.children = [];
    }
    generateNumber () {
        return Math.floor(Math.random() * (this.max - this.min) + this.min);
    }
}
