import React, { FC } from "react";
import { useActions } from "../../../../hooks/useActions";
import { Category } from "../../../../entities/category.entity";

interface CategoryFilterProps {
  categories: Category[];
}

const CategoryFilter: FC<CategoryFilterProps> = ({ categories }) => {
  const { changeCategory, changeTitle } = useActions();

  return (
    <div>
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => {
            changeCategory(cat.name);
            changeTitle("Category: " + cat.name);
          }}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
