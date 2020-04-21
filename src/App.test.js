import React from "react";
import { shallow, mount, render } from "enzyme";
import App from "./App";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("App component", () => {
  test("should shallow correctly", () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
  test("should mount correctly", () => {
    expect(mount(<App />)).toMatchSnapshot();
  });
  test("should render correctly", () => {
    expect(render(<App />)).toMatchSnapshot();
  });
});
