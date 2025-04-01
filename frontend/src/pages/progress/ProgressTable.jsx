import React, { useMemo, useState, useCallback, useEffect } from 'react'
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	flexRender,
} from '@tanstack/react-table'

const ProgressTable = ({ data }) => {
	const [globalFilter, setGlobalFilter] = useState('')
	const [selectedDifficulties, setSelectedDifficulties] = useState([])
	const [filteredData, setFilteredData] = useState(data)

	useEffect(() => {
		if (selectedDifficulties.length) {
			let filterDifficulty = data.filter((row) => 
				selectedDifficulties.includes(row.level)
            )
            setFilteredData(filterDifficulty)
        } else {
            setFilteredData(data)
        }
	}, [selectedDifficulties])

	const columns = useMemo(
		() => [
			{ accessorKey: 'created_at', header: 'Date' },
			{
				accessorKey: 'word',
				header: 'Word',
				cell: ({ row }) => (
					<div>
						{row.original.level} {row.original.word}
					</div>
				),
			},
			{ accessorKey: 'is_correct', header: 'Result' },
			{
				accessorKey: 'acceptance',
				header: 'Acceptance',
				cell: ({ row }) => <div>{row.original.acceptance + '%'}</div>,
			},
			// {
			// 	accessorKey: 'level',
			// 	header: 'Difficulty',
			// },
		],
		[],
	)

	const table = 
			useReactTable({
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

	const toggleDifficulty = (level) => {
		setSelectedDifficulties((prev) => {
			return prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
		})
	}

	return (
		<div className=''>
			<div>
				<h3>Difficulty</h3>
				<label>
					<input type='checkbox' onChange={() => toggleDifficulty('easy')}
					/>
					Easy
				</label>
				<label>
					<input type='checkbox' onChange={() => toggleDifficulty('medium')}
					/>
					Medium
				</label>
				<label>
					<input type='checkbox' onChange={() => toggleDifficulty('hard')}
					/>
					Hard
				</label>
			</div>

			<input
				placeholder='Search words...'
				value={globalFilter}
				onChange={(e) => setGlobalFilter(e.target.value)}
				className=''
			/>

			<table className=''>
				<thead className=''>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className='p-2 border cursor-pointer'
									onClick={header.column.getToggleSortingHandler()}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
									{header.column.getIsSorted() === 'asc'
										? ' >'
										: header.column.getIsSorted() === 'desc'
										? ' <'
										: '<>'}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className='border'>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className='p-2 border'>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			<div className=''>
				<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
					Previous
				</button>
				<span>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</span>
				<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					Next
				</button>
			</div>
		</div>
	)
}

export default ProgressTable
