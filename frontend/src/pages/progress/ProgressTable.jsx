import './ProgressTable.css'
import filter from '../../assets/filter-icon.svg'
import search from '../../assets/search-icon.svg'
import upArrow from '../../assets/sort-up-icon.svg'
import downArrow from '../../assets/sort-down-icon.svg'
import leftCaret from '../../assets/angle-left-icon.svg'
import rightCaret from '../../assets/angle-right-icon.svg'
import checkMark from '../../assets/checkmark-icon.svg'
import xMark from '../../assets/xmark-icon.svg'
import reset from '../../assets/rotate-left-icon.svg'
import save from '../../assets/save-icon.svg'
import unsave from '../../assets/unsave-icon.svg'
import { useMemo, useState, useRef, useEffect } from 'react'
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	flexRender,
} from '@tanstack/react-table'
import {
	useAddWordToFavoritesMutation,
	useRemoveFromFavoritesMutation
} from '../../services/authSlice'

const ProgressTable = ({ data }) => {
	const [addWordToFavorites, { error: addWordError }] = useAddWordToFavoritesMutation()
	const [removeWordFromFavorites, { error: removeWordError }] = useRemoveFromFavoritesMutation()

	const [globalFilter, setGlobalFilter] = useState('')
	const [selectedDifficulties, setSelectedDifficulties] = useState([])
	const [filteredData, setFilteredData] = useState(data)
	const [showFilterDropdown, setShowFilterDropdown] = useState(false)
	const dropdownRef = useRef(null)

	useEffect(() => {
		if (selectedDifficulties.length) {
			let filterDifficulty = data.filter((row) => selectedDifficulties.includes(row.level))
			setFilteredData(filterDifficulty)
		} else {
			setFilteredData(data)
		}
	}, [selectedDifficulties, data])

	// Close dropdown on document click !== dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowFilterDropdown(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const onSaveWord = async ({ word_id }) => {
		console.log('row', word_id)
		try {
			await addWordToFavorites({ word_id }).unwrap()
			setFilteredData(prev => prev.map(word =>
				word.word_id === word_id ? { ...word, is_saved: true } : word)
			)
		} catch (e) {
			// Error handled by RTK Query hook (accessible via `addWordError.data`)
		}
	}

	const onUnsaveWord = async ({ word_id }) => {
		try {
			await removeWordFromFavorites({ word_id }).unwrap()
			setFilteredData(prev =>
				prev.map(word =>
					word.word_id === word_id ? { ...word, is_saved: false } : word)
			)
		} catch (e) {
			// Error handled by RTK Query hook (accessible via `removeWordError.data`)
		}
	}

	const formatDate = (date) => {
		return new Date(date).toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		})
	}

	const columns = useMemo(
		() => [
			{
				accessorKey: 'saved',
				header: '',
				cell: ({ row }) => (
					!row.original.is_saved
						? <
							img onClick={() => onSaveWord(row.original)}
							src={save}
							style={{ width: '16px', cursor: 'pointer' }}
						/>
						: <img
							onClick={() => onUnsaveWord(row.original)}
							src={unsave}
							className='unsave-icon'
							style={{ width: '16px', cursor: 'pointer' }}
						/>
				)
			},
			{
				accessorKey: 'created_at',
				header: 'Date',
				cell: ({ row }) => {
					let date = formatDate(row.original.created_at)
					if (date.slice(-2) === '25') {
						return <div>{date.substring(0, date.length - 6)}</div>
					}
				},
			},
			{
				accessorKey: 'word',
				header: 'Word',
				cell: ({ row }) => (
					<div className='progress-word-wrapper'>
						{row.original.is_correct === 'Accepted' ? (
							<img src={checkMark} className='word-correct' alt='check mark' />
						) : (
							<img src={xMark} className='word-incorrect' alt='x mark' />
						)}
						<div>
							<div className='progress-word'>{row.original.word}</div>
							<div className={`progress-${row.original.level}`}>
								{row.original.level.charAt(0).toUpperCase() +
									row.original.level.slice(1)}
							</div>
						</div>
					</div>
				),
				size: 900,
			},
			{
				accessorKey: 'is_correct',
				header: 'Result',
			},
			{
				accessorKey: 'acceptance',
				header: 'Acceptance',
				cell: ({ row }) => <div>{row.original.acceptance + '%'}</div>,
				sortDescFirst: false,
			}
		], []
	)


	const table = useReactTable({
		data: filteredData || [],
		columns,
		state: {
			globalFilter,
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onGlobalFilterChange: setGlobalFilter,
	})

	const onRemoveFilters = () => {
		setSelectedDifficulties([])

		const checkboxes = document.querySelectorAll(
			'.dropdown-difficulties input[type="checkbox"]',
		)
		checkboxes.forEach((cb) => (cb.checked = false))
	}

	const toggleDifficulty = (level) => {
		setSelectedDifficulties((prev) => {
			return prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
		})
	}

	return (
		<div className='progress-table'>
			<h3 className='progress-history-title above'>History</h3>
			<div className='progress-history'>
				<h3 className='progress-history-title below'>History</h3>
				<div className='progress-search'>
					<img src={search} className='filter-icon' alt='filter' />
					<input
						placeholder='Search words...'
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className=''
					/>
				</div>
				<div ref={dropdownRef} className='progress-filter'>
					<button onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
						<img src={filter} className='filter-icon' alt='filter' />
						Filter
					</button>

					<div
						className={`progress-filter-dropdown ${showFilterDropdown ? 'active-dropdown' : ''
							}`}
					>
						{/* Dropdown difficulty section */}
						<h3>Difficulty</h3>
						<div className='dropdown-difficulties'>
							<label className='dropdown-easy'>
								<input type='checkbox' onChange={() => toggleDifficulty('easy')} />
								Easy
							</label>
							<label className='dropdown-medium'>
								<input
									type='checkbox'
									onChange={() => toggleDifficulty('medium')}
								/>
								Medium
							</label>
							<label className='dropdown-hard'>
								<input type='checkbox' onChange={() => toggleDifficulty('hard')} />
								Hard
							</label>
						</div>

						{/* Dropdown button */}
						<button className='dropdown-button' onClick={() => onRemoveFilters()}>
							<img src={reset} className='filter-icon' alt='filter' />
							Reset
						</button>
					</div>
				</div>
			</div>

			<div className='table-container'>
				<table>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											onClick={header.column.getToggleSortingHandler()}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}

											{header.id === 'saved' ? ''
												: header.column.getIsSorted() === 'asc' ? (
													<div className='sort-progress'>
														<img
															src={upArrow}
															className='arrow-sort-up select'
															alt='sort ascending'
														/>
														<img
															src={downArrow}
															className='arrow-sort-down hide'
															alt='sort descending'
														/>
													</div>
												) : header.column.getIsSorted() === 'desc' ? (
													<div className='sort-progress'>
														<img
															src={upArrow}
															className='arrow-sort-up hide'
															alt='sort ascending'
														/>
														<img
															src={downArrow}
															className='arrow-sort-down select'
															alt='sort descending'
														/>
													</div>
												) : (
													<div className='sort-progress'>
														<img
															src={upArrow}
															className='arrow-sort-up'
															alt='sort ascending'
														/>
														<img
															src={downArrow}
															className='arrow-sort-down'
															alt='sort descending'
														/>
													</div>
												)}
										</th>
									)
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className='border'>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='progress-pagination'>
				<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
					<img src={leftCaret} className='angle-left' alt='previous page' />
				</button>
				<span>
					{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</span>
				<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					<img src={rightCaret} className='angle-right' alt='next page' />
				</button>
			</div>
		</div>
	)
}

export default ProgressTable
