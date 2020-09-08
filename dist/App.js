"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Square = function Square(props) {
  return React.createElement(
    "button",
    {
      className: "square",
      onClick: function onClick() {
        props.onClick();
      }
    },
    props.value
  );
};

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: "renderSquare",
    value: function renderSquare(i) {
      var _this2 = this;

      return React.createElement(Square, {
        value: this.props.squares[i],
        onClick: function onClick() {
          _this2.props.onClick(i);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare(0),
          this.renderSquare(1),
          this.renderSquare(2)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare(3),
          this.renderSquare(4),
          this.renderSquare(5)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare(6),
          this.renderSquare(7),
          this.renderSquare(8)
        )
      );
    }
  }]);

  return Board;
}(React.Component);

var Game = function (_React$Component2) {
  _inherits(Game, _React$Component2);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this3 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this3.handleClick = function (i) {
      var hist = _this3.state.history.slice(0, _this3.state.stepNumber + 1);
      var current = hist[hist.length - 1];
      var sq = current.squares.slice();

      if (calculateWinner(sq) || sq[i]) {
        return;
      }

      sq[i] = _this3.state.xIsNext ? "X" : "O";
      _this3.setState({
        history: hist.concat([{
          squares: sq
        }]),
        stepNumber: hist.length,
        xIsNext: !_this3.state.xIsNext
      });
    };

    _this3.jumpTo = function (move) {
      console.log("jumped to " + move);
      _this3.setState({
        stepNumber: move,
        xIsNext: move % 2 === 0
      });
    };

    _this3.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    };
    return _this3;
  }

  _createClass(Game, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var hist = this.state.history;
      var current = hist[this.state.stepNumber];
      var winner = calculateWinner(current.squares);

      var moves = hist.map(function (element, move) {
        var desc = !move ? "Go to game start" : "Go to move #" + move;

        return React.createElement(
          "li",
          { key: String(move) },
          React.createElement(
            "button",
            {
              onClick: function onClick() {
                _this4.jumpTo(move);
              }
            },
            desc
          )
        );
      });

      var status = "Next player: " + (this.state.xIsNext ? "X" : "O");

      if (winner) {
        status = "Winner : " + winner;
      } else {
        var sq = current.squares.slice();
        var isDraw = !sq.some(function (el) {
          return el === null;
        });
        if (isDraw) {
          status = "Draw";
        }
      }
      return React.createElement(
        "div",
        { className: "game" },
        React.createElement(
          "div",
          { className: "game-board" },
          React.createElement(Board, {
            squares: current.squares,
            onClick: function onClick(i) {
              _this4.handleClick(i);
            }
          })
        ),
        React.createElement(
          "div",
          { className: "game-info" },
          React.createElement(
            "div",
            null,
            status
          ),
          React.createElement(
            "ol",
            null,
            moves
          )
        )
      );
    }
  }]);

  return Game;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(Game, null), document.getElementById("root"));

function calculateWinner(squares) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (var i = 0; i < lines.length; i++) {
    var _lines$i = _slicedToArray(lines[i], 3),
        a = _lines$i[0],
        b = _lines$i[1],
        c = _lines$i[2];

    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}