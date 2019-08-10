import React, { PureComponent } from 'react';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  data = this.props.savedData || [];
  state = {
    inputValue: ''
  };

  getId(savedData) {
    const biggest = savedData
      ? savedData.reduce((acc, el) => Math.max(acc, el.id), 0)
      : 0;
    return biggest + 1;
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  createNewRecordByEnter = event => {
    if (event.key === 'Enter') {
      this.createNewRecord();
    }
  };

  toggleRecordComplete = event => {
    const elem = event.target;
    let indexElem;

    elem.innerText = event.target.innerText === '[ ]' ? '[x]' : '[  ]';

    this.data.forEach((elem, index) => {
      if (elem.id === Number(event.target.dataset.todoId)) indexElem = index;
    });

    if (indexElem !== undefined) {
      this.data[indexElem].isComplete = !this.data[indexElem].isComplete;
      this.props.saveData(this.data);
    }
  };

  createNewRecord = () => {
    if (this.state.inputValue === '') return null;

    const id = this.getId(this.data);

    this.data.push({ id, isComplete: false, text: this.state.inputValue });
    this.props.saveData(this.data);
    this.setState({ inputValue: '' });
  };

  render() {
    const newRecord = this.renderEmptyRecord();

    return (
      <React.Fragment>
        {newRecord}
        {this.data.map(elem => (
          <TodoItem
            key={elem.id}
            id={elem.id}
            text={elem.text}
            isComplete={elem.isComplete}
            toggleRecordComplete={this.toggleRecordComplete}
          />
        ))}
      </React.Fragment>
    );
  }

  renderEmptyRecord() {
    return (
      <div className="todo-item todo-item-new">
        <input
          className="todo-input t-input"
          placeholder="Введите задачу"
          value={this.state.inputValue}
          onChange={this.handleChange}
          onKeyDown={this.createNewRecordByEnter}
        />
        <span className="plus t-plus" onClick={this.createNewRecord}>
          +
        </span>
      </div>
    );
  }

  renderRecord = record => {
    return;
  };
}
function TodoItem(props) {
  return (
    <div className="todo-item t-todo">
      <p className="todo-item__text">{props.text}</p>
      <span
        className="todo-item__flag t-todo-complete-flag"
        data-todo-id={props.id}
        onClick={props.toggleRecordComplete}
      >
        [{props.isComplete ? 'x' : '  '}]
      </span>
    </div>
  );
}

export default withLocalstorage('todo-app', [])(Todo);
// export default Todo;
