import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route } from "react-router-dom"
import { StaticRouter } from "react-router"

import Example from './components/example'
import Test from './components/test'
import ProfileImg from './components/profile-img'
import ExampleClass from './components/example-class'
import ExampleView from './views/example'
import TestView from './views/test'
import RootView from './views'

const App = () => {
  return (
    <div className="app__container">
      <Route exact path="/" component={RootView} />
      <Route path="/components/example" component={Example} />
      <Route path="/components/test" component={Test} />
      <Route path="/components/example-class" component={ExampleClass} />
      <Route path="/components/profile-img" component={ProfileImg} />
      <Route path="/views/example" component={ExampleView} />
      <Route path="/views/test" component={TestView} />
    </div>
  )
};

// use this for build
export const renderMarkup = props => (
  <StaticRouter {...props}>
    <App />
  </StaticRouter>
);


// use this for dev
if (typeof document !== "undefined") {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
}
