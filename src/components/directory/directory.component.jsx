import React from "react";
import CategoryItem from "../category-item/category-item.component";

import "./directory.styless.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        //console.log(category);
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
