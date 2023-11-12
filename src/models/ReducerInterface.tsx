// An interface for our actions
interface CountAction {
    increment: CountActionKind;
    decrement: number;
    changeIndex
  }
  
  // An interface for our state
  interface CountState {
    count: number;
  }