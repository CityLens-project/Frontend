export default function PredictionMarker({
  x,
  y,
  confidence,
}) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      className="pointer-events-none"
    >
      <circle
        r="35"
        fill="#F59E0B"
        fillOpacity="0.10"
        stroke="#D97706"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      <circle
        r="11"
        fill="#F59E0B"
        stroke="white"
        strokeWidth="2"
      />

      <text
        x="0"
        y="4"
        textAnchor="middle"
        fontSize="11"
        fontWeight="bold"
        fill="white"
      >
        !
      </text>

      <title>
        AI predicted congestion - {confidence}% confidence
      </title>
    </g>
  )
}
