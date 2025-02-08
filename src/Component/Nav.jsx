import React from 'react'

function Nav() {
  return (
    <>
      <div className="nav flex justify-between items-center py-5">
        <div className="nav-left flex gap-5">
          <h2 className='text-xl text-white font-semibold'>Today</h2>
          <h2 className='text-xl text-gray-600 font-semibold'>Week</h2>
        </div>
        <div className="nav-right">
          <img
            className="rounded-[50%] w-[30px]"
            src="https://ia804609.us.archive.org/4/items/cat-meme/01-cute-cat-begging.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Nav