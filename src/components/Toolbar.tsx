import React, { useState } from "react";
import Modal from "./Modal";
// A SVG can be manipulated as a ReactComponent
import { ReactComponent as GarbageIcon } from "../img/garbageIcon.svg";

interface Props {
  onDeleteAll?: () => Promise<void>;
  searchFunction?: (text: string) => void;
  onCheckAll?: (isChecked: boolean) => void;
}

const Toolbar: React.FC<Props> = ({
  searchFunction = () => {},
  onDeleteAll = async () => {},
  onCheckAll = () => {},
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  // const [emptySearch, setEmptySearch] = useState<boolean>(false);

  const checkboxHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onCheckAll(!isChecked);
    setIsChecked(!isChecked);
  };

  const inputSearchHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchText(event.target.value);
    searchFunction(event.target.value);
    // if (emptySearch) setEmptySearch(false);
  };

  const openModalToDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setModalIsOpen(true);
  };

  const closeModalHandler: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (event) => {
    setModalIsOpen(false);
  };

  const deleteAllHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // Change local component states to false
    setIsChecked(false);
    setModalIsOpen(false);
    // Calls "onDeleteAll", which will remove all visible checked items, then clears the search
    onDeleteAll().then(() => {
      setSearchText("");
    });
  };

  // useEffect(() => {onCheckAll(isChecked)}, [isChecked]);
  // TODO: indeterminate state for checkbox
  /* const checkboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = true;
    }
  }, []); */

  // useEffect(() => {
  // if (!emptySearch) return;
  // setEmptySearch(false);
  // setSearchText("");
  // searchFunction("");
  // }, [emptySearch]);

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
      <button className="delete-all-btn" onClick={openModalToDelete} data-testid="toolbar-delete-icon">
        <GarbageIcon id="icon-delete-all" className="icon" title="Delete all icon" />
      </button>
      <input
        type="search"
        className="input-search"
        onChange={inputSearchHandler}
        value={searchText}
        placeholder="Search in TO-DOs ..."
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

export default Toolbar;
