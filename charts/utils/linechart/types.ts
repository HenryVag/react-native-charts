export type LabelData = Record<string, string>

export type YGridItem = {
	x1: number
	x2: number
	y1: number
	y2: number
	labelX: number
	labelY: number
	val: number
	labelAnchor: "start" | "end"
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
	labelAnchor: "start" | "end" | "middle"
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
	labelAnchor: "start" | "end" | "middle"
	showAxis: boolean
}

export type AxisLabelData = {
	x: number
	y: number
	showLabel: boolean
	labelAnchor: "start" | "end" | "middle"
}

export type AxisValueData = {
	ticks: number[]
	niceMin: number
	niceMax: number
}
