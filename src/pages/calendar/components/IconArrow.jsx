const IconArrow = ({ direction = "left" }) => (
  <svg
    data-slot="icon"
    fill="none"
    strokeWidth={2}
    stroke="#828282"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {direction === "left" ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    )}
  </svg>
)

export default IconArrow