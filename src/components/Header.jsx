import React from "react";
import { Helmet } from "react-helmet";
import { Tabs } from "antd";
import Table from "./Table";
import Note from "./Note";

const Header = () => {
  const items = [
    {
      key: "1",
      label: "Bảng 1",
      children: Table(1),
    },
    {
      key: "2",
      label: "Bảng 2",
      children: Table(2),
    },
    {
      key: "3",
      label: "Bảng 3",
      children: Table(3),
    },
    {
      key: "4",
      label: "Ghi chú",
      children: <Note></Note>,
    },
  ];
  return (
    <>
      <Helmet>
        <title>Salary</title>
      </Helmet>
      <Tabs
        className="w-[90%] lg:w-[80%] h-[56px] mx-auto my-3"
        defaultActiveKey="1"
        items={items}
      />
    </>
  );
};

export default Header;
