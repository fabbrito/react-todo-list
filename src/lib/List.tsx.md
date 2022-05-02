## React component using generic types

```js
import React from "react";

interface TableProps<TypeItem> {
  items: TypeItem[];
  renderItem: (items: TypeItem) => JSX.Element | React.ReactNode;
}
export const ListComponent = <TypeItem,>(props: TableProps<TypeItem>) => {
  return <ul>{props.items.map((item) => props.renderItem(item))}</ul>;
};

export const List: React.FC = () => {
  return (
    <ListComponent
      items={[
        { id: "1", text: "1 Sample Text!" },
        { id: "2", text: "2 Sample Text!" },
      ]}
      renderItem={(item) => {
        return <li key={item.id}>{`${item.id} - ${item.text}`}</li>;
      }}
    ></ListComponent>
  );
};
```
