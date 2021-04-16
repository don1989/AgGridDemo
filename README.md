# AgGridDemo

## To reproduce the flashing row issue:

Open up the project in Visual Studio Code

### In a terminal:

cd ag-grid-demo

npm install (this will install ag-grid-community@25.0.1)

npm start


### In the browser:

Select 'New Order'

Notice that the new order is not flashed on screen.

Quit the app from VS code.

### In the terminal:

npm install ag-grid-community@24.1.0 ag-grid-react@24.1.0

npm start

### In the browser:

Select 'New Order'

Notice that the flash is displayed in the new order.
