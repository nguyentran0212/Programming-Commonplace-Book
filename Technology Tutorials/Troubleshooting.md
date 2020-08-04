# Troubleshooting

## Node Sass does not yet support your current environment

The reason is unknown.

The solution is to rebuild `node-sass` module as follows:

```sh
npm rebuild node-sass
```



## Gatsby error involving StoreStateProvider

Error:

```sh
> gatsby clean

The above error occurred in the <StoreStateProvider> component:
    in StoreStateProvider
    in App

React will try to recreate this component tree from scratch using the error boundary you provided, App.
Warning: App: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.
```



Solution:

Use `npm remove` and `npm install` to reinstall these libraries in order:

1. React
2. React-dom
3. Gatsby



## GraphiQL shows no schema

Solution:

Use `npm remove` and `npm install` to reinstall these libraries in order:

1. React
2. React-dom
3. Gatsby



## GraphQL query for all file of Gatsby returns no edge

```js
query MyQuery {
  allFile {
    edges {
      node {
        id
      }
    }
  }
}
```

Even with proper setup inside Gatsby, this query might still return empty if I add the plugin to gatsby without restarting the development server. 

**Solution:** Restart gatsby development server before doing anything else. 



## Hosting on GitHub Page shows a lot of 404 errors on resources

The problem is usually with the prefix path. 

For the University GitHub (github.cs.adelaide.edu.au), I need to set the prefix in Gatsby as follows: /username/repository/; given that I am hosting in a repository. 

**The last / is very important. Without it, the website would not work.**



