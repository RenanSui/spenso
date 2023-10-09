export const Grainy = () => {
  return (
    <div className="absolute opacity-30 pointer-events-none top-0 left-0 right-0 [filter:_url(#grainy)]">
      <svg>
        <filter id="grainy">
          <feTurbulence type="turbulence" baseFrequency="0.65" />
        </filter>
      </svg>
    </div>
  )
}
