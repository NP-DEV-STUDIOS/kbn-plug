type Props = {
    rows?: number;
    cols?: number;
    color?: string;
}

export default function DotGrid({ rows = 7, cols = 7, color = "#6468f0" }: Props) {
    const gap = 14
    const r = 2
    const w = (cols - 1) * gap + r * 2
    const h = (rows - 1) * gap + r * 2
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: cols }).map((_, col) => (
                    <circle key={`${row}-${col}`} cx={r + col * gap} cy={r + row * gap} r={r} fill={color} />
                ))
            )}
        </svg>
    )
}