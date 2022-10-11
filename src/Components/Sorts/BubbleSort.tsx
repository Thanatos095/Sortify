import React, { Component } from 'react'
import Visualizer from '../Visualizer/Visualizer'
export class BubbleSort extends Visualizer {
    constructor(props : any){
        super(props);
        this._generator = this.sort();
    }
    *sort(){
        for (let i = 0; i < this.data.length - 1; i++)
        {
            for (let j = 0; j < this.data.length - i - 1; j++)
            {
                if (this.gt(this.get(j), this.get(j + 1)))
                {
                    this.swap(j, j + 1);
                }
                yield;
                this.clearStates();
            }
        
        }
    }
}

export default BubbleSort