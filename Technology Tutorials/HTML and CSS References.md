# HTML and CSS References

## HTML

### `<span>` tag

The HTML `<span>` tag is an inline container used to mark up a part of a text, or a part of a document. The reason why it is used is because it makes it easier to style with CSS or manipulate with JS using class or id attribute. 

Think of it as the inline equivalent of `<div>`.

**Example**: 

```html
<p>My mother has <span style="color:blue">blue</span> eyes.</p>
```



### `<label>` tag

The `<label>` tag defines a label for different types of `<input>` element as well as `<textarea>` and other types of HTML form elements. 

To link label with its `<input>`, the label must either:

- Have the attribute `for` the same as the attribute `id` of `<input>` or...
- Contain the `<input>` 

**Tip:** Always use the `<label>` tag to define labels for `<input type="text">`, `<input type="checkbox">`, `<input type="radio">`, `<input type="file">`, and `<input type="password">`.

**Example**:

```html
<form action="/action_page.php">
  <label for="male">Male</label>
  <input type="radio" name="gender" id="male" value="male"><br>
  <label for="female">Female</label>
  <input type="radio" name="gender" id="female" value="female"><br>
  <label for="other">Other</label>
  <input type="radio" name="gender" id="other" value="other"><br><br>
  <input type="submit" value="Submit">
</form>
```

**Alternative**:

```jsx
<label className="checkbox">
  <input
    type="checkbox"
    defaultChecked={state === 'TASK_ARCHIVED'}
    disabled={true}
    name="checked"
    />
  <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
</label>
```



### `<input>` tag

The `<input>` tag specifies an input field where user can enter data. It is the most important form element. This element can be displayed differently, depending on its `type` attribute.

`<input type="button">` : Clickable button, mostly to activate a JS function.



`<input type="checkbox">` : Define a checkbox.



` <input type="color">` :  Define a color picker.



`<input type="date">` : Define a date control (i.e., year, month, day, no time)



`<input type="datetime-local">` : Define a date and time control (i.e., year, month, day, time, no time zone)



`<input type="email">` : Define a field for email address.



`<input type="file">` :  Define a field for file selection and a browse button. It is used for uploading files. 



`<input type="hidden">` : Define a hidden input field.



`<input type="image">` : Define an image as the submit button.



`<input type="month">` : Define a month and year control (no timezone)



`<input type="number">` : Define a field for entering a number.



`<input type="password">` :  Define a field for entering password



` <input type="radio">` : Define a radio button. Radio buttons allow user to select only one of a limited number of choices. Thus, radio buttons operate as a **group**.

Radio buttons of the **same group must have the same name**.

**Example**:

```html
<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label><br>
<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label><br>
<input type="radio" id="other" name="gender" value="other">
<label for="other">Other</label>
```



`<input type="range">` :  Define a range control, such as a slider.

**Example**:

```html
<label for="points">Points (between 0 and 10):</label>
<input type="range" id="points" name="points" min="0" max="10">
```



`<input type="reset">` :  Define a reset button.



`<input type="search">` : Define a text field for entering search string.



`<input type="submit">` : Define a submit button for a form.



`<input type="tel">` :  Define a field for entering telephone numbers.



`<input type="text">` (default value) Define a field for entering sinble-line text.



`<input type="time">` Define a control for entering a time (no timezone)



`<input type="url">` : Define a field for entering URL.



`<input type="week">` : Define a week and year control (no timezone)



## CSS

### CSS Units

CSS uses various types of units to express a length. These length values are used in various CSS properties, such as `width`, `margin`, `padding`, `font-size`, etc.

There are two types of length: absolute and relative. 



#### Absolute Lengths

The absolute length units are fixed, and thus a length expressed by any of these units will appear as exactly that size. This kind of unit is not recommended for screens, because screen sizes vary. 

- cm: centemeters
- mm: milimeters
- in: inches (1in = 96px = 2.54cm)
- px: pixels (1px = 1/96 of 1in)
- pt: points (1pt = 1/72 of 1in)
- pc: picas (1pc = 12pt = 1/6 of 1in)



#### Relative Lengths

Relelative length units specify length relative to another length property. Thus, they scale better between rendering medium

- em: Relative to the font-size of the element (2em means 2 times the size of the current font)
- ex: Relative to the x-height of the current font
- ch: relative to th width of "0"
- rem: relative to to the font-size of the root element
- vw: relative to 1% of the width of the viewport, which is browser window size.
- vh: relative to 1% of the height of the viewport
- vmin: relative to the 1% of the viewport's smaller dimention
- vmax: relative to the 1% of the viewport's larger dimension
- %: relative to the parent element

`em` and `rem` are practical in creating salable layouts. 



### Text Overflow

Sometimes, the text content of of an HTML element overflows its size. Uses the following attribute to show the overflown text as ellipsis (...):

```css
textOverflow: 'ellipsis'
```





