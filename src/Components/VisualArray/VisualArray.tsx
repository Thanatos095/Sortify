import { Component }from 'react'
import './styles.css'
import { getRandomInt } from '../../Utility/Random/Random';
import Animator from '../../Utility/Animator/Animator';

interface _props{
    sort : (v : VisualArray) => Generator<void>,
    data : Array<number>
};
interface _state{
    data : Array<number>
};
export class VisualArray extends Component<_props, _state> {
  numSwaps : number;
  numAccesses : number;
  numComparisons : number;
  states : Array<number>;
  _generator : Generator<void> | null;
  _animator : Animator;
  constructor(props : _props){
      super(props);
      this.numSwaps = 0;
      this.numAccesses = 0;
      this.numComparisons = 0;
      this.state = { data : props.data };
      this.states = Array(this.state.data.length).fill(0); /* Denotes which nodes are active */
      this._generator = props.sort(this);
      const fps = 120; /* The higher the fps, the higher the speed of the animation */
      this._animator = new Animator(fps, (animatorRef : Animator) => {
        const next = this._generator!.next();
        if(next.done){
            animatorRef.stop();
            this.clearStates();    
            console.log(this.getStatistics()); 
        } 
      });
  }    
  get(index : number){
      this.numAccesses++;
      this.states[index] = 1;
      return this.state.data[index];
  }
  set(index : number, value : number){
      this.numAccesses++;
      this.states[index] = 1;
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
  clearStates(){
    this.states = Array(this.states.length).fill(0);
    this.forceUpdate(); /* This is a temporary fix to update the state properly. Making the states array a state doesnt work */
  }
  render() {
    return (
      <>
        <div className='container'>
            {
            this.state.data.map((item, index) => {
                switch(this.states[index]){
                    case 1: return <div  key = {index} className='container-item active-item' style={{height : `${item}0px`}}></div>
                    default : return <div key = {index} className='container-item' style={{height : `${item}0px`}}></div>
                }
            })
            }
        </div>
        <button onClick = {() => {this._animator.start()}}>Click Please</button>
      </>
    )
  }
}
export default VisualArray;