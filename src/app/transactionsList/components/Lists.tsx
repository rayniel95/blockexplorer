import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import ReactPaginate from "react-paginate";


interface ListProps{
  element: React.ComponentType<any>;
  controller: (actualPage: number)=>any;
}

export default function List({element, controller }: ListProps) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const Element = element
  const {itemsPerPage, elementProps, itemsCount} = controller(itemOffset)

  const endOffset = itemOffset + itemsPerPage;

  const pageCount = Math.ceil(itemsCount / itemsPerPage);


  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // const {itemsPerPage, items, elementProps, itemsCount} = controller(event.selected)
    const newOffset = (event.selected * itemsPerPage) % itemsCount;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Container>
      {elementProps &&
				elementProps.map((item, index: number) => (
					<div key={index}>
						<Element {...item} />
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