import { Modal, Tooltip, message } from "antd";
import React, { useState } from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";

const AddNew = () => {
  const month = new Date().getMonth() + 1;

  const [time, setTime] = useState(() => {
    const timeLocal = JSON.parse(localStorage.getItem(`month${month}`)) || [];
    return timeLocal;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoDate, setInfoDate] = useState({
    timeDay: "",
    timeStart: "",
    timeEnd: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInfoDate({
      ...infoDate,
      [name]: value,
    });
  };

  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return new Date(0, 0, 0, hours, minutes);
  };

  const calculateTimeDifference = (startTime, endTime) => {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    const differenceInMilliseconds = end - start;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    return `${hours}:${minutes}`;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    infoDate["timeSpace"] = calculateTimeDifference(
      infoDate.timeStart,
      infoDate.timeEnd
    );
    setIsModalOpen(false);
    const newTime = {
      timeDay: infoDate.timeDay,
      timeStart: infoDate.timeStart,
      timeEnd: infoDate.timeEnd,
      timeSpace: infoDate.timeSpace,
    };
    time.unshift(newTime);
    localStorage.setItem(`month${month}`, JSON.stringify(time));
    message.success({
      content: "Thêm mới thành công",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const timeWorking = time.reduce((timeWork, value) => {
    return timeWork + value.timeSpace;
  }, 0);

  return (
    <>
      <div className="flex flex-col items-center px-3 pt-5 text-white bg-slate-600">
        <div className="w-full flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold ">
            {(timeWorking / 28000).toFixed(2)} -{" "}
            {(timeWorking / 28000).toFixed(2) * 27000}
          </h3>
          <Tooltip title="Thêm mới">
            <button
              onClick={showModal}
              className="px-4 py-2 rounded-lg hover:bg-blue-500 bg-blue-600"
            >
              + Add new
            </button>
          </Tooltip>
          <Modal
            title="Thêm mới"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="flex flex-col">
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="">Ngày/Tháng</label>
                <Tooltip title="xx/x">
                  <input
                    name="timeDay"
                    value={infoDate.timeDay}
                    onChange={handleChange}
                    className="border px-2 py-1"
                    type="text"
                    placeholder="vd 14/2"
                  />
                </Tooltip>
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="">Giờ vào</label>
                <Tooltip title="xx:xx">
                  <input
                    name="timeStart"
                    value={infoDate.timeStart}
                    onChange={handleChange}
                    className="border px-2 py-1"
                    type="text"
                    placeholder="vd 15:00"
                  />
                </Tooltip>
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="">Giờ ra</label>
                <Tooltip title="xx:xx">
                  <input
                    name="timeEnd"
                    value={infoDate.timeEnd}
                    onChange={handleChange}
                    className="border px-2 py-1"
                    type="text"
                    placeholder="vd 23:00"
                  />
                </Tooltip>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AddNew;
