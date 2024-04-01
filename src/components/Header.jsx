import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs } from "antd";
import Table from "./Table";
import Note from "./Note";

const Header = () => {
  const items = [
    {
      key: 1,
      label: "Tháng 1",
      children: <Table data={1} />,
    },
    {
      key: 2,
      label: "Tháng 2",
      children: <Table data={2} />,
    },
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  return (
    <>
      <Helmet>
        <title>Salary</title>
      </Helmet>
      <Tabs
        className="w-[90%] lg:w-[80%] h-[56px] mx-auto my-3"
        defaultActiveKey={currentMonth}
        items={items}
      />
    </>
  );
};

export default Header;
