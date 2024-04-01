import { Person } from "./model";
import { SORT, usePeopleQuery, useSearchSortQuery } from "./query";

import "./people.css";
import { Pagination } from "./components/pagination.component";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useDebounce } from "@/app/shared/hooks";


const renderCells = ({ name, show, actor, movies, dob }: Person) => {
  const moviesTitles = movies.map(({ title }) => title).join(', ');
  return (
    <>
      <td>{name}</td>
      <td>{show}</td>
      <td>{actor}</td>
      <td>{dob}</td>
      <td>{moviesTitles}</td>
    </>
  )
};

// const renderRows = (people: Person[]) => {
//   if (people.length === 0) {
//     return <tr><td colSpan={5}><h2 className="empty-msg">No People Available.</h2> </td></tr>
//   } else {
//     return people.map((people, index) => (
//       <tr key={index}>{renderCells(people)}</tr>
//     ))
//   }
// }


export function People() {
  const { data: people, loading, error, currentOffset = 1, totalPage = 0, totalCount } = usePeopleQuery();

  const { onBtSort, handleSearch, sortOrder, searchText } = useSearchSortQuery();
  const isAscending = sortOrder === SORT.ASC;

  const renderRows = useMemo(() => {

    if (loading) {
      return <p>Fetching People...</p>;
    }

    if (people === undefined || error) {
      return <h2>Oops! looks like something went wrong!</h2>;
    }

    if (people.length === 0) {
      return <tr><td colSpan={5}><h2 className="empty-msg">No People Available.</h2> </td></tr>
    } else {
      return people.map((people, index) => (
        <tr key={index}>{renderCells(people)}</tr>
      ))
    }
  }, [people, loading])



  return (
    <>
      <div>
        <input value={searchText} type="search" name="Search" placeholder="Search..." onChange={({ target: { value } }) => handleSearch(value)} />
      </div>
      <table>

        <thead>
          <tr>
            <th className="sort-header" aria-sort={isAscending ? 'ascending' : 'descending'} onClick={onBtSort}>Name</th>
            <th>Show</th>
            <th>Actor/Actress</th>
            <th>Date of birth</th>
            <th>Movies</th>
          </tr>
        </thead>
        <tbody>
          {renderRows}
        </tbody>
      </table>
      <div className="pagination-container">
        <Pagination currentOffset={currentOffset} totalPage={totalPage} totalCount={totalCount} />
      </div>
    </>
  );
}
