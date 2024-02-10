import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";

const Table = () => {
  const month = new Date().getMonth() + 1;
  const [time, setTime] = useState(() => {
    const timeLocal = JSON.parse(localStorage.getItem(`month${month}`)) || [];
    return timeLocal;
  });

  // const handleTimeSpace = (timeStart, timeEnd, timeDay) => {
  //   const startDate = new Date(`${timeDay} ${timeStart}`);
  //   const endDate = new Date(`${timeDay} ${timeEnd}`);
  //   const timeSpace = Math.abs(endDate - startDate) / 1000;
  //   const hour = Math.floor(timeSpace / 3600);
  //   const mil = Math.floor((timeSpace % 3600) / 60);
  //   const secon = timeSpace % 60;
  //   return `${hour}:${mil}:${secon}`;
  // };

  const totalTimeSpace = (timeStart, timeEnd, timeDay) => {
    const startDate = new Date(`${timeDay} ${timeStart}`);
    const endDate = new Date(`${timeDay} ${timeEnd}`);
    const timeSpace = Math.abs(endDate - startDate) / 1000;
    return timeSpace;
  };
  return (
    <>
      <div>
        <div className="flex flex-col gap-2 bg-stone-200 p-1 lg:p-4 lg:max-h-[500px] overflow-scroll">
          <h2 className="text-center text-lg">Tháng {month}</h2>
          <div className="flex items-center justify-around py-2">
            <p className="w-[10%] text-center">STT</p>
            <p className="w-[15%] text-center">Day</p>
            <p className="w-[15%] text-center">Start</p>
            <p className="w-[15%] text-center">End</p>
            <p className="w-[15%] text-center">Time</p>
            <p className="w-[15%] text-center">Work</p>
            <p className="w-[15%] text-center">Feature</p>
          </div>
          {time?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-around hover:bg-slate-300 py-2"
            >
              <p className="w-[10%] text-center text-[10px] lg:text-sm">
                {index + 1}
              </p>
              <p className="w-[15%] text-center text-[10px] lg:text-sm">
                {item.timeDay}
              </p>
              <p className="w-[15%] text-center text-[10px] lg:text-sm">
                {item.timeStart}
              </p>
              <p className="w-[15%] text-center text-[10px] lg:text-sm">
                {item.timeEnd}
              </p>
              <p className="w-[15%] text-center text-[10px] lg:text-sm">
                {item.timeSpace}
              </p>
              <p className="w-[15%] text-center text-[10px] lg:text-sm">
                {item.timeSpace}
              </p>
              <div className="w-[15%] text-center text-[10px] lg:text-sm flex items-center justify-center lg:gap-3">
                <Tooltip title="Chỉnh sửa" color="blue">
                  <button className="p-1 lg:p-3 hover:bg-blue-300 rounded-xl">
                    <EditTwoTone twoToneColor="" />
                  </button>
                </Tooltip>
                <Tooltip title="Xoá" color="red">
                  <button className="p-1 lg:p-3 hover:bg-red-300 rounded-xl">
                    <DeleteTwoTone twoToneColor="#ff0000" />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
        <div className="flex py-2 px-7 text-white justify-end my-6">
          <h3>Tổng công làm việc : </h3>
          <h3>100</h3>
        </div>
      </div>
    </>
  );
};

export default Table;
