import React, { Component } from "react";
import axios from "axios";
import UIfx from "uifx";
import bleepAudio from "../audio/bleep.mp3";

import TableComponent from "../components/TableComponent";
import PaginationNav from "../components/PaginationNav";
import SearchComponent from "../components/SearchComponent";

const bleep = new UIfx(bleepAudio, { throttleMs: 60, volume: 0.4 });

/**
 * Container Component.
 * Contains logic for other components of the app.
 * @component
 */
class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCompanies: [],
      tiles: [],
      displayedCompanies: [],
      currentPaginationSection: 0,
      arrow: "id",
      searchedValue: "",
      loading: true,
      searchedCompanysData: []
    };
  }

  /**
   * Gets income data from the api,
   * calculates average, last month, and total income
   * for every company and adds those fields
   * to company object.
   * @property {Object[]} companysData - The objects Object[] w/ companys' info
   * @return {Object[]} companies' data with added income.
   * @public
   */
  addIncomesToData = async companysData => {
    return Promise.all(
      companysData.map(async company => {
        var incomesData = await axios.get(
          `https://recruitment.hal.skygate.io/incomes/${company.id}`
        );
        var incomeValues = incomesData.data.incomes.map(income =>
          parseInt(income.value)
        );
        var totalIncome = incomeValues.reduce((a, b) => a + b);

        var o3 = {
          total: totalIncome,
          avg: totalIncome / incomeValues.length,
          latest: incomeValues[incomeValues.length - 1]
        };

        return Object.assign(company, o3);
      })
    );
  };

  /**
   * Given companies data creates Object[] of objects containing
   * pagination tiles (ie buttons that allow user to navigate the table).
   * Tile is active when it corresponds to a currently displayed data.
   * variable numberOfRowsPerPage can be modified to change the number
   * of entries displayed on each page.
   * @property {Object[]} sortedCompanysdata
   * @return {string[]} tiles - Tiles for navigating pages
   * @public
   */

  cratePaginationTiles = (sortedCompanysdata, activeTile) => {
    if (activeTile < 0 || activeTile > 20) {
      return;
    }
    let tiles = [];
    const numberOfRowsPerPage = 15;
    for (let i = 0; i < sortedCompanysdata.length / numberOfRowsPerPage; i++) {
      let tile = {
        active: i === activeTile ? true : false,
        id: i
      };
      tiles.push(tile);
    }
    return tiles;
  };

  /**
   * Generates rows with each company's data to be displayed on a currently
   * viewed page. Also switches relevant tiles object active property to true.
   * @property {number} id - Current page number
   * @property {Boolean} sorted - Whether data has been sorted or searched.
   * @return {void}
   * @public
   */

  paginateData = async (id, sorted = true) => {
    bleep.play();
    if (id < 0 || id > 20) {
      return;
    }
    let displayedCompanies = sorted
      ? this.state.allCompanies.slice(id * 15, id * 15 + 15)
      : this.state.searchedCompanysData.slice(id * 15, id * 15 + 15);

    let tiles = sorted
      ? this.cratePaginationTiles(this.state.allCompanies, id)
      : this.cratePaginationTiles(this.state.searchedCompanysData, id);

    await this.setState({
      displayedCompanies,
      tiles,
      currentPaginationSection: id,
      loading: false
    });
  };

  /**
   * Sorts array with company objects by the given fields.
   * @property {Object[]} arr - The array to be sorted
   * @property {string} field - Field by which array is to be sorted
   * @public
   */

  quickSort = (arr, field) => {
    if (arr.length <= 1) {
      return arr;
    } else {
      var right = [];
      var left = [];
      var pivot = arr.shift();
      var length = arr.length;

      for (let i = 0; i < length; i++) {
        if (arr[i][field] > pivot[field]) {
          right.push(arr[i]);
        } else {
          left.push(arr[i]);
        }
      }
      return [
        ...this.quickSort(left, field),
        pivot,
        ...this.quickSort(right, field)
      ];
    }
  };

  componentDidMount = async () => {
    const allCompanies = await axios.get(
      "https://recruitment.hal.skygate.io/companies"
    );
    var sortedCompaniesData = this.quickSort(allCompanies.data, "id");
    var sortedCompaniesDataWithIncomes = await this.addIncomesToData(
      sortedCompaniesData
    );

    this.setState({
      allCompanies: sortedCompaniesDataWithIncomes,
      tiles: this.cratePaginationTiles(sortedCompaniesDataWithIncomes, 0)
    });
    this.paginateData(0);
  };

  /**
   * Sort entries by a given field when it is clicked.
   * On second click reverse the order.
   * Arrow variable is passed as a prop to TableComponent and specifies
   * field in which arrow is displayed and it's orientation. Pointing downwards
   * if field is sorted ascending, and upwards otherwise.
   * After sorting it calls the method to paginate newly sorted data.
   * @property {string} field - Field by which data is to be sorted.
   * @return {void}
   * @public
   */

  onClickSortByField = async field => {
    if (this.state.arrow === field) {
      this.setState({
        allCompanies: this.state.allCompanies.reverse(),
        arrow: `${field}Reversed`
      });
    } else {
      await this.setState({
        allCompanies: this.quickSort(this.state.allCompanies, field),
        arrow: field,
        searchInput: ""
      });
    }

    this.paginateData(this.state.currentPaginationSection);
  };

  /**
   * Searches data according to user input.
   * Afterwards call paginateData method.
   * @property {MyEvent} e
   * @return  {void}
   * @public
   */

  searchData = async e => {
    const srch = e.target.value;
    let result = this.state.allCompanies
      .filter(
        o =>
          o.name.toLowerCase().includes(srch.toLowerCase()) ||
          o.city.toLowerCase().includes(srch.toLowerCase()) ||
          String(o.id).includes(srch) ||
          String(o.avg).includes(srch) ||
          String(o.total).includes(srch) ||
          String(o.latest).includes(srch)
      )
      .sort(
        (a, b) =>
          a.name.toLowerCase().indexOf(srch.toLowerCase()) +
          a.city.toLowerCase().indexOf(srch.toLowerCase()) +
          String(a.id).indexOf(srch.toLowerCase()) +
          String(a.avg).indexOf(srch.toLowerCase()) +
          String(a.total).indexOf(srch.toLowerCase()) +
          String(a.latest).indexOf(srch.toLowerCase()) -
          (b.name.toLowerCase().indexOf(srch.toLowerCase()) +
            b.city.toLowerCase().indexOf(srch.toLowerCase()) +
            String(b.id).indexOf(srch.toLowerCase()) +
            String(b.avg).indexOf(srch.toLowerCase()) +
            String(b.total).indexOf(srch.toLowerCase()) +
            String(b.latest).indexOf(srch.toLowerCase()))
      );

    await this.setState({
      searchedCompanysData: result,
      [e.target.name]: e.target.value
    });
    this.paginateData(this.state.currentPaginationSection, false);
  };

  /**
   * Render method
   */

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="loader">Loading...</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="tableWrapper">
            <SearchComponent
              searchData={this.searchData}
              searchedValue={this.state.searchedValue}
            />
            <TableComponent
              displayedCompanies={this.state.displayedCompanies}
              onClickSortByField={this.onClickSortByField}
              arrow={this.state.arrow}
            />
          </div>
          <PaginationNav
            activeTile={this.state.currentPaginationSection}
            tiles={this.state.tiles}
            clickedTile={this.paginateData}
          />
        </div>
      );
    }
  }
}

export default TableContainer;
