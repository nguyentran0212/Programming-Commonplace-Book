# Interesting JS Libraries

This document contains a list of interesting and useful JS libraries that I have used or seen other people using. 



## Typography.js

**URL**: https://kyleamathews.github.io/typography.js/

**What is it:** Typography.js provides a vastly simpler way to define and explore typography designs. You provide configuration to the Typography.js JS api and it uses its Typography engine to generate CSS for block and inline elements.

**Motivation:** Typography is a complex *system* of interrelated styles. 100s of style declarations on dozens of elements must be in harmonious order. Trying one design change can mean making dozens of tedious recalculations and CSS value changes. Creating new Typography themes with CSS feels hard. Typography.js provides a vastly simpler way to define and explore typography designs.

**Themes and plugins:**

- **themes**: Typography.js themes are simple Javascript objects. As such they’re easy to share across projects or even [open source and share via NPM](https://www.npmjs.com/browse/keyword/typography-theme).
- **plugins**: Plugins are functions that extend or modify the core Typography engine. They can change how headers are styled or add specialized styles e.g. for code or tables.

```js
import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
  // See below for the full list of options.
})

// Output CSS as string.
typography.toString()

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles()
```



```js
// Using theme
import Typography from 'typography'
import funstonTheme from 'typography-theme-funston'

const typography = new Typography(funstonTheme)
```

