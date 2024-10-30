import React from "react";

const Filter = ({ results, handleFilter }) => {
  return (
    <>
      filter shown with
      <input onChange={handleFilter} value={results} />
    </>
  );
};

export default Filter;
