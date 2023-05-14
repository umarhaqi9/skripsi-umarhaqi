import { motion, useScroll, useSpring } from "framer-motion";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SocMedBtn from "../components/SocMedBtn";
import { IEM } from "../components/iem_db";
import Link from 'next/link';


export default function IEMRecommend() {
  // For Framer motion to track scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Navbar Fixed
    window.onscroll = function() {
      const header = document.querySelector('header');
      const fixedNav = header.offsetTop;
      const toTop = document.querySelector('#totop');

      if(window.pageYOffset > fixedNav){
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
      } else {
        header.classList.remove('navbar-fixed');
        toTop.classList.add('hidden');
      }
    }

    // Hamburger Script
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');
    
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('hamburgeractive');
      navMenu.classList.toggle('hidden');
    });
  
    // Outside Click to close navbar Hamburger
    window.addEventListener('click', function(e){
      if(e.target != hamburger && e.target != navMenu){
        hamburger.classList.remove('hamburgeractive');
        navMenu.classList.add('hidden');
        
      }
    })
    
  
    // Dark Mode
    const darkToggle = document.querySelector('#dark-toggle');
    const html = document.querySelector('html');
    
    
    
    darkToggle.addEventListener('click', function(){
      if(darkToggle.checked) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
        

      } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
        
      }
    })
  
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      darkToggle.checked = true;
      
      
    } else {
      document.documentElement.classList.remove('dark')
      darkToggle.checked = false;
      
      
    }
    
    // AOS
    AOS.init({
      duration: 800
    });
    
  })
  
    return (
    <>
        <Head>
          <title>urIEM</title>
          <link rel="icon" href="https://cdn.discordapp.com/attachments/1077723466494640128/1105421746728865842/uriem_logo_trans.png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
          
          <Script onLoad={() => {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          }}/>
        </Head>
        
        {/* Header Start */}

        <header className='bg-slate-800 absolute top-0 left-0 w-full flex items-center z-10'>
            <div className='container'>
                <div className='flex items-center justify-between relative'>
                <div className='px-4'>
                    <Link href='https://ur-iem.vercel.app/'>
                        <a  className=' font-extrabold text-xl text-sky-500 block py-5'>
                            <h1 className=' text-3xl font-extrabold italic'>urIEM</h1>
                            {/* <Image src={Logo}/> */}
                        </a>
                    </Link>
                </div>
                <div className='flex items-center px-4'>
                    <button id='hamburger' name='hamburger' type='button' 
                    className='group block absolute right-4 lg:hidden'>
                    <span className='hamburgerline origin-top-left transition duration-300 ease-in-out'></span>
                    <span className='hamburgerline transition duration-300 ease-in-out'></span>
                    <span className='hamburgerline origin-bottom-left transition duration-300 ease-in-out'></span>
                    </button>

                    <nav 
                    id='nav-menu' 
                    className='hidden absolute py-5 shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full 
                                lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none 
                                bg-slate-800 dark:shadow-slate-500 lg:dark:bg-transparent'>
                    <ul className='block lg:flex'>
                        <li className='group'>
                        <Link href='/'>
                            <a className='text-base font-medium py-2 mx-8 flex  group-hover:text-sky-500 text-white'>Home</a>
                        </Link>
                        </li>
                        <li className='group'>
                        <Link href='/list'>
                            <a  className='text-base font-medium py-2 mx-8 flex group-hover:text-sky-500 text-white'>List of IEMs</a>
                        </Link>
                        </li>
                        <li className='group'>
                        <Link href='/about'>
                            <a className='text-base font-medium py-2 mx-8 flex group-hover:text-sky-500 text-white'>About Us</a>
                        </Link>
                        </li>
                        
                        <div className=' w-48 mx-auto mt-2 pt-2 border-t border-slate-300 lg:hidden'/>
                        <li className='flex items-center mx-8 py-2'>
                        <div className='flex'>
                            <span className='mr-2 text-sm dark:text-slate-500 text-sky-500 font-semibold dark:font-normal'>Light</span>
                            <input type="checkbox" className='hidden' id='dark-toggle'/>
                            <label for="dark-toggle">
                            <div className='flex h-5 w-9 cursor-pointer items-center rounded-full bg-slate-500 p-1'>
                                <div className='toggle-circle h-4 w-4 rounded-full bg-white duration-300 ease-in-out'></div>
                            </div>
                            </label>
                            <span className='ml-2 text-sm text-slate-500 dark:text-sky-500 dark:font-semibold'>Dark</span>

                        </div>
                        </li>
                    </ul>
                    </nav>
                </div>
                </div>
            </div>
            <motion.div
                className="progress-bar"
                style={{ scaleX }}
            />
        </header>

        {/* Header End */}

        {/* IEM Recommend Start */}
        <section id='recommend' className='pt-36 pb-32 bg-white dark:bg-slate-700'>
            <div className='container'>
              <div className='w-full px-4' data-aos="fade-up">
                <div className='mx-auto text-center mb-16'>
                  <h4 className='font-semibold text-lg text-sky-500 mb-2'>Recommendation</h4>
                  <h2 className='font-bold text-black dark:text-white text-4xl mb-4  '>Find Your IEM Now!</h2>
                  <p className='font-medium text-slate-500 dark:text-slate-300 md:text-lg'>
                  Masukkan preferensi anda :
                  </p>
                </div>
              </div>

              <div className='w-full px-4' data-aos="fade-up">
                <div className='w-full p-4 bg-slate-50 dark:bg-slate-200 shadow-md rounded-lg' data-aos="fade-up">
                    <div className="container">
                        <div className='w-full py-6 flex mb-8'>
                            <p className=' lg:text-lg text-sm text-black  w-1/6 text-left'>Bass</p>
                            <div className=" w-4/6">
                                <input type="range" step={25} name="priority1" defaultValue={50} className="w-full justify-center"/>
                            </div>
                            <p className=' lg:text-lg text-sm text-black  w-1/6 order-last text-right'>Mid</p>
                        </div>
                        <div className='w-full py-6 flex mb-8'>
                            <p className=' lg:text-lg text-sm text-black w-1/6 text-left'>Mid</p>
                            <div className="w-4/6">
                                <input type="range" step={25} name="priority2" defaultValue={50} className="w-full justify-center"/>
                            </div>
                            <p className=' lg:text-lg text-sm text-black w-1/6 order-last text-right'>Treble</p>
                        </div>
                        <div className='w-full py-6 flex mb-8'>
                            <p className=' lg:text-lg text-sm text-black w-1/6 text-left'>Bass</p>
                            <div className="w-4/6">
                                <input type="range" step={25} name="priority3" defaultValue={50} className="w-full justify-center"/>
                            </div>
                            <p className=' lg:text-lg text-sm text-black w-1/6 order-last text-right'>Treble</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </section>
        {/* List End */}


        {/* Footer Start */}
        <footer className='bg-slate-800 pt-24 pb-12'>
            <div className='container'>
              <div className='flex flex-wrap'>
                <div className='w-full px-4 mb-12 text-slate-300 font-small md:w-1/3'>
                  <h2 className='font-bold text-4xl text-white mb-5'>Umar Haqi</h2>
                  <h3  className='font-bold text-2xl mb-2'>Contact</h3>
                  <p className='mb-1'>umarhaqi9@gmail.com</p>
                  <p className='mb-1'>+6287878712774</p>
                  <p className='mb-1'>Tangerang Selatan</p>
                </div>
                <div className='w-full px-4 mb-12 md:w-1/3'>
                  <h3 className='font-semibold text-xl text-white mb-5'>Links</h3>
                  <ul className='text-slate-300'>
                    <li>
                      <a href='https://umarhaqi9.vercel.app/' className='inline-block text-base hover:text-sky-500 mb-3' target='_blank'>Umar's Website</a>
                    </li>
                    <li>
                      <a href='' className='inline-block text-base hover:text-sky-500 mb-3' target='_blank'>Sinfonia Music</a>
                    </li>
                    <li>
                      <a href='' className='inline-block text-base hover:text-sky-500 mb-3' target='_blank'>Aftersound Review</a>
                    </li>
                  </ul>
                </div>
                {/* <div className='w-full px-4 mb-12 md:w-1/3'>
                  <h3 className='font-semibold text-xl text-white mb-5'>Projects</h3>
                  <ul className='text-slate-300'>
                    <li>
                      <a href='https://waddup-eta.vercel.app/' className='inline-block text-base hover:text-sky-500 mb-3'>Waddup</a>
                    </li>
                    <li>
                      <a href='https://bmi-and-bmr-calc.vercel.app/' className='inline-block text-base hover:text-sky-500 mb-3'>BMCalc</a>
                    </li>
                    <li>
                      <a href='https://sleepdisorderexsys.000webhostapp.com/' className='inline-block text-base hover:text-sky-500 mb-3'>SleepDisorder</a>
                    </li>
                    <li>
                      <a href='https://gameboii.000webhostapp.com/' className='inline-block text-base hover:text-sky-500 mb-3'>Gameboii</a>
                    </li>
                    <li>
                      <a href='https://pti-uas-food-api.vercel.app/' className='inline-block text-base hover:text-sky-500 mb-3'>Foodies For Groupies</a>
                    </li>
                    <li>
                      <a href='https://umn.itch.io/witchahead' className='inline-block text-base hover:text-sky-500 mb-3'>WitchAhead</a>
                    </li>
                    <li>
                      <a href='https://umar-remix-expense.netlify.app/' className='inline-block text-base hover:text-sky-500 mb-3'>RemixExpenses</a>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className='w-full pt-10 border-t border-slate-600'>
                <div className='flex items-center justify-center mb-5'>
                  <SocMedBtn/>
                </div>
                <p className='font-small text-xs text-slate-400 text-center'>
                  Copyright © Umar Haqi 2023, made with <a href='https://nextjs.org/' target='_blank' className='font-bold text-white'>Next.js</a> and <a href='https://tailwindcss.com/' target='_blank' className='font-bold text-sky-500'>Tailwind CSS</a>
                </p>
              </div>
            </div>
          </footer>
        {/* Footer End */}

        {/* Back To Top Start */}
        <a 
          id='totop'
          href='#list' 
          className=' flex justify-center items-center fixed z-[9999] bottom-5 right-5 h-14 w-14 bg-sky-500 rounded-full p-4 hidden hover:animate-pulse hover:-translate-y-2 duration-300 ease-in-out'>
          <span className='block w-5 h-5 border-t-2 border-l-2 rotate-45 mt-2'></span>
        </a>
        {/* Back To Top End */}


    </>
  )
}
