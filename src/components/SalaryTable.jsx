import React from "react";
import { Carousel } from "antd";
import Table from "./Table";
import AddNew from "./AddNew";

const SalaryTable = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <>
      <div>
        <AddNew></AddNew>
        <Table></Table>
      </div>
    </>
  );
};

export default SalaryTable;
