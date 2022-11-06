import React, { Component }from 'react'
import './styles.css'
import { getRandomInt } from '../../Utility/Random/Random';
import Animator from '../../Utility/Animator/Animator';
interface _props{
    sort : (v : VisualArray) => Generator<void>,
    data : Array<number>,
    fps : number, 
    style ?: React.CSSProperties, /* ? means optional prop */
    className ?: string /* Optional prop */
};
enum State{
  normal,
  active
}
export class VisualArray extends Component<_props, {}> {
  numSwaps : number;
  numAccesses : number;
  numComparisons : number;
  states : Array<State>;
  data : Array<number>
  min : number;
  max : number;
  maxNumberOfElements : number;
  timeTaken : number;
  _sort : ( v : VisualArray ) => Generator<void>;
  _generator : Generator<void> | null;
  _animator : Animator;
  _containerRef : React.RefObject<HTMLDivElement>;
  _onDoneMethod : Function | null; /* can be used to call a function when visualization is done. */
  _isDone : boolean
  constructor(props : _props){
      super(props);
      this.numSwaps = 0;
      this.numAccesses = 0;
      this.numComparisons = 0;
      this.data = [...this.props.data] /* Force a copy with spread operator */
      this.min = 0;
      this.max = 0;
      this.maxNumberOfElements = 0;
      this.timeTaken = 0;
      this.states = Array(this.props.data.length).fill(State.normal); /* Denotes which nodes are active */
      this._containerRef = React.createRef(); /* Used to get the height and width of the container div */
      this._sort = props.sort;
      this._generator = null;
      this._onDoneMethod = null;
      this._isDone = true;
      this._animator = new Animator(props.fps, (animatorRef : Animator) => {
        const next = this._generator!.next(); /* Get next fram generator*/
        if(next.done){ /* If all frames have been taken then stop the animation */
            this._generator = null;
            animatorRef.stop();
            this.timeTaken = performance.now() - this.timeTaken;
            this.forceUpdate(() => {
              this.#clearStates();
              if(this._onDoneMethod){
                this._onDoneMethod();
                this._isDone = true;
              } 
            })
        }
        else this.forceUpdate(() => this.#clearStates()); 
        /* Rerender the component and after rerender(synchronous), clear the states array 
        animation loop :  Update => Draw => clear => next_frame => update => Draw => clear ......
        */
      });
  }
  setData(data : Array<number>){
    this.data = [...data];
    this.#reInit();
    this.#adjustLength();
    this.forceUpdate();
  }
  setSort( sorter : (v : VisualArray) => Generator<void>){
    this._sort= sorter;
    this._generator = this._sort(this);
  }
  setFPS(value : number){
    this._animator.setFPS(value);
  }
  onDone(fun : Function){
    this._onDoneMethod = fun;
  }
  #reInit(){
    this.pause();
    this._generator = this._sort(this);
    this._isDone = true;
    this._onDoneMethod && this._onDoneMethod();
  }
  play = () => {
    if(this._isDone){
      this.timeTaken = performance.now();
      this.numAccesses = 0;
      this.numSwaps = 0;
      this.numComparisons = 0;
      this._isDone = false;
    }
    if(this._generator === null) this._generator = this._sort(this);
    this._animator.start();
  }
  pause = () => {
    this._animator.stop();
  }
  isPlaying = () => {
    return this._animator.isPlaying();
  }
  nextFrame = () => {
    if( !this._animator.isPlaying() && this._generator != null){
      this._generator.next();
    }
  }
  componentDidMount(): void {
      this.#adjustLength();
      this.forceUpdate();
  }
  get(index : number){
      this.numAccesses++;
      this.states[index] = State.active;
      return this.data[index];
  }
  set(index : number, value : number){
      this.numAccesses++;
      this.states[index] = State.active;
      this.data[index] = value;
  }
  swap(i : number, j : number){
      this.numSwaps++;
      this.numAccesses += 4; /* Two reads, Two writes */
      [this.data[i], this.data[j]]=[this.data[j], this.data[i]];
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
  length(){
    return this.data.length;
  }
  getStatistics(){
    return {
        numAccesses : this.numAccesses,
        numSwaps : this.numSwaps,
        numComparisons : this.numComparisons,
        timeTaken : this.timeTaken
      };
  }
  #clearStates(){
    this.states = Array(this.states.length).fill(State.normal);
  }
  #adjustLength(){
      const ELEMENT_MAX_SPACE_TAKEN = 15 + 3.2; /* Min width is 15pixels and the left and right margin is 3.2 pixels in total */
      this.maxNumberOfElements = Math.floor(this._containerRef.current!.offsetWidth / ELEMENT_MAX_SPACE_TAKEN);
      const new_length = Math.min(this.data.length, this.maxNumberOfElements) + 1;
      this.data = [...this.data.slice(0, new_length)];
      this.max = Math.max(...this.data);
      this.min = Math.min(...this.data);
      this.states = [...this.states.slice(0, new_length)];
  }
  /*[0, this._containerRef.current!.offsetHeight]; Output Range
  [this.min, this.max]; Input Range
  Map *value* from input Range to Output Range

  Formulas taken from stackoverflow
  double slope = 1.0 * (output_end - output_start) / (input_end - input_start)
  output = output_start + slope * (input - input_start)*/
  #getBarHeight(value : number){
    if(this._containerRef.current){ /* In the first render, the container reference is null */
      const computedStyles = getComputedStyle(this._containerRef.current);
      const height = parseFloat(computedStyles.height) - parseFloat(computedStyles.paddingTop) - parseFloat(computedStyles.paddingBottom)
      /* Subtracting 1 from the minimum so the cell with minimum value does not have height 0 */
      const slope = height / (this.max - (this.min - 1));
      /* Cell min height is 1px*/
      return Math.max(Math.ceil(slope * Math.round(value - (this.min - 1))), 1);
    }
    else return 0;
  }
  render() {
    return (
      <>
        <div style={{...this.props.style}} ref={this._containerRef} className='container'>
            {
            this.data.map((item, index) => 
                <div  
                  key = {index} 
                  className = {this.states[index] === State.active ? 'container-item active-item' : 'container-item'}
                  style = {{height : `${this.#getBarHeight(item)}px`}}
                  title = {item.toString()}
                  >
                </div>
            )
            }
        </div>
      </>
    )
  }
}
export default VisualArray;