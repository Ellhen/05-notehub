import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
	pageCount: number
	currentPage: number
	onPageChange: (page: number) => void
}

export default function Pagination({
	pageCount,
	currentPage,
	onPageChange
}: PaginationProps) {
	if (pageCount <= 1) return null

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const Paginate = (ReactPaginate as any).default ?? ReactPaginate

	return (
		<Paginate
			pageCount={pageCount}
			forcePage={currentPage - 1}
			onPageChange={({ selected }: { selected: number }) =>
				onPageChange(selected + 1)
			}
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
