# Libraries for DAG in React

## react-digraph

Link: https://github.com/uber/react-digraph

This is a React component to create a directed graph editor, developed and open-source by Uber.

### Usage

The default export is a component called `GraphView`; it provides a multitude of hooks for various graph editing operations and a set of controls for zooming. Typically, it should be wrapped in a higher order component that supplies various callbacks (`onCreateNode`, `onCreateEdge` etc...).

`GraphView` expects several properties to exist on your nodes and edges. If these types conflict with existing properties on your data, you must transform your data to re-key these properties under different names and to add the expected properties. All nodes and edges can have a `type` attribute set - nodes also support a `subtype`attribute. For a full description of node and edge properties, see the sections for `INode` and `IEdge` below.

Configuration for nodes and edges can be passed to `GraphView` via the `nodeTypes`, `nodeSubtypes`, and `edgeTypes` props. Custom SVG elements can be defined here for the node's type/subtype and the edge's type.

It is often convenient to combine these types into a configuration object that can be referred to elsewhere in the application and used to associate events fired from nodes/edges in the `GraphView` with other actions in the application.

### Installation

```sh
npm install --save react-digraph
```

If you don't have the following peerDependenies, make sure to install them:

```sh
npm install --save react react-dom
```

### Usage samples

```javascript
import {
  GraphView, // required
  Edge, // optional
  type IEdge, // optional
  Node, // optional
  type INode, // optional
  type LayoutEngineType, // required to change the layoutEngineType, otherwise optional
  BwdlTransformer, // optional, Example JSON transformer
  GraphUtils // optional, useful utility functions
} from 'react-digraph';

const GraphConfig =  {
  NodeTypes: {
    empty: { // required to show empty nodes
      typeText: "None",
      shapeId: "#empty", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="empty" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      )
    },
    custom: { // required to show empty nodes
      typeText: "Custom",
      shapeId: "#custom", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 50 25" id="custom" key="0">
          <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
        </symbol>
      )
    }
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {  // required to show empty edges
      shapeId: "#emptyEdge",
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
          <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
        </symbol>
      )
    }
  }
}

const NODE_KEY = "id"       // Allows D3 to correctly update DOM

class Graph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      graph: sample,
      selected: {}
    }
  }

  /* Define custom graph editing methods here */

  render() {
    const nodes = this.state.graph.nodes;
    const edges = this.state.graph.edges;
    const selected = this.state.selected;

    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;

    return (
      <div id='graph' style={styles.graph}>

        <GraphView  ref='GraphView'
                    nodeKey={NODE_KEY}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
                    nodeTypes={NodeTypes}
                    nodeSubtypes={NodeSubtypes}
                    edgeTypes={EdgeTypes}
                    onSelectNode={this.onSelectNode}
                    onCreateNode={this.onCreateNode}
                    onUpdateNode={this.onUpdateNode}
                    onDeleteNode={this.onDeleteNode}
                    onSelectEdge={this.onSelectEdge}
                    onCreateEdge={this.onCreateEdge}
                    onSwapEdge={this.onSwapEdge}
                    onDeleteEdge={this.onDeleteEdge}/>
      </div>
    );
  }

}
```



## react-dag

Link: https://github.com/ajainarayanan/react-dag

React wrapper for jsplumb. Helps in rendering a Directed Acyclic Graph.

### Installation

```sh
npm install react-dag
```

### Usage

```javascript
import ReactDAG from "react-dag";
  class MyComponent extends Component {
    ...
    render() {
      return (
        <ReactDAG
          nodes={cloneDeep(this.state.nodes)}
          connections={cloneDeep(this.state.connections)}
          jsPlumbSettings={defaultSettings}
          connectionDecoders={[
            transformConnectionDecoder,
            conditionConnectionDecoder,
          ]}
          connectionEncoders={[
            transformConnectionEncoder,
            conditionConnectionEncoder,
          ]}
          onChange={({
            nodes: n,
            connections: c,
          }: {
            nodes: INode[];
            connections: IConnectionParams[];
          }) => {
            this.setState({ nodes: n, connections: c });
          }}
          eventListeners={eventListeners}
          registerTypes={registerTypes}
          zoom={this.state.zoom}
        >
          {this.state.nodes.map((node, i) => {
            const Component = getComponent(node.config ? node.config.type : "");
            return <Component key={i} id={node.id} />;
          })}
        </ReactDAG>
      );
    }
  }
```

## react-d3-graph

Link: https://github.com/danielcaldas/react-d3-graph

Interactive and configurable graphs with react and d3 effortlessly.

### Installation

```sh
npm install d3@^5.5.0      # if you don't have d3 already
npm install react@^16.4.1  # if you don't have react already

npm install react-d3-graph
```

### Usage Sample

Graph component is the main component for react-d3-graph components, its interface allows its user to build the graph once the user provides the data, configuration (optional) and callback interactions (also optional).

```javascript
import { Graph } from "react-d3-graph";

// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" },
    ],
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "lightgreen",
        size: 120,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    },
};

// graph event callbacks
const onClickGraph = function() {
    window.alert(`Clicked the graph background`);
};

const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
};

const onDoubleClickNode = function(nodeId) {
    window.alert(`Double clicked node ${nodeId}`);
};

const onRightClickNode = function(event, nodeId) {
    window.alert(`Right clicked node ${nodeId}`);
};

const onMouseOverNode = function(nodeId) {
    window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
    window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function(event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
    window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
    window.alert(`Mouse out link between ${source} and ${target}`);
};

const onNodePositionChange = function(nodeId, x, y) {
    window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
};

<Graph
    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    data={data}
    config={myConfig}
    onClickNode={onClickNode}
    onDoubleClickNode={onDoubleClickNode}
    onRightClickNode={onRightClickNode}
    onClickGraph={onClickGraph}
    onClickLink={onClickLink}
    onRightClickLink={onRightClickLink}
    onMouseOverNode={onMouseOverNode}
    onMouseOutNode={onMouseOutNode}
    onMouseOverLink={onMouseOverLink}
    onMouseOutLink={onMouseOutLink}
    onNodePositionChange={onNodePositionChange}
/>;
```

