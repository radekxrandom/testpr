import React, { Component } from "react";
import axios from "axios";
import TableComponent from "../components/TableComponent";
import PaginationNav from "../components/PaginationNav";
import SearchComponent from "../components/SearchComponent";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: "1", name: "naem", total: 12, avg: 5, last: 3 },
        { id: "2", name: "eams", total: 15, avg: 2, last: 4 }
      ],
      apiData: [],
      bool: false,
      tiles: [],
      showedFields: [],
      activePag: 0,
      arrow: "id",
      searchedPhrase: "",
      searchInput: "",
      loading: true
    };
  }

  asd = async arr => {
    return Promise.all(
      arr.map(async obj => {
        var objInc = await axios.get(
          `https://recruitment.hal.skygate.io/incomes/${obj.id}`
        );
        var values = objInc.data.incomes.map(obj => parseInt(obj.value));
        var totalInc = values.reduce((a, b) => a + b);
        var o3 = {
          total: totalInc,
          avg: totalInc / values.length,
          latest: values[values.length - 1]
        };
        return Object.assign(obj, o3);
      })
    );
  };

  paginate = id => {
    let showedFields = this.state.apiData.slice(id * 15, id * 15 + 15);
    let tiles = this.state.tiles.map(tile => {
      if (tile.id === id) {
        tile.active = true;
      }
      if (tile.id !== id) {
        tile.active = false;
      }
      return tile;
    });

    this.setState({
      showedFields,
      tiles,
      activePag: id,
      loading: false
    });
  };

  createTiles = sortedCompaniesData => {
    let tiles = [];
    for (let i = 0; i < sortedCompaniesData.length / 15; i++) {
      let tile = {
        clName: i === 1 ? "active" : "disabled",
        id: i
      };
      tiles.push(tile);
    }
    return tiles;
  };

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
    const apiData = await axios.get(
      "https://recruitment.hal.skygate.io/companies"
    );
    console.log("got data");
    var sorted = this.quickSort(apiData.data, "id");
    console.log("sorted ok");
    var ugh = await this.asd(sorted);
    console.log("added monies");

    this.setState({
      apiData: ugh,
      tiles: this.createTiles(ugh)
    });
    this.paginate(0);
  };

  sortBy = async field => {
    if (this.state.arrow === field) {
      this.setState({
        apiData: this.state.apiData.reverse()
      });
    } else {
      await this.setState({
        apiData: this.quickSort(this.state.apiData, field),
        arrow: field
      });
    }

    this.paginate(this.state.activePag);
  };

  handleInput = async e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    const srch = e.target.value;
    let result = this.state.apiData
      .filter(o => o.includes(srch.toLowerCase()))
      .sort(
        (a, b) => a.indexOf(srch.toLowerCase()) - b.indexOf(srch.toLowerCase())
      );
    await this.setState({
      apiData: result
    });
    this.paginate(this.state.activePag);
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div class="loader">Loading...</div>
        </div>
      );
    } else {
      return (
        <div>
          <SearchComponent handleInput={this.handleInput} />
          <TableComponent
            rowObjects={this.state.showedFields}
            sortBy={this.sortBy}
            arrow={this.state.arrow}
          />
          <PaginationNav tiles={this.state.tiles} clickedTile={this.paginate} />
        </div>
      );
    }
  }
}

export default TableContainer;
