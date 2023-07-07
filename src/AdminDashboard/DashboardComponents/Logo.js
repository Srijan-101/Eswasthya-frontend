import React from 'react'
import logo from './logo.png'

const Logo = ({open}) => {
    return (
            <div className={`${!open && 'hidden'} flex items-center`}>
                    <img src={logo} className='h-[40px] mr-3 ' alt='medium.ia logo' />
             </div>
    )
}

export default Logo