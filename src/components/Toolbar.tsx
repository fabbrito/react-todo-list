import React, { useState } from "react";
import { Modal } from "./Modal";
import { Backdrop } from "./Backdrop";
// A SVG can be manipulated as a ReactComponent
import { ReactComponent as GarbageIcon } from "../img/garbageIcon.svg";

interface Props {
  onDeleteAll?: () => void;
  searchFunction?: (text: string) => void;
  onCheckAll?: (isChecked: boolean) => void;
}

export const Toolbar: React.FC<Props> = ({
  searchFunction = () => {},
  onDeleteAll = () => {},
  onCheckAll = () => {},
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [inputField, setInputField] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const checkboxHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onCheckAll(!isChecked);
    setIsChecked(!isChecked);
  };

  const onClearSearch: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    setInputField("");
    searchFunction("");
  };

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputField(event.target.value);
    searchFunction(event.target.value);
  };

  const openModalToDelete: React.MouseEventHandler<SVGSVGElement> = (event) => {
    setModalIsOpen(true);
  };

  const closeModalHandler: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (event) => {
    setModalIsOpen(false);
  };

  const deleteHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // Calls the passed function to delete the todo component with matching "id"
    onDeleteAll();
    setIsChecked(false);
    setModalIsOpen(false);
  };

  // useEffect(() => {onCheckAll(isChecked)}, [isChecked]);

  return (
    <div className="toolbar">
      <input
        type="checkbox"
        className="checkbox"
        onChange={checkboxHandler}
        checked={isChecked}
      />
      <GarbageIcon className="garbage-icon" onClick={openModalToDelete} />
      <input
        type="text"
        className="inputField"
        onChange={inputHandler}
        value={inputField}
        placeholder="Search in todos ..."
      />
      <span className="clear-search" onClick={onClearSearch}>
        &times;
      </span>
      {/* <GarbageIcon className="garbage-icon search" onClick={onClearSearch} /> */}
      {modalIsOpen && (
        <Modal
          text="Delete all checked todos?"
          onCancel={closeModalHandler}
          onConfirm={deleteHandler}
        />
      )}
      {modalIsOpen && <Backdrop onClickHandler={closeModalHandler} />}
    </div>
  );
};
