// Shared types used across chart computation and rendering utilities

export type LabelData = Record<string, string>

export type LabelAnchor = "start" | "end" | "middle"

export type YGridItem = {
	x1: number
	x2: number
	y1: number
	y2: number
	labelX: number
	labelY: number
	val: number
	labelAnchor: LabelAnchor
	showLabels: boolean
}

export type XGridItem = {
	x1: number
	x2: number
	y1: number
	y2: number
	labelX: number
	labelY: number
	val: number
	yVal: number
	showLabels: boolean
}

export type XAxisDataItem = {
	x1: number
	x2: number
	y1: number
	y2: number
	maxLabel: number
	minLabel: number
	maxLabelX: number
	maxLabelY: number
	minLabelX: number
	minLabelY: number
	showLabel: boolean
	labelAnchor: LabelAnchor
	showAxis: boolean
}

export type YAxisDataItem = {
	x1: number
	x2: number
	y1: number
	y2: number
	maxLabel: string
	minLabel: string
	maxLabelX: number
	maxLabelY: number
	minLabelX: number
	minLabelY: number
	showLabel: boolean
	labelAnchor: LabelAnchor
	showAxis: boolean
}

export type AxisLabelData = {
	x: number
	y: number
	showLabel: boolean
	labelAnchor: LabelAnchor
}

export type AxisValueData = {
	ticks: number[]
	niceMin: number
	niceMax: number
}
