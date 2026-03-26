import type { ComponentType } from 'react'
import ReactPaginateModule from 'react-paginate'
import type { ReactPaginateProps } from 'react-paginate'
import css from './Pagination.module.css'

type ModuleWithDefault<T> = { default: T }

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default

interface PaginationProps {
  pageCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      activeClassName={css.active}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      breakClassName={css.pageItem}
      disabledClassName={css.disabled}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  )
}