import {
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, Tooltip, message } from "antd";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ThirTable = () => {
  const [time, setTime] = useState(() => {
    const timeLocal = JSON.parse(localStorage.getItem(`thirMonth`)) || [];
    return timeLocal;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEdit, setMdalEdit] = useState(false);
  const [itemEdit, setItemEdit] = useState();
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

  const handleTimeSpace = (startTime, endTime) => {
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

  const handleWorking = (startTime, endTime) => {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    const differenceInMilliseconds = end - start;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInParseTime = differenceInSeconds / (8 * 60 * 60);
    return differenceInParseTime;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOpen = () => {
    setMdalEdit(true);
  };

  const handleOk = () => {
    infoDate["timeSpace"] = handleTimeSpace(
      infoDate.timeStart,
      infoDate.timeEnd
    );
    infoDate["timeWork"] = handleWorking(infoDate.timeStart, infoDate.timeEnd);
    setIsModalOpen(false);
    const newTime = {
      id: uuidv4(),
      timeDay: infoDate.timeDay,
      timeStart: infoDate.timeStart,
      timeEnd: infoDate.timeEnd,
      timeSpace: infoDate.timeSpace,
      timeWork: infoDate.timeWork,
      created: new Date().toLocaleString(),
    };
    time.unshift(newTime);
    localStorage.setItem(`thirMonth`, JSON.stringify(time));
    message.success({
      content: "Thêm mới thành công",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelEdit = () => {
    setMdalEdit(false);
  };

  const timeWorking = time.reduce((timeWork, value) => {
    return timeWork + value.timeWork;
  }, 0);

  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        localStorage.removeItem("thirMonth");
        message.success({
          content: "Xoá thành công",
          icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handleDelete = (id) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const itemDelete = time.filter((item) => item.id !== id);
        localStorage.setItem(`thirMonth`, JSON.stringify(itemDelete));
        message.success("Xoá thành công");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleEdit = (id) => {
    const idEdit = time.find((item) => item.id === id);
    setItemEdit(idEdit);
    handleOpen();
    return idEdit;
  };

  const handleChangeEdit = (e) => {
    const { value, name } = e.target;
    setItemEdit({
      ...itemEdit,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const findToSaveIndex = time.findIndex((item) => item.id === itemEdit.id);
    if (findToSaveIndex !== -1) {
      time[findToSaveIndex] = itemEdit;
      localStorage.setItem("thirMonth", JSON.stringify(time));
      setMdalEdit(false);
      message.success({
        content: "Lưu thành công",
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      });
    }
  };

  const handlePrint = time?.map((item, index) => (
    <div
      key={index}
      className="flex items-center justify-around hover:bg-slate-300 py-2"
    >
      <p className="w-[10%] text-center text-[10px] lg:text-sm">{index + 1}</p>
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
        {item.timeWork}
      </p>
      <div className="w-[15%] text-center text-[10px] lg:text-sm flex items-center justify-center lg:gap-3">
        <Tooltip title="Chỉnh sửa" color="blue">
          <button
            onClick={() => handleEdit(item.id)}
            className="p-1 lg:p-3 hover:bg-blue-300 rounded-xl"
          >
            <EditTwoTone twoToneColor="" />
          </button>
        </Tooltip>
        <Tooltip title="Xoá" color="red">
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1 lg:p-3 hover:bg-red-300 rounded-xl"
          >
            <DeleteTwoTone twoToneColor="#ff0000" />
          </button>
        </Tooltip>
      </div>
    </div>
  ));

  return (
    <>
      <div className="flex flex-col items-center px-3 pt-5 text-white bg-slate-600">
        <div className="w-full flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold ">Tổng công: {timeWorking}</h3>
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
            okType="danger"
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
      <div>
        <div className="flex flex-col gap-2 bg-stone-200 p-1 lg:p-4 lg:max-h-[500px] overflow-scroll">
          <div className="flex items-center justify-around py-2">
            <p className="w-[10%] text-center">STT</p>
            <p className="w-[15%] text-center">Day</p>
            <p className="w-[15%] text-center">Start</p>
            <p className="w-[15%] text-center">End</p>
            <p className="w-[15%] text-center">Time</p>
            <p className="w-[15%] text-center">Work</p>
            <p className="w-[15%] text-center">Feature</p>
          </div>
          {handlePrint}
          <Modal
            title="Chỉnh sửa"
            open={modalEdit}
            onOk={handleSubmit}
            onCancel={handleCancelEdit}
            okType="danger"
          >
            <div className="flex flex-col">
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="">Ngày/Tháng</label>
                <Tooltip title="xx/x">
                  <input
                    name="timeDay"
                    value={itemEdit?.timeDay}
                    onChange={handleChangeEdit}
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
                    value={itemEdit?.timeStart}
                    onChange={handleChangeEdit}
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
                    value={itemEdit?.timeEnd}
                    onChange={handleChangeEdit}
                    className="border px-2 py-1"
                    type="text"
                    placeholder="vd 23:00"
                  />
                </Tooltip>
              </div>
            </div>
          </Modal>
        </div>
        <div className="flex justify-center mt-5">
          <Button onClick={showDeleteConfirm} type="dashed">
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default ThirTable;
