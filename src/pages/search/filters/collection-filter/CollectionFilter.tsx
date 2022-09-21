import React, { FC } from "react";
import { Collection } from "../../../../entities/collection.entity";
import { useActions } from "../../../../hooks/useActions";

interface CollectionFilterProps {
  collections: Collection[];
}

const CollectionFilter: FC<CollectionFilterProps> = ({ collections }) => {
  const { changeCollection, changeTitle } = useActions();

  return (
    <div>
      {collections.map((col) => (
        <div
          key={col.id}
          style={{ cursor: "pointer" }}
          onClick={() => {
            changeCollection(col.slug);
            changeTitle(col.name);
          }}
        >
          {col.name}
        </div>
      ))}
    </div>
  );
};

export default CollectionFilter;
