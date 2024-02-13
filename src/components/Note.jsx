import {
  CarryOutTwoTone,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteTwoTone,
  DislikeTwoTone,
  ExclamationCircleFilled,
  ExclamationCircleTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Button, Modal, Popconfirm, Tooltip, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Note = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [noteLocal, setNoteLocal] = useState(() => {
    const localStore = JSON.parse(localStorage.getItem("note")) || [];
    return localStore;
  });
  const [note, setNote] = useState("");

  const countSucces = noteLocal?.filter((item) => item.status === 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note === "") {
      message.success({
        content: "Thêm mới nội dung",
        icon: <ExclamationCircleTwoTone twoToneColor="#ff0000" />,
      });
      return;
    }
    const newNote = {
      id: uuidv4(),
      content: note,
      status: 0,
      created: new Date().toLocaleString(),
    };
    noteLocal.unshift(newNote);
    localStorage.setItem("note", JSON.stringify(noteLocal));
    message.success({
      content: "Thêm mới thành công",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
    setNote("");
  };

  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: "Xoá tất cả ghi chú?",
      icon: <ExclamationCircleFilled />,
      content: "click Yes để xoá",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const idDelete = 14022003;
        const newDelete = noteLocal.filter((item) => item.id === idDelete);
        setNoteLocal(newDelete);
        localStorage.setItem("note", JSON.stringify(newDelete));
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

  const handleOk = (id) => {
    const updatedNotes = noteLocal.map((note) =>
      note.id === id ? { ...note, status: 1 } : note
    );
    localStorage.setItem("note", JSON.stringify(updatedNotes));
    setNoteLocal(updatedNotes);
  };

  const handlePrev = (id) => {
    const updatedNotes = noteLocal.map((note) =>
      note.id === id ? { ...note, status: 0 } : note
    );
    localStorage.setItem("note", JSON.stringify(updatedNotes));
    setNoteLocal(updatedNotes);
  };

  const handleSucces = (id) => {
    const updatedNotes = noteLocal.filter((item) => item.id !== id);
    localStorage.setItem("note", JSON.stringify(updatedNotes));
    setNoteLocal(updatedNotes);
    message.success("Xoá thành công");
  };

  const cancel = (e) => {
    message.error("Click on No");
  };

  const listNote = noteLocal?.map((note, index) => (
    <div
      className={`w-full flex items-center justify-between gap-2 hover:opacity-70 p-2 ${
        note.status === 0 ? "bg-red-200" : "bg-green-200"
      }`}
    >
      <div
        key={note.id}
        className="flex-1 flex gap-6 items-center justify-between"
      >
        <p
          className={`text-wrap  ${
            note.status === 1 ? "line-through" : "no-underline"
          }`}
        >
          {index + 1}: {note.content}
        </p>
        {note.status === 0 ? (
          <Tooltip placement="left" title="Xong" color="green">
            <button onClick={() => handleOk(note.id)}>
              <div className="px-1 border cursor-pointer border-[#00CC00] rounded-md">
                <CarryOutTwoTone twoToneColor="#00CC00" />
              </div>
            </button>
          </Tooltip>
        ) : (
          <Tooltip placement="left" title="Hoàn tác" color="red">
            <button onClick={() => handlePrev(note.id)}>
              <div className="px-1 border cursor-pointer border-[#ff0000] rounded-md">
                <DislikeTwoTone twoToneColor="#ff0000" />
              </div>
            </button>
          </Tooltip>
        )}
      </div>
      <Tooltip placement="right" title="Xoá" color="red">
        <Popconfirm
          title="Xoá note của bạn"
          placement="left"
          onConfirm={() => handleSucces(note.id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          okType="danger"
        >
          <div className="px-1 border cursor-pointer border-red-600 rounded-md">
            <DeleteTwoTone twoToneColor="#ff0000" />
          </div>
        </Popconfirm>
      </Tooltip>
    </div>
  ));

  return (
    <>
      <div className="flex flex-col items-center pb-[6.5rem]">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[50%] flex items-center justify-center gap-2"
        >
          <input
            className="flex-1 border border-black px-2 py-2 md:py-1 rounded-lg"
            type="text"
            id="inputNote"
            placeholder="Ghi chú"
            ref={inputRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            type="default"
            className="hidden md:block border-blue-600 bg-blue-500 text-white"
          >
            Thêm
          </Button>
        </form>
        <Tooltip title="Thêm mới">
          <label
            htmlFor="inputNote"
            className="fixed z-[99] text-white bottom-10 right-[5%] w-[90%] h-[40px] flex justify-between items-center px-[5%] md:hidden p-2 md:px-4 text-base md:text-sm rounded-full hover:bg-blue-500 bg-blue-600"
          >
            <div>Thêm ghi chú mới</div>
            <div>
              <PlusCircleTwoTone />
            </div>
          </label>
        </Tooltip>
        {noteLocal?.length > 0 ? (
          <>
            <div className="flex items-center mx-auto mt-3">
              Hoàn thành {countSucces.length}/{noteLocal.length}
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="w-full md:w-[50%] mt-4 flex flex-col gap-1 items-center justify-center">
          {listNote}
        </div>
        {noteLocal.length > 0 ? (
          <div className="flex justify-center mt-5">
            <Button onClick={showDeleteConfirm} type="dashed">
              Delete
            </Button>
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-center mt-5">
          <h3>The copyright is owned by phucngdev</h3>
        </div>
      </div>
    </>
  );
};

export default Note;
