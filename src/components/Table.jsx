import React, { useState } from "react";

const Table = () => {
  const month = new Date().getMonth() + 1;
  const [time, setTime] = useState(() => {
    const timeLocal = JSON.parse(localStorage.getItem(`month${month}`)) || [];
    return timeLocal;
  });

  const handleTimeSpace = (timeStart, timeEnd, timeDay) => {
    const startDate = new Date(`${timeDay} ${timeStart}`);
    const endDate = new Date(`${timeDay} ${timeEnd}`);
    const timeSpace = Math.abs(endDate - startDate) / 1000;
    const hour = Math.floor(timeSpace / 3600);
    const mil = Math.floor((timeSpace % 3600) / 60);
    const secon = timeSpace % 60;
    return `${hour}:${mil}:${secon}`;
  };

  const totalTimeSpace = (timeStart, timeEnd, timeDay) => {
    const startDate = new Date(`${timeDay} ${timeStart}`);
    const endDate = new Date(`${timeDay} ${timeEnd}`);
    const timeSpace = Math.abs(endDate - startDate) / 1000;
    return timeSpace;
  };
  return (
    <>
      <div>
        <div className="flex flex-col gap-2 bg-stone-200 p-4 max-h-[500px] overflow-scroll">
          <h2 className="text-center text-lg">Tháng {month}</h2>
          <div className="flex items-center justify-around py-2">
            <p className="w-[10%]">Số TT</p>
            <p className="w-[20%] text-center">Ngày</p>
            <p className="w-[20%] text-center">Thời gian vào</p>
            <p className="w-[20%] text-center">Thời gian ra</p>
            <p className="w-[20%] text-center">Thời gian làm việc</p>
          </div>
          {time?.map((item, index) => (
            <div className="flex items-center justify-around hover:bg-slate-300 py-2">
              <p className="w-[10%]">{index + 1}</p>
              <p className="w-[20%] text-center">{item.timeDay}</p>
              <p className="w-[20%] text-center">{item.timeStart}</p>
              <p className="w-[20%] text-center">{item.timeEnd}</p>
              <p className="w-[20%] text-center">
                {handleTimeSpace(item.timeStart, item.timeEnd, item.timeDay)}
              </p>
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
