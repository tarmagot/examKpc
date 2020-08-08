import React from "react";
import Action from "./actions";
import BoxInput from "./components/BoxInput";
import { connect } from "react-redux";
import { DatePicker } from "antd";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BoxInput title="BoxInput" />
    </div>
  );
}

export default App;
