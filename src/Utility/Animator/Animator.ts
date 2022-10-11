class Animator {
    _requestID : number;
    _fps : number;
    _animate : Function | null;
    _playing : Boolean;
    constructor(fps = 60, animate : Function | null) {
      this._requestID = 0;
      this._fps = fps;
      this._animate = animate;
      this._playing = false;
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
    start() {
      if(!this._playing)
      {
        this._playing = true;
        let then = performance.now();
        const interval = 1000 / this._fps;
        const tolerance = 0.1;
  
        const _animateLoop = (now : number) => {
          this._requestID = requestAnimationFrame(_animateLoop);
          const delta = now - then;
  
          if (delta >= interval - tolerance) {
            then = now - (delta % interval);
            this._animate!(this);
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