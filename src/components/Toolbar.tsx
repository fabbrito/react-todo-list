import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
// A SVG can be manipulated as a ReactComponent
import { ReactComponent as GarbageIcon } from "../img/garbageIcon.svg";

interface Props {
  onDeleteAll?: () => Promise<void>;
  searchFunction?: (text: string) => void;
  onCheckAll?: (isChecked: boolean) => void;
}

export const Toolbar: React.FC<Props> = ({
  searchFunction = () => {},
  onDeleteAll = async () => {},
  onCheckAll = () => {},
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [emptySearch, setEmptySearch] = useState<boolean>(false);

  const checkboxHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onCheckAll(!isChecked);
    setIsChecked(!isChecked);
  };

  const inputSearchHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchText(event.target.value);
    searchFunction(event.target.value);
    if (emptySearch) setEmptySearch(false);
  };

  const openModalToDelete: React.MouseEventHandler<SVGSVGElement> = (event) => {
    setModalIsOpen(true);
  };

  const closeModalHandler: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (event) => {
    setModalIsOpen(false);
  };

  const deleteAllHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    // Calls the passed function to delete the todo component with matching "id"
    setIsChecked(false);
    setModalIsOpen(false);
    onDeleteAll().then(() => {
      setEmptySearch(true);
    });
  };

  // useEffect(() => {onCheckAll(isChecked)}, [isChecked]);

  // const checkboxRef = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   if (checkboxRef.current) checkboxRef.current.indeterminate = true;
  // }, []);

  useEffect(() => {
    if (!emptySearch) return;
    setEmptySearch(false);
    setSearchText("");
    // searchFunction("");
  }, [emptySearch]);

  return (
    <div className="toolbar-container">
      <input
        id="checkbox-check-all"
        type="checkbox"
        className="checkbox"
        onChange={checkboxHandler}
        checked={isChecked}
        data-testid="toolbar-checkbox"
      />
      <GarbageIcon
        id="icon-delete-all"
        className="garbage-icon"
        onClick={openModalToDelete}
        data-testid="toolbar-delete-icon"
      />
      <input
        type="search"
        className="input-search"
        onChange={inputSearchHandler}
        value={searchText}
        placeholder="Search in todos ..."
        data-testid="toolbar-search-field"
      />
      {modalIsOpen && (
        <Modal onCancel={closeModalHandler} onConfirm={deleteAllHandler}>
          <p>
            From the <b>VISIBLE</b> todos, <b>DELETE</b> all that are checked?
          </p>
        </Modal>
      )}
    </div>
  );
};
