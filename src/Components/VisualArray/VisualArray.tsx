import { Component }from 'react'
import './styles.css'
import { getRandomInt } from '../../Utility/Random/Random';
import Animator from '../../Utility/Animator/Animator';

interface _props{
    sort : (v : VisualArray) => Generator<void>,
    data : Array<number>,
    fps : number
};
interface _state{
    data : Array<number>
};

enum State{
  normal,
  active
}

export class VisualArray extends Component<_props, _state> {
  numSwaps : number;
  numAccesses : number;
  numComparisons : number;
  states : Array<State>;
  _generator : Generator<void> | null;
  _animator : Animator;
  constructor(props : _props){
      super(props);
      this.numSwaps = 0;
      this.numAccesses = 0;
      this.numComparisons = 0;
      this.state = { data : props.data };
      this.states = Array(this.state.data.length).fill(State.normal); /* Denotes which nodes are active */
      this._generator = props.sort(this);
      this._animator = new Animator(props.fps, (animatorRef : Animator) => {
        const next = this._generator!.next();
        if(next.done){
            animatorRef.stop();
            console.log(this.getStatistics()); 
        }
        this.forceUpdate(() => this.#clearStates()); /* This is a temporary fix to update the state properly. Making the states array a state doesnt work */
      });
  }    
  get(index : number){
      this.numAccesses++;
      this.states[index] = State.active;
      return this.state.data[index];
  }
  set(index : number, value : number){
      this.numAccesses++;
      this.states[index] = State.active;
      const data = [...this.state.data];
      data[index] = value;
      this.setState({ data : data });
  }
  swap(i : number, j : number){
      this.numSwaps++;
      this.numAccesses += 4; /* Two reads, Two writes */
      const data = [...this.state.data];
      [data[i], data[j]]=[data[j], data[i]];
      this.setState({ data : data });
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
    return this.state.data.length;
  }
  getStatistics(){
    return {numAccesses : this.numAccesses, numSwaps : this.numSwaps, numComparisons : this.numComparisons};
  }
  #clearStates(){
    this.states = Array(this.states.length).fill(State.normal);
  }
  render() {
    return (
      <>
        <div className='container'>
            {
            this.state.data.map((item, index) => 
                <div  
                  key = {index} 
                  className={this.states[index] === State.active ? 'container-item active-item' : 'container-item'}
                  style={{height : `${item}0px`}}>
                </div>
            )
            }
        </div>
        <button onClick = {() => {this._animator.start()}}>Click Please</button>
      </>
    )
  }
}
export default VisualArray;