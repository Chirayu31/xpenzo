const WaterflowText = ({ text }: { text: string }) => {
  return (
    <div className='relative'>
      <h1 className='text-7xl md:text-8xl font-black tracking-tight mb-4'>
        <span className='animate-waterflow bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:300%_auto]'>
          {text}
        </span>
      </h1>
    </div>
  )
}

export default WaterflowText
