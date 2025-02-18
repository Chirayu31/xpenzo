type WaterflowTextProps = {
  text: string
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl' | '8xl'
}

const WaterflowText = ({ text, size = 'xl' }: WaterflowTextProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '4xl': 'text-4xl',
    '7xl': 'text-7xl',
    '8xl': 'text-7xl md:text-8xl',
  }

  return (
    <span
      className={`${sizeClasses[size]} font-black animate-waterflow bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:300%_auto]`}>
      {text}
    </span>
  )
}

export default WaterflowText
