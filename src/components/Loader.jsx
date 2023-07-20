import React from 'react'
import Portal from "../assets/portal_icon2.png"

function Loader() {
  return (
    <div className='loader'>
        <div>
            <img src={Portal} alt="Load Portal" />
        </div>
    </div>
  )
}

export default Loader