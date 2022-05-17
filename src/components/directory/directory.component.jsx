import React from "react";
import DirectoryItem from "../directory-item/directory-item.component";

import "./directory.styless.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        //console.log(category);
        return <DirectoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
