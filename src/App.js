"use strict";

const e = React.createElement;

const App = () => {
  return <div>hello</div>;
};

const domContainer = document.querySelector("#root");
ReactDOM.render(e(App), domContainer);
