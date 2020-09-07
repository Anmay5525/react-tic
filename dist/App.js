"use strict";

var e = React.createElement;

var App = function App() {
  return React.createElement(
    "div",
    null,
    "hello"
  );
};

var domContainer = document.querySelector("#root");
ReactDOM.render(e(App), domContainer);