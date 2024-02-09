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
      <div className="w-[80%] mx-auto">
        <Carousel afterChange={onChange} className="bg-slate-700">
          <div>
            <AddNew></AddNew>
          </div>
          <div>
            <Table></Table>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default SalaryTable;
