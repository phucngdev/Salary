import React from "react";
import { Helmet } from "react-helmet";
import { Tabs } from "antd";
import FirTable from "./FirTable";
import SeconTable from "./SeconTable";
import ThirTable from "./ThirTable";

const Header = () => {
  const items = [
    {
      key: "1",
      label: "Bảng 1",
      children: <FirTable></FirTable>,
    },
    {
      key: "2",
      label: "Bảng 2",
      children: <SeconTable></SeconTable>,
    },
    {
      key: "3",
      label: "Bảng 3",
      children: <ThirTable></ThirTable>,
    },
  ];
  return (
    <>
      <Helmet>
        <title>Salary</title>
      </Helmet>
      <Tabs
        className="max-w-[90%] lg:max-w-[80%] h-[56px] mx-auto my-3"
        defaultActiveKey="1"
        items={items}
      />
    </>
  );
};

export default Header;
