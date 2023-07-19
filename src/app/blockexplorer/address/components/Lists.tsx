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

export default function List({ element, itemsCount, itemsPerPage, elementProps, setOffset}: ListProps) {
  const Element = element

  const pageCount = Math.ceil(itemsCount / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setOffset(event.selected);
  };

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