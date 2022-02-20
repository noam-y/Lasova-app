import { useState } from "react";
import { useDispatch } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import NewVolunteerModal from "./NewVolunteerModal";

const TableHeader = () => {
  const dispatch = useDispatch();
  const [filters, setfilters] = useState({
    filterBy: {},
    search: "",
  });

  const handleSearch = (e) => {
    setfilters((prevFilters) => ({ ...prevFilters, search: e.target.value }));
  };

  const handleFilter = (e) => {
    if (e.target.value) {
      setfilters((prev) => ({
        ...prev,
        filterBy: { tempFilter: e.target.value },
      }));
    }
  };

  return (
    <Wrapper>
      <div className="header">
        <div className="nav">
          <div className="search">
            <DebounceInput
              type="text"
              className="serach_input"
              placeholder="חיפוש"
              debounceTimeout={300}
              onChange={handleSearch}
            />
          </div>
          <div className="filter">
            <label className="filter_label">סינון לפי:</label>
            <select className="filter_select" onChange={handleFilter}>
              <option value="">-</option>
              <option value="option1">אפשרות 1</option>
              <option value="option2">אפשרות 2</option>
              <option value="option3">אפשרות 3</option>
            </select>
          </div>
        </div>
        <div className="newVolunteer">
          <NewVolunteerModal />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  .header {
    width: 80%;
    display: flex;
    padding: 4rem;
    justify-content: space-between;
  }
  .nav {
    display: flex;
    align-items: center;
  }
  .search {
    margin-left: 3rem;
  }
  .serach_input {
    width: 15.7rem;
    height: 3.6rem;
    padding: 1rem;
    border-radius: 1.9rem;
    background-color: #c4c4c4;
    border: none;
  }
  .filter_label {
    width: 7.5rem;
    height: 1.8rem;
    margin: 1rem;
    font-size: 1.5rem;
    color: #000;
  }
  .filter_select {
    width: 12.7rem;
    height: 3.6rem;
    padding: 1rem;
    border-radius: 1.9rem;
    background-color: #c4c4c4;
    border: none;
  }
  .addVolunteer {
    width: 14rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 1.9rem;
    background-color: #4b5563;
    color: #e5e5e5;
    font-size: 1.5rem;
    letter-spacing: 0.26rem;
    text-align: right;
    cursor: pointer;
    border: none;
  }
  .addVolunteer:hover {
    opacity: 0.9;
  }
`;

export default TableHeader;
