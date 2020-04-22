import React from "react";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TableContainer from "../containers/TableContainer";

//import child components
import TableComponent from "../components/TableComponent";

Enzyme.configure({ adapter: new Adapter() });

const mockData = [
  {
    avg: 5200.28,
    city: "North Shirleyfurt",
    id: 1,
    latest: 2652,
    name: "Ernser Group",
    total: 260014
  },
  {
    id: 2,
    name: "Franecki, Torphy and Lesch",
    city: "Port Halle",
    total: 251365,
    avg: 5027.3,
    latest: 7060
  },
  {
    id: 3,
    name: "Franecki, Torphy and Lesch",
    city: "Port Halle",
    total: 251365,
    avg: 5027.3,
    latest: 7060
  },
  {
    id: 4,
    name: "Smitham Group",
    city: "Rennerfort",
    total: 255396,
    avg: 5107.92,
    latest: 3167
  },
  {
    id: 6,
    name: "Towne - Vandervort",
    city: "Cassidyfurt",
    total: 283957,
    avg: 5679.14,
    latest: 1240
  }
];

describe("TblCont", () => {
  test("renders child comps", async () => {
    const wrapper = shallow(<TableContainer />);
    await wrapper.instance().componentDidMount();
    //wrapper.setState({ apiData: mockData, showedFields: mockData });
    const instance = wrapper.instance();
    instance.sortBy("id");
    expect(wrapper.state("apiData")).toBeTruthy();
    expect(wrapper.find(TableComponent).length).toEqual(1);
  });
});
