import {Plus} from 'phosphor-react'

import LogoSVG from '../assets/logo.svg'

export function Header(){
    return(
        <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
        <img src={LogoSVG} alt="Habbits"/>  

        <button type='button' className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center'>
          <i className='bx bx-plus'></i>
          <Plus/>Novo hábito
        </button>


      </div>
    )
}