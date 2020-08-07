import React from "react";
import Action from "./actions";
import Counter from "./components/counter";
import { connect } from "react-redux";

import "./App.css";

function App(prop) {
  return (
    <div className="App">
      <Counter
        value={prop.counter}
        onIncrement={() => prop.increment()}
        onDecrement={() => prop.decrement()}
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () =>
    dispatch({ type: Action.INCREMENT, text: "INCREMENT Redux" }),
  decrement: () =>
    dispatch({ type: Action.DECREMENT, text: "DECREMENT Redux" }),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
