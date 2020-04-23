# Recruitment test

Website written in React that fetches and displays table of companies.
First click on the column header sorts the table ascending by given field, second click sorts in reverse order.
Users have the option to search through the data with included search bar.

![sc](https://i.imgur.com/ipAElqu.png)

# Components

## Class Components

### TableContainer

Container Component which contains the logic for presentational components. Parent component of the components mentioned below. It performs data fetching from the api and sorts it (using quicksort) by id on default.
On user action it performs sorting data by a given field (either ascending or descending) or searches through it and then passes the result as props to presentational component.

## Function Components

There are three presentational function components. They all render html with the props passed from their parent container component.

### SearchComponent

Renders input field for the searched phrase.
Props passed:

- searchData - function that gets called onChange event and performs search
- searchedValue - string, value (typed by the user) by which data is searched

### PaginationNav

Renders tiles that enable users to navigate through the pages of the table.
Props passed:

- tiles - Array of objects that contains tiles to display. Each tile has and id attribute and active attribute which is a boolean. When tile.active is true the given tile has class 'active' otherwise the class is 'disabled'.

### TableComponent

Renders the table with company's data passed as props from parent component.
Props passed:

- displayedCompanies - Array of objects with the data of companies to display.
- onClickSortByField - Function that gets called when th element (ie column header) is clicked. It passes the column name as an argument and sorts data by given field.

For more information refer to the docs folder.
