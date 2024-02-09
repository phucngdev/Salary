import { message } from "antd";
import React, { useState } from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";

const AddNew = () => {
  const month = new Date().getMonth() + 1;

  const [time, setTime] = useState(() => {
    const timeLocal = JSON.parse(localStorage.getItem(`month${month}`)) || [];
    return timeLocal;
  });

  const handleStart = () => {
    const newTime = {
      timeDay: new Date().toLocaleDateString(),
      timeStart: new Date().toLocaleTimeString(),
    };
    time.unshift(newTime);
    localStorage.setItem(`month${month}`, JSON.stringify(time));
    message.success({
      content: "Bắt đầu tính giờ",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };
  const handleEnd = () => {
    time[0]["timeEnd"] = new Date().toLocaleTimeString();
    localStorage.setItem(`month${month}`, JSON.stringify(time));
    message.success({
      content: "Kết thúc phiên làm việc",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  return (
    <>
      <div className="flex flex-col items-center px-3 pt-5 text-white bg-slate-600">
        <h3 className="text-lg font-bold mb-5">Giờ làm hôm nay</h3>
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-green-400 hover:bg-green-600 rounded-md"
          >
            Bắt đầu
          </button>
          <button
            onClick={handleEnd}
            className="px-4 py-2 bg-red-400 hover:bg-red-600 rounded-md"
          >
            Kết thúc
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNew;
