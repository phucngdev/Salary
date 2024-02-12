import {
  CarryOutTwoTone,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteTwoTone,
  DislikeTwoTone,
  ExclamationCircleFilled,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import { Button, Popconfirm, Tooltip, message } from "antd";
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

  const listNote = noteLocal?.map((note) => (
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
          {note.content}
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
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[50%] flex items-center justify-center gap-2"
        >
          <input
            className="flex-1 border border-black px-2 py-1 rounded-lg"
            type="text"
            placeholder="Ghi chú"
            ref={inputRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            type="default"
            className="border-blue-600 bg-blue-500 text-white"
          >
            Thêm
          </Button>
        </form>
        <div className="w-full md:w-[50%] mt-4 flex flex-col gap-1 items-center justify-center">
          {listNote}
        </div>
        <div className="flex justify-center mt-5">
          <h3>The copyright is owned by phucngdev</h3>
        </div>
      </div>
    </>
  );
};

export default Note;
