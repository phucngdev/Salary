import React from "react";
import { Helmet } from "react-helmet";
import { Tabs } from "antd";
import SalaryTable from "./SalaryTable";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Bảng chấm công",
    children: <SalaryTable></SalaryTable>,
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];
const Header = () => {
  return (
    <>
      <Helmet>
        <title>Salary</title>
      </Helmet>
      <Tabs
        className="max-w-[80%] h-[56px] mx-auto my-3"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </>
  );
};

export default Header;
