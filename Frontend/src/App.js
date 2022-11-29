import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import CreateSubject from "./components/createSubject";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element = {<Login/>}/>
        <Route path="/crear-materia" exact element = {<CreateSubject/>}/>
      </Routes>
    </Router>
  );
}

export default App;
