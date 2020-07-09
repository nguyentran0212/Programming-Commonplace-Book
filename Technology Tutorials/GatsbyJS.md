# Gatsby.js



## Installation of Development Environment

Gatsby is built with Node.js. Therefore, we will need to install `node` and `npm` before getting Gatsby.

Gatsby also uses Git behind the scene to download and install required files. Therefore, `git` should be available on the computer as well. 



### Gatsby CLI

The Gatsby CLI tool is used to create new Gatsby-powered sites and run commands for developing Gatsby sites. It is published as an npm package. 

```sh
# Installing Gatsby CLI
npm install -g gatsby-cli
```



## Gatsby CLI commands

```sh
gatsby <command> [options]
```

Commands:

- `develop` : start development server, watches files, rebuilds, and hot reloads if something changes.
- `build` : build a gatsby project.
- `serve` : serve a previously built Gatsby site.
- `info` : get environment information for debugging and issue reporting.
- `clean` : wipe the local Gatsby environment including built assets and cache
- `repl` : get a node repl with context of Gatsby environment. 
- `new [rootPath] [starter]` : create a new Gatsby project.
- `plugin` : useful commands relating to Gatsby plugins.
- `telemetry` : enable or disable Gatsby anonymous analytics collection.

Options:

- `--verbose` : turn on verbose output
- `--no-color` : turn off the colour in output
- `--json` : turn on JSON logger
- `-h`
- `-v`



## Usage



### Pages

Any React component defined in `src/pages/*.js` will automatically become a page. For example, defining a `src/pages/about.js` will automatically create a page at `http://localhost:8000/about/`

The name of the component does not have to match the name of the file. 



### Components

Components can be defined in the folder `src/components`. 



### Linking between pages

Gatsby defines a `Link` component to handle the linking between its pages. 

Sample code:

```jsx
import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"
export default function Home() {
  return (
    <div style={{ color: `purple` }}>
      <Link to="/contact/">Contact</Link>
      <Header headerText="Hello Gatsby!" />
      <p>What a world.</p>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </div>
  )
}
```



### Styling 

#### Adding global style sheets

This is similar to adding `<link>` to the `index.html` of a `create-react-app`. However, Gatsby can do the import automatically for us. 

First, create a file `gatsby-browser.js` in the root of the project.

Then import the stylesheet:

```jsx
// gatsby-browser.js

import "./src/styles/global.css"
// or:
// require('./src/styles/global.css')
```



#### Using CSS Modules

CSS modules let you write CSS normally, but generate unique class and animation names, so that we don't have to worry about selector name collisions. 

A CSS Module is a CSS file in which all class names and animation names are scoped locally by default. 

Sample code:

```jsx
// src/components/container.js
import React from "react"
// Note the import of .module.css
import containerStyles from "./container.module.css"
export default function Container({ children }) {
  return <div className={containerStyles.container}>{children}</div>
}
```

```css
# src/components/container.module.css
# The name .module.css lets Gatsby know this is a CSS module to compile it differently

.container {
  margin: 3rem auto;
  max-width: 600px;
}
```



#### CSS-in-JS

CSS-in-JS is a component-oriented styling approach, which is commonly used where CSS is composed inline using JavaScript. Material-UI uses this approach. 

Gatsby supports many via plugins, including JSS.

`Typography.js` is a JavaScript library which generates global base styles for typography. It is an example of CSS-in-JS.



### Gatsby Plugins

A Gatsby plugin is a JavaScript package that add functionality to a Gatsby site. 

Gatsby's Plugin Library: https://www.gatsbyjs.org/plugins/



