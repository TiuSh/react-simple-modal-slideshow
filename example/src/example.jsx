import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Example1 from './example1.jsx';
import Example2 from './example2.jsx';
import Example3 from './example3.jsx';
import Example4 from './example4.jsx';

const examples = {
  example1: {
    component: Example1,
    name: 'Default theme',
  },
  example2: {
    component: Example2,
    name: 'With content',
  },
  example3: {
    component: Example3,
    name: 'Zoom animation',
  },
  example4: {
    component: Example4,
    name: 'Using API',
  },
};

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      example: 'example1',
    };
  }

  componentDidMount() {
  }

  handleSelect(event) {
    this.setState({
      example: event.target.value,
    });
  }

  render() {
    const CurrentExample = examples[this.state.example].component;

    return (
      <div>
        <h2>
          React simple modal slideshow
        </h2>
        <div style={{ textAlign: 'right', marginBottom: 24 }}>
          <div>
            Choose a demo : &nbsp;
            <select onChange={::this.handleSelect}>
              {Object.keys(examples).map(value => (
              <option key={value} value={value}>{examples[value].name}</option>
              ))}
            </select>
          </div>
          <div>
            <a target="_blank" href={`https://github.com/TiuSh/react-simple-modal-slideshow/blob/master/example/src/${this.state.example}.jsx`}>
              View JS
            </a>
            &nbsp;
            <a target="_blank" href={`https://github.com/TiuSh/react-simple-modal-slideshow/blob/master/example/src/${this.state.example}.scss`}>
              View SASS
            </a>
          </div>
        </div>
        <CurrentExample />
      </div>
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('example-root')
);

