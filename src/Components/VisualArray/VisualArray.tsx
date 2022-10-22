import React, { Component }from 'react'
import './styles.css'
import { getRandomInt } from '../../Utility/Random/Random';
import Animator from '../../Utility/Animator/Animator';

interface _props{
    sort : (v : VisualArray) => Generator<void>,
    data : Array<number>,
    fps : number
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
  _generator : Generator<void> | null;
  _animator : Animator;
  _containerRef : React.RefObject<HTMLDivElement>

  constructor(props : _props){
      super(props);
      this.numSwaps = 0;
      this.numAccesses = 0;
      this.numComparisons = 0;
      this.data = [...this.props.data] /* Force a copy with spread operator */
      this.min = Math.min(...this.props.data);
      this.max = Math.max(...this.props.data);
      this.states = Array(this.props.data.length).fill(State.normal); /* Denotes which nodes are active */
      this._containerRef = React.createRef(); /* Used to get the height and width of the container div */
      this._generator = null;
      this._animator = new Animator(props.fps, (animatorRef : Animator) => {
        const next = this._generator!.next(); /* Get next fram */
        if(next.done){ /* If all frames have been taken then stop the animation */
            this._generator = null;
            animatorRef.stop();
            console.log(this.getStatistics()); 
        }
        this.forceUpdate(() => this.#clearStates()); /* Rerender the component and after rerender(synchronous), clear the states array */
      });
  }

  componentDidMount(): void {
      this.forceUpdate();
  }
  start = () => {
    if(this._generator === null){
      this._generator = this.props.sort(this);
      this._animator.start()
    }
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
    return {numAccesses : this.numAccesses, numSwaps : this.numSwaps, numComparisons : this.numComparisons};
  }
  #clearStates(){
    this.states = Array(this.states.length).fill(State.normal);
  }
/*[0, this._containerRef.current!.offsetHeight]; Output Range
  [this.min, this.max]; Input Range
  Map *value* from input Range to Output Range

  Formulas taken from stackoverflow
  double slope = 1.0 * (output_end - output_start) / (input_end - input_start)
  output = output_start + slope * (input - input_start)*/
  #getBarHeight(value : number){
    if(this._containerRef.current){ /* In the first render, the container reference is null */
      const slope = this._containerRef.current.offsetHeight / (this.max - this.min);
      return slope * Math.round(value - this.min);
    }
    else return 0;
  }
  render() {
    return (
      <>
        <div ref={this._containerRef} className='container'>
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
        <button onClick = {this.start}>Click Please </button>
      </>
    )
  }
}
export default VisualArray;