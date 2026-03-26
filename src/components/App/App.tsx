import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { NoteList } from '../NoteList/NoteList'
import { SearchBox } from '../SearchBox/SearchBox'
import { Modal } from '../Modal/Modal'
import { NoteForm } from '../NoteForm/NoteForm'
import { fetchNotes } from '../../services/noteService'
import css from './App.module.css'
import Pagination from '../Pagination/Pagination'

const PER_PAGE = 12

function App() {
	const [page, setPage] = useState(1)
	const [search, setSearch] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const debouncedSetSearch = useDebouncedCallback((value: string) => {
		setSearch(value)
		setPage(1)
	}, 500)

	const { data, isLoading, isError } = useQuery({
		queryKey: ['notes', page, search],
		queryFn: () =>
			fetchNotes({
				page,
				perPage: PER_PAGE,
				search
			}),
		placeholderData: keepPreviousData
	})

	const notes = data?.notes ?? []
	const totalPages = data?.totalPages ?? 0

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox onSearch={debouncedSetSearch} />

				{totalPages > 1 && (
					<Pagination
						pageCount={totalPages}
						currentPage={page}
						onPageChange={setPage}
					/>
				)}

				<button
					type="button"
					className={css.button}
					onClick={() => setIsModalOpen(true)}
				>
					Create note +
				</button>
			</header>

			{isLoading && <p>Loading...</p>}
			{isError && <p>Something went wrong...</p>}
			{!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}

			{isModalOpen && (
				<Modal onClose={() => setIsModalOpen(false)}>
					<NoteForm onClose={() => setIsModalOpen(false)} />
				</Modal>
			)}
		</div>
	)
}

export default App
