class Animator {
    _requestID : number;
    _fps : number;
    _animate : Function | null;
    _playing : Boolean;
    // _time : Array<number>;
    constructor(fps = 60, animate : Function | null) {
      this._requestID = 0;
      this._fps = fps;
      this._animate = animate;
      this._playing = false;
      // this._time = [];
    }
    setanimateFunction(animate : Function){
      this._animate = animate;
    }
    setFPS(fps : number){
      this._fps = fps;
    }
    isPlaying(){
      return this._playing;
    }
    // getTimeAnimated(){
    //   return this._time.reduce( (item, total) => total + item );
    // }
    start() {
      if(!this._playing)
      {
        this._playing = true;
        let then = performance.now();
        const tolerance = 0.1;
        const _animateLoop = (now : number) => {
          this._requestID = requestAnimationFrame(_animateLoop);
          const delta = now - then;
          const interval = 1000 / this._fps;
          if (delta >= interval - tolerance) {
            then = now - (delta % interval);
            // const t1 = performance.now();
            this._animate!(this);
            // const t2 = performance.now();
            // this._time.push(t2 - t1);
          }
        };
        this._requestID = requestAnimationFrame(_animateLoop);
      }
    }
  
    stop() {
      if(this._playing)
      {
        this._playing = false;
        cancelAnimationFrame(this._requestID);
      }
    }
  
  }
  export default Animator;