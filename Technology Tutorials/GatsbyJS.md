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

### Creating a new Project

```sh
gatsby new [SITE_DIRECTORY_NAME] [URL_OF_STARTER_GITHUB_REPO]
```

If the URL is omited, Gatsby will automatically generate a site based on the [Default Starter Project](https://github.com/gatsbyjs/gatsby-starter-default). 



### Pages

Any React component defined in `src/pages/*.js` will automatically become a page. For example, defining a `src/pages/about.js` will automatically create a page at `http://localhost:8000/about/`

The name of the component does not have to match the name of the file. 



### Components

Components can be defined in the folder `src/components`. 



#### Layout Components

Layout components are for sections of a site that you want to share across multiple pages, such as common header and footer. Sidebar and navigation menu are also common layout components. 



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

It should be noted that this approach is **not recommended**. It is better to add global styles with a shared layout component. 



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

A Gatsby plugin is a JavaScript package that add functionality to a Gatsby site. They can be downloaded and version controlled via NPM like any other packages, and then added to the `gatsby-config.js`. 

Gatsby's Plugin Library: https://www.gatsbyjs.org/plugins/



### Dealing with Data

A Gatsby website consists of four parts: HTML, CSS, JS and data. Data can be considered everything that lives outside a React component. This allows for storing data outside components and bring it to the component as needed. 

Data can lives in CMS such as Wordpress, as well as Markdown, CSV, as well as databases and APIs of all sorts. Gatsby data layer allows pulling data from these directly into components. 

Gatsby's data layer uses GraphQL to pull data into components. 

#### GraphQL

GraphQL is a query language invented at Facebook to help product engineers pull needed data into components. By using special syntax, we can describe the data that we want in components, and then that data would be given.

Gatsby uses GraphQL to enable components to declare the data they need. 

#### GraphiQL

GraphiQL is a tool to structure queries correctly. Technically, it is an IDE for GraphQL. When the Gatsby development server is running, GraphiQL is available at http://localhost:8000/___graphql

#### Page Query

Inside pages, Gatsby can use "page queries" to retrieve data and feed them to the components as follows. 

```jsx
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function About({ data }) {
  return (
    <Layout>
      <h1>About {data.site.siteMetadata.title}</h1>
      <p>
        We're the only site running on your computer dedicated to showing the
        best photos and videos of pandas eating lots of food.
      </p>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

Starting from Gatsby v2, a new API called Static Query has been introduced, allowing non-page components like layouts to retrieve data via GraphQL queries. Internally, the data is retrieved in React via hooks. 

```jsx
import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: 700px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <Link to={`/`}>
        <h3
          css={css`
            margin-bottom: ${rhythm(2)};
            display: inline-block;
            font-style: normal;
          `}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        About
      </Link>
      {children}
    </div>
  )
}
```

#### Source Plugins

Source plugins fetch data from different sources, such as file system, Wordpress, markdown, etc. 

For instance, `gatsby-source-filesystem` provides access to a folder where the Gatsby site is built. 

#### Transformer Plugins

Transformer plugins take raw content from source plugins and transform it into something more usable. 

For example, transformer plugins `gatsby-transformer-remark` can transform markdown into HTML. The following snippet shows that the data has been extracted from all markdown files in the page folder.

```jsx
import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default function Home({ data }) {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}{" "}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
```

#### Generate Pages Programmatically from Data

Creating a page requires two steps:

1. Generate the path of "slug" for the page
2. Create the page itself

Gatsby with GraphQL can be used to create pages directly from the Markdown content. These are done using two Gatsby APIs `onCreateNode` and `createPages`. These methods are declared in a configuration file called `gatsby-node.js` located at the root folder of Gatsby. 

- `onCreateNode()` is called by Gatsby whenever a new node is created or update.
- `createPages()` is an async function called by Gatsby to create additional pages.

The `onCreateNode()` is used to generate and add slugs to the graph node of markdown documents for future retrieval. The `createPages()` then can use this GraphQL and prebuilt templates, which are React components, to generate new pages. 

```jsx
// gatsby-node.js
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// onCreateNode() runs whenever a node is created or changed
exports.onCreateNode = ({ node, getNode, actions }) => {
  // Create node field allows adding extra fields to an existing node
  const { createNodeField } = actions
  // Filter out to work with only MarkdownRemark type of nodes
  if (node.internal.type === `MarkdownRemark`) {
    // Create file path is a function provided by the gatsby source file system plugin
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Gatsby call createPages() to create new upon building
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Note that the component is the React component used to display the post
  // the createPage() function creates a new page with the slug as the path, the component at the React component to display the page, and context is the data passed to be used by the page
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
```

```jsx
// This is the blog post template
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

// Use the graphQL with the slug provided to find the post being displayed
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
```



### Making a Gatsby Site a PWA

#### Add a manifest file

The web app manifest is a simple JSON file that tells the browser about your web application and how it should behave when ‘installed’ on the user’s mobile device or desktop.

In Gatsby, this is generated automatically using the plugin `gatsby-plugin-manifest`

```sh
npm install --save gatsby-plugin-manifest
```

```js
// gatsby-config.js
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
  ]
}
```



#### Add offline support

Another requirement for a website to qualify as a PWA is the use of a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). A service worker runs in the background, deciding to serve network or cached content based on connectivity, allowing for a seamless, managed offline experience.

[Gatsby’s offline plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/) makes a Gatsby site work offline and more resistant to bad network conditions by creating a service worker for your site.

```sh
npm install --save gatsby-plugin-offline
```

```js
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ]
}
```



### Improving SEO performance of Gatsby sites

#### Add page metadata

Adding metadata to pages (such as a title or description) is key in helping search engines like Google understand your content and decide when to surface it in search results.

[React Helmet](https://github.com/nfl/react-helmet) is a package that provides a React component interface for you to manage your [document head](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head)

Gatsby’s [react helmet plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/) provides drop-in support for server rendering data added with React Helmet. Using the plugin, attributes you add to React Helmet will be added to the static HTML pages that Gatsby builds.

Step 1: Install plugins and React library

```sh
npm install --save gatsby-plugin-react-helmet react-helmet
```

Step 2: Add the plugin to the gatsby-config.js

```js
// gatsby-config.js
// Make sure to add title, description, and author to the gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
    description: `A simple description about pandas eating lots...`,
    author: `gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
```

Step 3: make a React component for SEO

```jsx
import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
```

Step 4: Add the SEO component to template and pages.

```jsx
// blog-post.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      excerpt
    }
  }
`
```





## Configurations

### `gatsby-config.js`

#### `pathPrefix`

This configuration is used for when the Website is actually hosted within a the domain rather at the root. 

For example, if the website is hosted at `my-domain.com`, then the prefix is simply `/`, meaning that the website runs at the root. 

However, if the website runs at `my-domain.com/blog`, then the prefix must be set to `/blog`.



#### `siteMetadata`

This part stores arbitrary metadata that is used across the Gatsby website. 



#### `mapping`

Allow us to make mapping between different types of nodes in Gatsby. Consider the following example for more detail. 

For instance, imagine you have a multi-author markdown blog where you want to “link” from each blog post to the author information stored in a YAML file named `author.yaml`:

Blog post:

```markdown
---
title: A blog post
author: Kyle Mathews
---

A treatise on the efficacy of bezoar for treating agricultural pesticide poisoning.
```

Markdown: 

```yaml
- id: Kyle Mathews
  bio: Founder @ GatsbyJS. Likes tech, reading/writing, founding things. Blogs at bricolage.io.
  twitter: "@kylemathews"
```

You can map between the `author` field in `frontmatter` to the id in the `author.yaml` objects by adding to your `gatsby-config.js`:

```js
module.exports = {
  plugins: [...],
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
}
```

You may need to install the appropriate file transformer (in this case [YAML](https://www.gatsbyjs.org/packages/gatsby-transformer-yaml/)) and set up [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/) properly for Gatsby to pick up the mapping files.



#### `plugins`

This attribute contains an array of plugins that implement Gatsby API. Some can be specified using only name, while others require an object that specifies its configurations. See the following examples:

```js
module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/../docs/`,
      },
    },
  ],
}
```

Details about using plugins would be available from their corresponding documentations. 



### `gatsby-browser.js`

This is one of the special files that Gatsby looks for and uses. One of its uses is to import CSS to the pages. 