import React from "react";

const Xyz = ({ setaa, aa }) => {
  console.log("Xyz", aa);

  function nitin() {
    setaa(!aa);
  }

  return (
    <button onClick={nitin} className="bg-amber-400 p-4 m-4">
      nitin1
    </button>
  );
};

export default Xyz;