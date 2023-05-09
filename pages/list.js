import { motion, useScroll, useSpring } from "framer-motion";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SocMedBtn from "../components/SocMedBtn";

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
        welcome.classList.add('z-10');
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
          <link rel="icon" href="https://cdn.discordapp.com/attachments/841587576464736266/896039768499032064/20211008_212135.jpg" />
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
                <div className='flex items-center justify-between relative' data-aos='fade-down' data-aos-delay='500'>
                <div className='px-4'>
                    <a href='#home' className=' font-extrabold text-xl text-sky-500 block py-5'>
                    <h1 className=' text-3xl font-extrabold italic'>urIEM</h1>
                    {/* <Image src={Logo}/> */}
                    </a>
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
                        <a href='/' className='text-base font-medium py-2 mx-8 flex  group-hover:text-sky-500 text-white'>Home</a>
                        </li>
                        <li className='group'>
                        <a href='/list' className='text-base font-medium py-2 mx-8 flex text-sky-500'>List of IEMs</a>
                        </li>
                        <li className='group'>
                        <a href='/about' className='text-base font-medium py-2 mx-8 flex group-hover:text-sky-500 text-white'>About Us</a>
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

        {/* About Section Start */}
        <section id='about' className='pt-36 pb-32 dark:bg-slate-900'>
            <div className='container'>
              <div className='flex flex-wrap'>
                <div className='w-full px-4 mb-10 lg:w-1/2 z-10' data-aos="fade-up">
                  <h4 className='font-bold  text-sky-500 text-lg mb-3'>ABOUT urIEM</h4>
                  <h2 className='font-bold text-slate-900 text-3xl mb-5 max-w-md lg:text-4xl dark:text-white'>Introduction</h2>
                  <p className='font-small text-base text-justify mb-8 text-slate-400 max-w-2xl lg:text-lg'>
                    urIEM adalah sebuah sitem rekomendasi yang bertujuan untuk membantu pengguna memilih
                    IEM yang tepat. Sistem rekomendasi ini menggunakan metode Analytical Hierarchy Process (AHP) 
                    dan Technique for Order Preference by Similarity to an Ideal Solution (TOPSIS) untuk mengkalkulasi
                    rekomendasi produk yang tepat sesuai preferensi yang diinput oleh pengguna.
                  </p>
                  <a href='' className='text-base font-semibold text-white dark:text-slate-800 bg-slate-800 dark:bg-white py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 dark:hover:bg-sky-500 dark:hover:text-white dark:hover:opacity-100 transition duration-300 ease-in-out'>
                    More About Us →
                  </a>
                </div>
                <div className='w-full px-4 lg:w-1/2 z-10' data-aos="fade-up">
                  <h3 className='font-semibold text-slate-900 text-2xl mb-4 lg:text-3xl lg:pt-12 dark:text-white'>Special Thanks!</h3>
                  <p className='font-small text-base text-justify text-slate-400 mb-6 max-w-2xl lg:text-lg'>
                    Pembangunan sistem rekomendasi ini dibantu oleh:
                  </p>
                  <div className='flex items-center'>
                    {/* <SocMedBtn/> */}

                    <div className='mb-5 p-4 text-center w-1/2 lg:w-1/3 mr-3' data-aos="fade-up">
                      <a href='https://www.youtube.com/@glennlatuheru' target='_blank'>
                        <div className='rounded-full mx-auto shadow-md w-40 h-40 overflow-hidden hover:scale-110 duration-300 ease-in-out'>
                          <img src='https://cdn.discordapp.com/attachments/1077723466494640128/1105026586345996288/omglenn.jpg'
                            className=' w-44 h-40'
                          />
                        </div>
                      </a>
                      
                      <h3 className='font-semibold text-md text-black mt-5 mb-1 dark:text-white'>Glenn Latuheru</h3>
                      <p className='font-small text-base text-slate-500 mb-1'>Sinfonia Music</p>
                    </div>

                    <div className='mb-5 p-4 text-center w-1/2 lg:w-1/3' data-aos="fade-up">
                      <a href='https://www.youtube.com/@aftersound_review' target='_blank'>
                        <div className='rounded-full mx-auto shadow-md overflow-hidden w-40 h-40 hover:scale-110 duration-300 ease-in-out'>
                          <img src='https://cdn.discordapp.com/attachments/1077723466494640128/1105026586081775676/aftersound_mike.jpg'
                            className=' w-48 h-40'
                          />
                        </div>
                      </a>
                      
                      <h3 className='font-semibold text-md text-black mt-5 mb-1 dark:text-white'>Michael Natanael Sudarsono</h3>
                      <p className='font-small text-base text-slate-500 mb-1'>Aftersound Review</p>
                    </div>

                    
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        {/* About Section End */}


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
          href='#home' 
          className=' flex justify-center items-center fixed z-[9999] bottom-5 right-5 h-14 w-14 bg-sky-500 rounded-full p-4 hidden hover:animate-pulse hover:-translate-y-2 duration-300 ease-in-out'>
          <span className='block w-5 h-5 border-t-2 border-l-2 rotate-45 mt-2'></span>
        </a>
        {/* Back To Top End */}


    </>
  )
}
