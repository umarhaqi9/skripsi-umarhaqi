import { motion, useScroll, useSpring } from "framer-motion";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SocMedBtn from "../components/SocMedBtn";
import { IEM } from "../components/iem_db";
import Link from "next/link";

export default function IEMList() {
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
                      <a className=' font-extrabold text-xl text-sky-500 block py-5'>
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
                          <a className='text-base font-medium py-2 mx-8 flex text-sky-500'>List of IEMs</a>
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

        {/* IEM List Start */}
        <section id='list' className='pt-36 pb-32 bg-white dark:bg-slate-700'>
            <div className='container'>
              <div className='w-full px-4' data-aos="fade-up">
                <div className='mx-auto text-center mb-16'>
                  <h4 className='font-semibold text-lg text-sky-500 mb-2'>List of IEMs</h4>
                  <h2 className='font-bold text-black dark:text-white text-4xl mb-4  '>Daftar Produk</h2>
                  <p className='font-medium text-slate-500 dark:text-slate-300 md:text-lg'>
                  Berikut adalah daftar IEM yang tersedia pada sistem ini:
                  </p>
                </div>
              </div>

              <div className='w-full px-4' data-aos="fade-up">
                <div className=' overflow-auto rounded-lg shadow mb-12'>
                  <table className="w-full ">
                    <thead className=" bg-gray-200 border-b-2 border-gray-200 dark:bg-slate-800 dark:text-white">
                      <tr>
                        {/* <th className="p-3 w-16 text-sm font-semibold tracking-wide text-left">No.</th> */}
                        <th className="p-3 w-12 text-sm font-semibold tracking-wide text-left"></th>
                        <th className="p-3 w-44 text-sm font-semibold tracking-wide text-left">Nama</th>
                        <th className="p-3 w-44 text-sm font-semibold tracking-wide text-left">Harga</th>
                        <th className="p-3 w-20 text-sm font-semibold tracking-wide text-center">Bass</th>
                        <th className="p-3 w-20 text-sm font-semibold tracking-wide text-center">Mid</th>
                        <th className="p-3 w-20 text-sm font-semibold tracking-wide text-center">Treble</th>
                        <th className="p-3 w-32 text-sm font-semibold tracking-wide text-center">Jumlah Driver</th>
                        <th className="p-3 w-24 text-sm font-semibold tracking-wide text-left">Tipe Driver</th>
                        <th className="p-3 w-32 text-sm font-semibold tracking-wide text-center">Link Beli</th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-100">
                      {IEM.map((iem, i) => {
                        const handleOnClose = (e) => {
                          const container = document.getElementById(`${i}`);
                          if(e.target.id === `${i}`) {
                            container.classList.add('hidden');
                          }
                        }
                        return(
                          <>
                          <tr className=" dark:bg-slate-900" key={i}>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                              <img className="h-5 mr-2" src={iem.gambar}/>
                            </td>
                            <td className="p-3 text-sm flex text-gray-700 whitespace-nowrap dark:text-white">
                              
                              <p>{iem.name}</p>
                              <button className="bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800 text-xs hover:bg-sky-500 dark:hover:bg-sky-500 hover:text-white dark:hover:text-white ml-2 px-2 rounded-md" onClick={() => {const container = document.getElementById(`${i}`);container.classList.remove('hidden');}}>Details</button>  
                            </td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-white">
                              {
                                new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(iem.price)
                              }
                            </td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center dark:text-white">{"⭐".repeat(iem.bass)}</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center dark:text-white">{"⭐".repeat(iem.mid)}</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center dark:text-white">{"⭐".repeat(iem.treble)}</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center dark:text-white">{iem.jumlahDriver}</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-white">{iem.tipeDriver}</td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                              <a href={iem.linkBeli} target="_blank" className="py-1 px-2 text-sky-500 bg-transparent border border-sky-500 hover:text-white hover:bg-sky-500 rounded-lg">
                                Klik disini
                              </a>
                            </td>
                          </tr>
                          <div 
                            id={i}
                            onClick={handleOnClose}
                            className="fixed hidden inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                            
                            {/* Modal start */}
                            <div className="bg-sky-500 py-6 dark:bg-slate-800 p-2 rounded w-96">
                                {/* Modal header */}
                                <div className="font-semibold text-center text-lg text-white p-6 mb-4 -mt-2 -mx-2">
                                  <img className="mx-auto h-28 lg:h-44" src={iem.gambar}/>
                                  <h1>
                                  {iem.name}
                                  </h1>
                                </div>
                                <div className="container">
                                  <p className="text-base text-white dark:text-gray-400">Harga : { new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(iem.price)}</p>
                                  <p className="text-base text-white dark:text-gray-400">Bass : {"⭐".repeat(iem.bass)}</p>
                                  <p className="text-base text-white dark:text-gray-400">Mid : {"⭐".repeat(iem.mid)}</p>
                                  <p className="text-base text-white dark:text-gray-400">Treble : {"⭐".repeat(iem.treble)}</p>
                                  <p className="text-base text-white dark:text-gray-400">Jumlah Driver : {iem.jumlahDriver}</p>
                                  <p className="text-base text-white dark:text-gray-400">Tipe Driver : {iem.tipeDriver}</p>
                                  <p className="text-base text-white dark:text-gray-400">Link Beli : <a href={iem.linkBeli} className="font-semibold underline hover:text-slate-800 dark:hover:text-sky-500" target="_blank">Klik disini</a></p>
                                </div>
                            </div>
                            {/* Modal end */}
                          </div>
                        </>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="w-full mb-7">
                  <p className="text-base text-gray-400">
                    Ingin mengetahui IEM mana yang cocok untuk anda?
                  </p>
                </div>
                
                
                <Link href='/recommend'>
                  <a className='text-base font-semibold text-white bg-slate-900 py-3 px-8 rounded-full mr-3 hover:shadow-lg hover:opacity-80 dark:hover:bg-sky-500 dark:hover:text-white dark:hover:opacity-100 transition duration-300 ease-in-out'>
                    Start Now!
                  </a>
                </Link>

                <Link href='/'>
                  <a className='text-base font-semibold text-slate-800 bg-white py-3 px-8 rounded-full border border-slate-800 hover:shadow-lg hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:hover:opacity-100 transition duration-300 ease-in-out'>
                    Back to Home
                  </a>
                </Link>
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
