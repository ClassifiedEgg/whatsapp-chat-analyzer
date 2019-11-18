import React from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Index from './components/Index';

const App = () =>
  <Router>
    <Route exact path="/" component={Index} />
  </Router>

export default App;
