// import React from 'react'
import { Collapse } from 'react-collapse'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {CgDanger} from 'react-icons/cg'

export default function Accordion({open, toggle, title, desc, bass, mid, treble}) {
  return (
    <div className=" pt-4" >
        <div className=" bg-slate-800 dark:bg-white text-white dark:text-black rounded-t-md py-6 px-12 flex justify-between items-center cursor-pointer"
            onClick={toggle}
            >
            <p className=" text-base font-semibold flex"><CgDanger className='my-auto mr-1'/>{title}</p>
            <div className=" text-lg">
                {open ? <AiOutlineMinus/> : <AiOutlinePlus/>}
            </div>
        </div>
        <Collapse isOpened={open}>
            <div className='bg-slate-800 dark:bg-white text-white dark:text-black text-sm lg:text-base rounded-b-md px-12 pb-5'>
                <ul className='pt-2'>
                    <li className='mb-3'>{desc}</li>
                    <li><b>Bass</b> : {bass}</li>
                    <li><b>Mid</b> : {mid}</li>
                    <li className='mb-3'><b>Treble</b> : {treble}</li>
                    <li>Semakin anda geser mendekati arah bagian suara preferensi anda, maka bagian suara tersebut akan lebih diprioritaskan bobotnya.</li>
                </ul>
            </div>
        </Collapse>
    </div>
  )
}
