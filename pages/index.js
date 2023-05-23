import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Head from 'next/head';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Script from 'next/script';
import SocMedBtn from '../components/SocMedBtn';
import { IEM } from '../components/iem_db';
import Link from 'next/link';



export default function Home() {
  // For Framer motion to track scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Framer motion splash screen
  // const [showContent, setShowContent] = useState(false);


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
    const welcome = document.querySelector('#herowelcome');
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('hamburgeractive');
      navMenu.classList.toggle('hidden');
      welcome.classList.toggle('z-10');
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
    const home = document.querySelector('#home');
    const splash = document.querySelector('#splash');
    
    
    darkToggle.addEventListener('click', function(){
      if(darkToggle.checked) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
        home.classList.add('herodark-bg');
        home.classList.remove('hero-bg');
        splash.classList.add('splash-bg-dark');
        splash.classList.remove('splash-bg');

      } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
        home.classList.remove('herodark-bg');
        home.classList.add('hero-bg');
        splash.classList.remove('splash-bg-dark');
        splash.classList.add('splash-bg');
      }
    })
  
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      darkToggle.checked = true;
      home.classList.add('herodark-bg');
      home.classList.remove('hero-bg');
      // splash.classList.add('splash-bg-dark');
      // splash.classList.remove('splash-bg');
    } else {
      document.documentElement.classList.remove('dark')
      darkToggle.checked = false;
      home.classList.remove('herodark-bg');
      home.classList.add('hero-bg');
      // splash.classList.remove('splash-bg-dark');
      // splash.classList.add('splash-bg');
    }
    
    // AOS
    AOS.init({
      duration: 800
    });
    
    // Framer stuff
       


  })
  
  return (
    <>

      {/* Splash screen start*/}
        <motion.div
          id='splash'
          initial={{height: "100%"}}
          animate={{
            height: "0%",
            transition: {ease: [0.455, 0.03, 0.515, 0.959], duration: 3.8},
            
          }}
          // onAnimationComplete={ () => setShowContent(true)}
          className="absolute splash-bg h-screen w-full"
        >
          <motion.div 
            initial={{opacity: 1}}
            animate={{opacity: 0, transition: {duration: 2.0}}}
            className='h-screen flex items-center justify-center text-sky-500 font-bold text-5xl'>
            Welcome
          </motion.div>
        </motion.div>

      {/* Splash screen end */}

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
              <div className='flex items-center justify-between relative' data-aos='fade-down' data-aos-delay='3000'>
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
                        <Link href='#home'>
                          <a  className='text-base font-medium py-2 mx-8 flex text-sky-500'>Home</a>
                        </Link>
                      </li>
                      <li className='group'>
                        <Link href='/list'>
                          <a  className='text-base font-medium py-2 mx-8 flex group-hover:text-sky-500 text-white'>List of IEMs</a>
                        </Link>
                      </li>
                      <li className='group'>
                        <Link href='/about'>
                          <a  className='text-base font-medium py-2 mx-8 flex group-hover:text-sky-500 text-white'>About Us</a>
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
        
        {/* Hero Section Start */}
          <section id='home' className=' py-80 hero-bg'>
            <div className='container' >
              <div className='flex flex-wrap'>
                <div id='herowelcome' className='w-full self-center px-4 lg:w-1/2 z-10' data-aos="fade-right" data-aos-delay="3000">
                  <h1 className='text-base font-semibold text-sky-500 md:text-xl mb-5'><span className='block font-bold text-slate-900 text-4xl mt-1'>Temukan IEM Yang Tepat Untuk Anda!</span></h1>
                  {/* <h2 className='font-medium text-slate-500 text-lg mt-2 mb-5 lg:text-2xl'>Student & 
                  <span className='text-slate-900 dark:text-white'> Front-End Developer</span></h2> */}
                  <p className='font-base text-white mb-10 leading-relaxed'>
                  Kami akan merekomendasikan IEM yang tepat untuk <span className='font-bold text-sky-500'> anda.</span>
                  </p>
                  <Link href='/recommend'>
                    <a className='text-base font-semibold text-white bg-slate-800 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out'>
                      Start Now!
                    </a>
                  </Link>
                  <Link href='#instruction'>
                    <a className='text-base font-semibold text-slate-800 bg-white ml-3 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out'>
                      Learn More
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        {/* Hero Section End */}

        

        {/* Instruction Section Start */}

          <section id='instruction' className='pt-36 pb-16 bg-white dark:bg-slate-900'>
            <div className='container'>
              <div className='w-full px-4' data-aos="fade-up">
                <div className='max-w-xl mx-auto text-center mb-16'>
                  <h4 className='font-semibold text-lg text-sky-500 mb-2'>Cari IEM</h4>
                  <h2 className='font-bold text-black text-3xl mb-4 dark:text-white'>Cara Menggunakan</h2>
                  <p className='font-medium text-slate-500 md:text-lg'>
                    Ada 3 tahapan dalam sistem rekomendasi ini:
                  </p>
                </div>
              </div>

              <div className='w-full px-4 flex flex-wrap justify-center xl:w-10/12 xl:mx-auto'>
                <div className='mb-12 p-4 md:w-1/3 text-center' data-aos="fade-up" >
                  <h3 className='font-semibold text-8xl text-black mt-5 mb-3 dark:text-white'>1</h3>
                  <p className='font-small text-3xl text-black dark:text-white mb-3'>Klik</p>
                  <p className='font-small text-sm text-slate-500 mb-5'>Klik tombol “Start Now!” untuk memulai proses rekomendasi IEM untuk anda.</p>
                </div>

                <div className='mb-12 p-4 md:w-1/3 text-center' data-aos="fade-up" >
                  <h3 className='font-semibold text-8xl text-black mt-5 mb-3 dark:text-white'>2</h3>
                  <p className='font-small text-3xl text-black dark:text-white mb-3'>Isi</p>
                  <p className='font-small text-sm text-slate-500 mb-5'>
                  Isi bobot segmen suara sesuai preferensi yang anda miliki. Bobot tersebut akan dihitung untuk mencari IEM yang tepat untuk anda.
                  </p>
                </div>

                <div className='mb-12 p-4 md:w-1/3 text-center' data-aos="fade-up" >
                  <h3 className='font-semibold text-8xl text-black mt-5 mb-3 dark:text-white'>3</h3>
                  <p className='font-small text-3xl text-black dark:text-white mb-3'>Selesai</p>
                  <p className='font-small text-sm text-slate-500 mb-5'>Ditampilkannya IEM yang sesuai dengan kriteria preferensi anda.</p>
                </div>
              </div>
              
              <div className='w-full px-4' data-aos="fade-up">
                <div className='max-w-xl mx-auto text-center mb-16'>
                  <Link href='/recommend'>
                    <a  className='text-lg font-semibold text-black dark:text-white hover:text-white bg-transparent hover:bg-slate-800 dark:hover:bg-sky-500 py-3 px-8 border border-black dark:border-white dark:hover:border-sky-500 rounded-full hover:shadow-lg transition duration-300 ease-in-out'>
                      Start Now!
                    </a>
                  </Link>
                </div>
              </div>

            </div>
          </section>

        {/* Instruction Section End */}

        {/* About Section Start */}
          <section id='about' className='pt-36 pb-32 bg-slate-100 dark:bg-slate-800 '>
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
                  <a href='/about' className='text-base font-semibold text-white dark:text-slate-800 bg-slate-800 dark:bg-slate-100 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 dark:hover:bg-sky-500 dark:hover:text-white dark:hover:opacity-100 transition duration-300 ease-in-out'>
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
                          <img src='https://yt3.googleusercontent.com/ytc/AGIKgqOi51s4jPn8DHgvAcrHdDg8hulBqiKxhk1N_pyG=s900-c-k-c0x00ffffff-no-rj'
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

        {/* IEM List Start */}
          <section id='list' className='pt-36 pb-32 bg-white dark:bg-slate-700'>
            <div className='container'>
              <div className='w-full px-4' data-aos="fade-up">
                <div className='mx-auto text-center mb-16'>
                  <h4 className='font-semibold text-lg text-sky-500 mb-2'>IEMs</h4>
                  <h2 className='font-bold text-black dark:text-white text-4xl mb-4'>Daftar Produk</h2>
                  <p className='font-medium text-slate-500 dark:text-slate-300 md:text-lg'>
                  Berikut adalah beberapa IEM yang tersedia pada sistem ini:
                  </p>
                </div>
              </div>

              <div className='w-full px-4' data-aos="fade-up">
                {IEM.map((iem, i) => {
                  while(i < 15){
                    return(
                      <div key={i} className='w-full py-6 flex justify-between text-black bg-slate-50 dark:bg-slate-900 dark:text-white shadow-md rounded-lg mb-8'>
                        <p className=' text-sm lg:text-lg ml-5 text-left'>
                          <img className=' max-h-12 mb-2' src={iem.gambar}/>
                          {iem.name}
                        </p>
                        <p className=' text-sm lg:text-lg mr-5 my-auto order-last text-right'>
                          {
                            new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(iem.price)
                          }
                        </p>
                      </div>
                    )
                  }
                  
                })}
                
                <Link href='/list'>
                  <a className='text-base font-semibold text-white bg-slate-800 py-3 dark:bg-slate-100 dark:text-slate-800 px-8 rounded-full hover:shadow-lg hover:opacity-80 dark:hover:bg-sky-500 dark:hover:text-white dark:hover:opacity-100 transition duration-300 ease-in-out'>
                    See All
                  </a>
                </Link>
              </div>
            </div>
          </section>
        {/* Skills End */}

        

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

      {/* </motion.div> */}

      </>
  )
}
