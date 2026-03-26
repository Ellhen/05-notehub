import axios, { type AxiosResponse } from 'axios'
import type { Note, NoteTag } from '../types/note'

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN

if (!TOKEN) {
	throw new Error('VITE_NOTEHUB_TOKEN is not defined in .env')
}

export const api = axios.create({
	baseURL: 'https://notehub-public.goit.study/api/',
	headers: {
		Authorization: `Bearer ${TOKEN}`,
		'Content-Type': 'application/json'
	}
})

export interface FetchNotesParams {
	page: number
	perPage: number
	search?: string
}

export interface FetchNotesResponse {
	notes: Note[]
	totalPages: number
}

export interface CreateNoteParams {
	title: string
	content: string
	tag: NoteTag
}

export const fetchNotes = async ({
	page,
	perPage,
	search = ''
}: FetchNotesParams): Promise<FetchNotesResponse> => {
	const response: AxiosResponse<FetchNotesResponse> =
		await api.get<FetchNotesResponse>('/notes', {
			params: {
				page,
				perPage,
				...(search.trim() ? { search } : {})
			}
		})

	return response.data
}

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
	const response: AxiosResponse<Note> = await api.post<Note>('/notes', newNote)

	return response.data
}

export const deleteNote = async (id: string): Promise<Note> => {
	const response: AxiosResponse<Note> = await api.delete<Note>(`/notes/${id}`)

	return response.data
}