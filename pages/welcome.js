import React from 'react';
import { motion } from 'framer-motion';

export default function welcome() {
  return (
    <motion.div 
        initial={{opacity: 0, y:100}}
        animate={{opacity: 1, y:0}}
        className='h-screen flex items-center justify-center font-col text-5xl'>
        Umar's Website
    </motion.div>
  )
}
