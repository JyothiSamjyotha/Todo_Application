import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-2'>
        <div className='logo font-bold text-xl mx-8'>iTask</div>
        <div className=' flex gap-8 mx-8'>
            <h2 className='cursor-pointer hover:font-bold transition-all duration-50'>Home</h2>
            <h2 className='cursor-pointer hover:font-bold transition-all duration-50'>Your Tasks</h2>
        </div>
    </nav>
  )
}

export default Navbar