import React, { PureComponent } from 'react';
import './App.css';
import Todo from '../Todo';
import Card from '../Card';

class App extends PureComponent {
  render() {
    return (
      <main className="main">
        <div className="main__cell">
          <Card title="Список дел">
            <div className="todo t-todo-list">
              <Todo />
            </div>
          </Card>
        </div>
      </main>
    );
  }
}

export default App;
