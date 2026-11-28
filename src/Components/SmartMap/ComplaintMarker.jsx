export default function ComplaintMarker({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} className="pointer-events-none">
      <rect
        x="-9"
        y="-9"
        width="18"
        height="18"
        rx="4"
        fill="#2563EB"
        stroke="white"
        strokeWidth="2"
      />

      <path
        d="M -4 -3 H 4 V 2 H 0 L -3 5 V 2 H -4 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </g>
  )
}
