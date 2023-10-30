export const Grainy = () => {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 opacity-[0.15] [filter:_url(#grainy)]">
      <svg>
        <filter id="grainy">
          <feTurbulence type="turbulence" baseFrequency="0.65" />
        </filter>
      </svg>
    </div>
  )
}
