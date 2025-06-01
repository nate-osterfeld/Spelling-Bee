import React, { useState } from 'react'

const DonutChart = ({ data, legend, size = 200, innerRadius = 60 }) => {
	const [hoveredSlice, setHoveredSlice] = useState(null)
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

	const radius = size / 2
	const total = data.reduce((sum, item) => sum + item.value, 0)

	const getCoordinatesForPercent = (percent) => {
		const x = Math.cos(2 * Math.PI * percent) * radius
		const y = Math.sin(2 * Math.PI * percent) * radius
		return [x, y]
	}

	let cumulativePercent = 0

	const handleMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect()
		setMousePos({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		})
    }
    
    const positionLegendLeft = () => {
        if (legend.toString().length === 1) return '44%'
        if (legend.toString().length === 2) return '38%'
        if (legend.toString().length === 3) return '32%'
        if (legend.toString().length === 4) return '30%'
    }

	return (
		<div
			style={{ position: 'relative', width: size, height: size }}
			onMouseMove={handleMouseMove}
		>
			{/* Tooltip box */}
			{hoveredSlice !== null && (
				<div
					style={{
						position: 'absolute',
						left: mousePos.x + 12,
						top: mousePos.y - 12,
						background: '#333',
						color: '#fff',
						padding: '4px 8px',
						borderRadius: '4px',
						fontSize: '12px',
						pointerEvents: 'none',
						whiteSpace: 'nowrap',
						transform: 'translateY(-100%)', // push above
					}}
				>
					{data[hoveredSlice].label ??
						`${data[hoveredSlice].value} (${Math.round(
							(data[hoveredSlice].value / total) * 100,
						)}%)`}
				</div>
			)}

			<svg width={size} height={size} viewBox={`${-radius} ${-radius} ${size} ${size}`}>
				{data.map((slice, index) => {
					const [startX, startY] = getCoordinatesForPercent(cumulativePercent)
					cumulativePercent += slice.value / total
					const [endX, endY] = getCoordinatesForPercent(cumulativePercent)
					const largeArcFlag = slice.value / total > 0.5 ? 1 : 0

					const pathData = `
            M ${startX} ${startY}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
            L 0 0
          `

					return (
						<path
							key={index}
							d={pathData}
							fill={slice.color}
							onMouseEnter={() => setHoveredSlice(index)}
							onMouseLeave={() => setHoveredSlice(null)}
						/>
					)
				})}

				{/* Inner cutout */}
				<circle cx='0' cy='0' r={innerRadius} fill='#fff' />
			</svg>
			<div
				style={{
					position: 'absolute',
					top: '37%',
                    left: positionLegendLeft(),
				}}
            >
                {legend}
            </div>
		</div>
	)
}

export default DonutChart
