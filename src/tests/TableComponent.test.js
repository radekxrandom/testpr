import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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
    id: 2,
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

describe("TblComponent", () => {
  test("renders ok and works ok", () => {
    const mockClick = jest.fn();
    const output = shallow(
      <TableComponent rowObjects={mockData} arrow="id" sortBy={mockClick} />
    );
    output
      .find("th")
      .at(0)
      .simulate("click");
    expect(mockClick).toHaveBeenCalled();
    expect(
      shallow(
        <TableComponent rowObjects={mockData} arrow="id" sortBy={mockClick} />
      )
    ).toMatchSnapshot();
  });
});
