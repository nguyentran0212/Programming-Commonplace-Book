# Excel Tricks

## Exporting Tab Delimited Files

To export tab delimited files with excel, choose the format `Tab delimited file (.txt)` when `Save As` a file. Using the `csv` option would create comma delimited files. 



## Split Text in a Cell

We can split the text into parts using a delimiter and capture a part of that text using the following formula

```sh
# Get the first word of the text
=LEFT(A2, SEARCH(" ",A2,1))

# Get the last word of the text
=RIGHT(A2,LEN(A2)-SEARCH(" ",A2,1))
```



Some important excel functions:

- `Search([delimiter], [text], [starting location])`
- `LEFT([text to extract], [number of characters to extract])`
- `RIGHT([text to extract], [number of characters from the right])`



## Combine texts and values

We can combine different content together to form the content of a cell using `&`

