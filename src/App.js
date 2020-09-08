"use strict";

const e = React.createElement;

const Square = (props) => {
  return (
    <button
      className="square"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick = (i) => {
    const hist = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = hist[hist.length - 1];
    const sq = current.squares.slice();

    if (calculateWinner(sq) || sq[i]) {
      return;
    }

    sq[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: hist.concat([
        {
          squares: sq,
        },
      ]),
      stepNumber: hist.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  jumpTo = (move) => {
    console.log("jumped to " + move);
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 === 0,
    });
  };

  render() {
    const hist = this.state.history;
    const current = hist[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = hist.map((element, move) => {
      const desc = !move ? "Go to game start" : "Go to move #" + move;

      return (
        <li key={String(move)}>
          <button
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;

    if (winner) {
      status = "Winner : " + winner;
    } else {
      const sq = current.squares.slice();
      const isDraw = !sq.some((el) => {
        return el === null;
      });
      if (isDraw) {
        status = "Draw";
      }
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {
              this.handleClick(i);
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
