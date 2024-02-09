import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Helmet>
        <title>Salary</title>
      </Helmet>
      <div className="max-w-[80%] h-[56px] mx-auto my-3 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Salary</h1>
        <div className="h-full flex items-center gap-4">
          <Link
            className="px-3 py-1 hover:border-b hover:border-b-black"
            to="/"
          >
            Bảng lương
          </Link>
          <Link
            className="px-3 py-1 hover:border-b hover:border-b-black"
            to="/"
          >
            Ghi chú
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
