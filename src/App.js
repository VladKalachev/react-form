import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Content from "./components/Content";
import FormOne from "./components/Forms/FormOne";
import FormTwo from "./components/Forms/FormTwo";
import Footer from "./components/Footer";

import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/">Form 1(Basic)</Link> {" / "}
          <Link to="/form-one">Form 2</Link> {" / "}
          <Link to="/form-two">Form 3</Link>
          <Header />
          <Route exact path="/" component={Content} />
          <Route exact path="/form-one" component={FormOne} />
          <Route exact path="/form-two" component={FormTwo} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
