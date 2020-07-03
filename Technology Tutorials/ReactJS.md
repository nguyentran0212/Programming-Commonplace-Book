# React JS

React is a Javascript library for building user interfaces. At its core, React provides a declarative library that keeps the DOM in sync with data. 



## Installation

### Website

These details are valid on 3/7/2020

#### Step 1: Add a DOM container to the HTML

```html
<!-- ... existing HTML ... -->

<div id="like_button_container"></div>

<!-- ... existing HTML ... -->
```



#### Step 2: Add the Script Tags

Add 3 script tags to the HTML page right before the closing of body tag.

```html
  <!-- ... other HTML ... -->

  <!-- Load React. -->
  <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- Load our React component. -->
  <script src="like_button.js"></script>

</body>
```



#### Step 3: Create a React Component

Create a file name ``like_button.js`` next to the HTML page. Content of this file is as follows:

```js
'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```



### Using Toolchains

React App development can be supported by integrated toolchains. These toolchains help with the follow tasks:

- Scalling to many files and components
- Using third-party libraries from npm
- Detecting common mistakes early
- Live-editing CSS and JS in development
- Optimizing the output for production



Elements of a JS toolchain:

- Package manager (Yarn, npm)
- Bundler (Webpack, Parcel) to bundle modular node into small packages to optimize load time. 
- Compile (Babel) to compile modern JS code for older browsers, and support new features such as JSX used by React. 



#### Create React App (CRA)

CRA is recommended for learning React and building new single-page applications in React.

A single-page application is an application that loads a single HTML page with all necessary assets, such as JavaScript and CSS. Any interactions with the page or subsequent pages to no require a round trip to the server, which means the page is not reloaded. 

```sh
npx create-react-app my-app
cd my-app
npm start
```



#### Next.js

Next.js is a lightweight framework for static and server-rendered applications built with React. It includes styling and routing solutions out of the box and assumes that we use Node.js as the server environment. 



#### Gatsby

Gatsby is a framework for creating static websites with React. It lets us use React components, but outputs pre-rendered HTML and CSS to guarantee the fastest load time. 



### CDN Links

For development: 

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

For production:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```



## Main Concepts of React

### JSX

JSX is a syntax extension to JavaScript, used by React to describe what the UI component should look like. Technically, each JSX creates a React element (object?). After compilation by Babel, JSX becomes regular function calls to `React.createElement()`, which evaluate to JS objects. 

Expressions can be embedded in JSX using curly braces.

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```



### Rendering Elements

An element describes what we can see on the screen. We use `React DOM` to render an element into the `DOM` of an HTML document.

```jsx
// Suppose that we have a Div named "root" in the HTML
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

React elements are immutable after creation. Thus, the only way to update UI is to create a new element and pass it to the `ReactDOM.render()`. Only changes are updated to the DOM, not the entire tree. 



### Components and Props

The purpose of components is spliting the UI into independent, reusable pieces, so that we can think of each piece if isolation. 

Conceptually, components are like JS functions. They accept arbitrary inputs (i.e., "props") and return React elements. 

Components can be specified as functions:

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Alternatively, components can be specified as ES6 classes:

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Properties passed to components are immutable. Thus, all React components must act like pure functions with respect to their props. 

Sample code:

```jsx
// Define components
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  // Notice the use of Welcome as the tag
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```



### State and Lifecycle

Each React component has an internal `state` object. This object is private and fully controlled by the component. 

Sample code:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props); // Must always call super(props)
    this.state = {date: new Date()}; // the internal state of this component 
  }

  // This function is called after the component has been rendered to DOM
  componentDidMount() {
    // Call the tick() function every second
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // This function is called when the component would be removed from DOM
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

	// This function update the internal state of the component  
  tick() {
    // MUST USE setState()
    // setState() automatically invokes render()
    this.setState({
      date: new Date()
    });
  }
  
  render() {
    // Notice the use of this.state.date.toLocaleTimeString()
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```



#### Data Flows Down

Only a component knows and access its internal state. . It an pass this information down to its children as props. This approach is called "top-down" data flow. 

Sample code: 

```jsx
// Suppose that we are in the parent component code

// Define a new component with a props having attribute "date"
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
// Pass the this.state.date as the props of the child component
<FormattedDate date={this.state.date} />

```



### Handling Events

Sample code using Class definition of components:

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

Sample code using Function definition of components:

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

Sample code for passing arguments to the Event handlers:

```jsx
// e represents the React event and id represent the arguments
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```



### Lists and Keys in React

We can build collections of elements, store them in variables, and include them in JSX using curly braces.

Keys help React identify which items that have been changed, added, or removed. 

Code sample:

```jsx
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

// This component receives a list of numbers from props and create a list element
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```



### Controlled Components and Forms

HTML forms naturally keep some internal state. Therefore, React has to take over the internal state of the HTML elements. It means that the React components rendering form elements also control what happen with those elements on subsequent user input. 

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // notice the event.target.value
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    // Notice how this React component controls the value of the <input type="text">
    // Also notice the use of this.handleChange
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Handling React form elements can be tedious. It is better to rely on solutions such as Formik: https://jaredpalmer.com/formik



### Lifting State Up

When several components need to reflect the same changing data, their shared state should be lifted up to their closest common ancestor. 



Procedure of lifting the state:

- Move the state from the child component to the parent component
- Define the handler functions in the parent component to change the state
- The parent component passes that state information to the child components via props
- The parent component passes the handler function to the child components via props
- The child component uses the passed handler to handle events and passed props to render its content.



Code sample:

```jsx
// The calculator component is the parent component
// It aims to keep both input fields, representing celcius and fahrenheit in sync
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    // The temperature in both c and f is maintained as the state of the calculator component
    this.state = {temperature: '', scale: 'c'};
  }
	// Re-render components when there are changes
  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }
  // During the rendering of the calculator component, new child components (i.e., temperature inputs) are rendered with new props, which come from the state information of the calculator
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

// Temperature Input is the child component
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // Noted that the function to handle the event is passed by the parent component via props
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    // Noted that the values representing the state of this component are also passed by its parent via props
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```



### Composition of Components

#### Containment

Some generic components such as `Sidebar` or `Dialog` do not know their children in advance. In this case, they can use `props.children` to pass children elements directly into their output:

```jsx
// Containing element
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
// Contained element
function WelcomeDialog() {
  // The <h1> and <p> are passed as props.children
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```



#### Specialization

Some components might be special cases of other components. In React, this can be done by having the more specific components render a more "generic" component and configures it with props.

```jsx
// This is generic component
function Dialog(props) {
  return (
    // Note that props.title, props.message, and props.children allow specialising the component
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

// This is specific component
class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      // <input> and <button> will be passed to props.children
      // title and message are passed to props.title and props.message
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```



## Thinking in React

Steps to design a React app:

1. Start with a Mock of the interface and the sample data (e.g., JSON)
2. Break the UI into a component hierarchy. Single responsibility principle can be a starting point. 
3. Build a static version in React. Don't use any state, only props. 
4. Identify the minimal (but complete) Representation of UI State. Use the DRY principle as the starting point. 
5. Identify where your state should live.
6. Add Inverse Data Flow (i.e., lifting the state information up from the bottom of the hierarchy)



Questions to determine if a piece of data is a state:

1. Is is passed from a parent via props? If so, it probably isn't state.
2. Does it remain unchanged over time? If so, it probably isn't state.
3. Can you compute it based on any other state or props in your component? If so, it isn't state. 



How to determine the position of state:

1. Identify every component that renders something based on that state
2. Find common owner component of those components
3. Either the common owner or a component higher up should own the state
4. If you cannot find a component, you can create new component solely for holding the state



## Hooks

Hooks are new addition to React 16.8. They allow using state and other React features without writing a class. 

Hooks are functions that "hook into" React state and lifecycle features from function components. Thus, they don't work inside classes. We can create our own Hooks to reuse stateful behaviour between different components. 

TBA



## Design Patterns for React

### Render Props

TBA

### Higher-Order Components

TBA



