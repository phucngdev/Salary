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
      children: Table(1),
    },
    {
      key: 2,
      label: "Tháng 2",
      children: Table(2),
    },
    {
      key: 3,
      label: "Tháng 3",
      children: Table(3),
    },
    {
      key: 4,
      label: "Tháng 4",
      children: Table(4),
    },
    {
      key: 5,
      label: "Tháng 5",
      children: Table(5),
    },
    {
      key: 6,
      label: "Tháng 6",
      children: Table(6),
    },
    {
      key: 7,
      label: "Tháng 7",
      children: Table(7),
    },
    {
      key: 8,
      label: "Tháng 8",
      children: Table(8),
    },
    {
      key: 9,
      label: "Tháng 9",
      children: Table(9),
    },
    {
      key: 10,
      label: "Tháng 10",
      children: Table(10),
    },
    {
      key: 11,
      label: "Tháng 11",
      children: Table(11),
    },
    {
      key: 12,
      label: "Tháng 12",
      children: Table(12),
    },
    {
      key: 13,
      label: "Ghi chú",
      children: <Note></Note>,
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
