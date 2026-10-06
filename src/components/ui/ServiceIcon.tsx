import {
	BrainCircuit,
	ChartColumnIncreasing,
	ChartNoAxesGantt,
	ServerCog,
	UsersRound,
	Workflow,
	type LucideProps
} from 'lucide-react'

const icons = {
	GE: ChartNoAxesGantt,
	OS: ServerCog,
	PE: UsersRound,
	ID: ChartColumnIncreasing,
	IN: Workflow,
	IA: BrainCircuit
} as const

export function ServiceIcon({ code, ...props }: { code: string } & LucideProps) {
	const Icon = icons[code as keyof typeof icons] ?? ChartNoAxesGantt
	return <Icon strokeWidth={1.25} aria-hidden='true' {...props} />
}
