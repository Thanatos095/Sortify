import React , { Component }from 'react'
import anime from 'animejs';
import './styles.css'
import { getRandomInt } from '../../Utility/Random/Random';
import Animator from '../../Utility/Animator/Animator';
const get_data = () => {

    const array : Array<number> = [];
    for (let i = 0; i < 5; i++) {
        array.push(getRandomInt(1, 50));
    }
    return array;
}

export class Visualizer extends Component {
  numSwaps : number;
  numAccesses : number;
  numComparisons : number;
  data : Array<number>;
  states : Array<number>;
  _generator : Generator<void>;
  _references : Array<React.RefObject<HTMLDivElement>>
  _animationQueue : Array<anime.AnimeInstance>
  _animator : Animator;
  constructor(props : any){
      super(props);
      this.numSwaps = 0;
      this.numAccesses = 0;
      this.numComparisons = 0;
      this.data = get_data();
      this.states = Array(this.data.length).fill(0);
      this._references = Array.from({length:this.data.length}, u => React.createRef());
      this._generator = this.sort();
      this._animationQueue = [];
      this._animator = new Animator(60, (animatorRef : Animator) => {
        if(this._animationQueue.every(animation => animation.completed)){
            const next = this._generator.next();
            if(next.done){
                animatorRef.stop();
                anime({
                    targets : '.container-item',
                    backgroundColor : 'red',
                    delay : anime.stagger(100)
                });
            } 
        }
      });
  }    
  get(index : number){
      this.numAccesses++;
    //   this._references[index].current?.classList.add("active-item");
      this.states[index] = 1;
      this._animationQueue.push(
        anime({
            targets : this._references[index].current,
            backgroundColor : 'red',
        })
      );
      this._references[index].current!.style.backgroundColor = 'red';
      return this.data[index];
  }
  set(index : number, value : number){
      this.numAccesses++;
      this.states[index] = 1;
      this._references[index].current!.style.backgroundColor = 'red';
      this.data[index] = value;
  }
  swap(i : number, j : number){
      this.numSwaps++;
      this.numAccesses += 4; /* Two reads, Two writes */
      const distance = this._references[j].current!.getBoundingClientRect().x -  this._references[i].current!.getBoundingClientRect().x;
      this._animationQueue.push(
        anime({
            targets : this._references[i].current,
            translateX : `+=${distance}px`,
        }), 
        anime({
            targets : this._references[j].current,
            translateX : `-=${distance}px`,
        })
      );
      [this.data[i], this.data[j]]=[this.data[j], this.data[i]];
      [this._references[i], this._references[j]]=[this._references[j], this._references[i]];
  }
  gt(first : number, second : number){
      this.numComparisons++;
      return first > second;
  }
  lt(first : number, second : number){
      this.numComparisons++;
      return first < second;
  }
  eq(first : number, second : number){
      this.numComparisons++;
      return first === second;
  }
  gte(first : number, second : number){
      this.numComparisons++;
      return first >= second;
  }
  lte(first : number, second : number){
      this.numComparisons++;
      return first <= second;
  }
  clearStates(){
    this.states.forEach((item, i) => this.states[i] = 0);
    this._references.forEach((item, i) => item.current!.style.backgroundColor = 'black')
  }
  *sort() : Generator<void> {}
  render() {
    return (
      <>
        <div className='container'>
            {
            this.data.map((item, index) => {
                switch(this.states[index]){
                    case 1: return <div ref = { this._references[index] } key = {index} className='container-item active-item' style={{height : `${item}0px`}}></div>
                    default : return <div ref = { this._references[index] } key = {index} className='container-item' style={{height : `${item}0px`}}></div>
                }
            })
            }
        </div>
        <button onClick = {() => {this._animator.start()}}>Click Please</button>
      </>
    )
  }
}
export default Visualizer;