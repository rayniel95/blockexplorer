import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import React, { useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import ReactPaginate from "react-paginate";


interface ListProps {
  element: React.ComponentType<any>;
  itemsPerPage: number
  elementProps: any[]
  itemsCount: number
  setOffset: React.Dispatch<number>
}

/**
 * Renders a list component with pagination.
 *
 * @param {ListProps} param - The props object containing the following properties:
 *   - element: The component to render for each item in the list.
 *   - itemsCount: The total number of items in the list.
 *   - itemsPerPage: The number of items to display per page.
 *   - elementProps: An array of additional props to pass to the element component.
 *   - setOffset: A function to set the offset when the user clicks to request another page.
 * @return {JSX.Element} - The rendered list component with pagination.
 */
export default function List({ element, itemsCount, itemsPerPage, elementProps, setOffset}: ListProps) {
  const Element = element

  const pageCount = Math.ceil(itemsCount / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setOffset(event.selected);
  };
  console.log(elementProps)
  return (
    <>
      <Container>
        {elementProps &&
          elementProps.map((item, index: number) => (
            <div key={index}>
              <Element {...{item}} />
            </div>
          ))}
        <ReactPaginate
          className='pagination'
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName='active'
          previousClassName='page-item'
          nextClassName='page-item'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          disabledClassName='disabled'
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </Container>
    </>
  );
}