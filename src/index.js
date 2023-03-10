import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function calculateWinner(squares) {
  const lines =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (var i=0; i<lines.length; i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
    return (
      <button className="square" onClick = {() => {props.onClick()}} >
        {props.random}
      </button>
    );
  }

  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        values: Array(9).fill(null),
        count: 0,
      };
    }

    handleClick(i) {
      const squares = this.state.values.slice();
      if (calculateWinner(squares)) {
        console.log('We have a winner');
        return;
      }
      var currCount = this.state.count;
      if (squares[i] != null) {
        console.log('this square is already occupied');
        return;
      }
      squares[i] = currCount % 2 === 0 ? 'X' : 'O';

      this.setState({values: squares, count: currCount+1});

      console.log('count {}', this.state.count);
      console.log('after {}',this.state.values);
    }

    renderSquare(i) {
      return  <Square random ={this.state.values[i]}
                      onClick = {() => this.handleClick(i)}/>;
    }
  
    render() {
      const winner = calculateWinner(this.state.values);
      var status;
      if (winner) {
        status = 'Winner is ' + winner;
      } else {
        var nextPlayer = this.state.count % 2 === 0 ? 'X' : 'O';
        status = 'Next player: ' + nextPlayer;
      }

      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

  
  