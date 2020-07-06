# Create-React-App and MUI dashboard example

This project is my sample for learning how to use MUI with the dashboard example from MUI. 

The sample dashboard is defined in the file `/src/Dashboard.js`, which imports several other files. This component serves as a good example to learn how to compile complex components from its constituting components. 

## Known issues

### Missing modules

#### `Module not found: Can't resolve '@material-ui/icons/Assignment'`

The example is not shipped with the `@material-ui/icons`. The solution is to add this dependency to the `package.json` and install it. 

#### `Module not found: Can't resolve 'recharts'`

This example also lacks the dependencies to the `recharts` module. The solution it adding it to the `package.json` and run `npm install`.

