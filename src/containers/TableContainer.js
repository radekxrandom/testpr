import React, { Component } from "react";
import axios from "axios";
import TableComponent from "../components/TableComponent";
import PaginationNav from "../components/PaginationNav";

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
      arrow: "id"
    };
  }

  prom = inc => {
    return Promise.resolve("ok");
  };

  getData = async id => {
    let inc = await axios.get(
      `https://recruitment.hal.skygate.io/incomes/${id}`
    );
    return this.prom(inc);
  };

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
      activePag: id
    });
  };

  componentDidMount = async () => {
    console.log("It mounted ok");
    const apiData = await axios.get(
      "https://recruitment.hal.skygate.io/companies"
    );
    var sorted = apiData.data.sort((a, b) => (a.id > b.id ? 1 : -1));
    var ugh = await this.asd(sorted);
    let tiles = [];
    for (let i = 0; i < ugh.length / 15; i++) {
      let tile = {
        clName: i === 1 ? "active" : "disabled",
        id: i
      };
      tiles.push(tile);
    }
    this.setState({
      apiData: ugh,
      tiles: tiles
    });
    this.paginate(0);
  };

  sortBy = field => {
    if (field === "id") {
      console.log("id");
      this.setState({
        apiData:
          this.state.apiData[0].id === 1
            ? this.state.apiData.sort((a, b) => (a.id > b.id ? -1 : 1))
            : this.state.apiData.sort((a, b) => (a.id > b.id ? 1 : -1)),
        arrow: "id"
      });
    } else if (field === "name") {
      this.setState({
        apiData:
          this.state.apiData[0].name < this.state.apiData[1].name
            ? this.state.apiData.sort((a, b) => (a.name > b.name ? -1 : 1))
            : this.state.apiData.sort((a, b) => (a.name > b.name ? 1 : -1)),
        arrow: "name"
      });
    } else if (field === "city") {
      this.setState({
        apiData:
          this.state.apiData[0].city < this.state.apiData[1].city
            ? this.state.apiData.sort((a, b) => (a.city > b.city ? -1 : 1))
            : this.state.apiData.sort((a, b) => (a.city > b.city ? 1 : -1)),
        arrow: "city"
      });
    } else if (field === "total") {
      this.setState({
        apiData:
          this.state.apiData[0].total < this.state.apiData[1].total
            ? this.state.apiData.sort((a, b) => (a.total > b.total ? -1 : 1))
            : this.state.apiData.sort((a, b) => (a.total > b.total ? 1 : -1)),
        arrow: "total"
      });
    } else if (field === "avg") {
      this.setState({
        apiData:
          this.state.apiData[0].avg < this.state.apiData[1].avg
            ? this.state.apiData.sort((a, b) => (a.avg > b.avg ? -1 : 1))
            : this.state.apiData.sort((a, b) => (a.avg > b.avg ? 1 : -1)),
        arrow: "avg"
      });
    } else if (field === "latest") {
      this.setState({
        apiData:
          this.state.apiData[0].latest < this.state.apiData[1].latest
            ? this.state.apiData.sort((a, b) => (a.latest > b.latest ? -1 : 1))
            : this.state.apiData.sort((a, b) => (a.latest > b.latest ? 1 : -1)),
        arrow: "latest"
      });
    }
    this.paginate(this.state.activePag);
  };

  render() {
    if (!this.state.showedFields.length) {
      return null;
    } else {
      return (
        <div>
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
