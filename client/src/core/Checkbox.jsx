import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const currentlyChecked = [...checked];

    // if currentCategoryId doesnt exist in checked array
    if (currentCategoryId === -1) {
      currentlyChecked.push(c);
    } else {
      currentlyChecked.splice(currentCategoryId, 1);
    }

    setChecked(currentlyChecked);
    handleFilters(currentlyChecked);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        type="checkbox"
        onChange={handleToggle(c._id)}
        checked={checked.includes(c._id)}
        className="form-check-input me-2 ms-2"
      />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default Checkbox;
