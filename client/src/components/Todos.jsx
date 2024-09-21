import React from 'react'

function Todos() {
  return (
    <div>
      <div className='bg-gray-900 text-gray-200 flex justify-center px-2 py-2'>
        <input type="text" placeholder='Enter Todo'/>
        <button>Add</button>
      </div>
      <div>
        {/* display todo here */}
        
      </div>
    </div>
  )
}

export default Todos