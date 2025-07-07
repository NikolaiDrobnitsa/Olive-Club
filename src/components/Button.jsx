export default function Button ({type, onClick, className, children, disabled }) {
  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  )
}