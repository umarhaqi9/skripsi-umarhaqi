import { motion, useScroll, useSpring } from "framer-motion";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
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

  // const preference = useRef();
  const [priority1, setPriority1] = useState(50);
  const [priority2, setPriority2] = useState(50);
  const [priority3, setPriority3] = useState(50);
  const [priceRange, setPriceRange] = useState(0);
  const [dataRekomendasiIEM, setDataRekomendasiIEM] = useState([]);

  function calculate(){
    console.log("Prioritas 1 :" + priority1);
    console.log("Prioritas 2 :" + priority2);
    console.log("Prioritas 3 :" + priority3);
    console.log("Price :" + priceRange);

    const inputSection = document.querySelector('#inputSection');
    const result = document.querySelector('#result');
    const submitButton = document.querySelector('#submitButton');
    const loadingButton = document.querySelector('#loadingButton');

    submitButton.classList.add('hidden');
    loadingButton.classList.remove('hidden');
    

    // --------------------------------------------
    // AHP
    const bobotPrioritas = [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ]

    // check priority1
    if(priority1 == 50){
      bobotPrioritas[0][1]= 1;
      bobotPrioritas[1][0]= 1;
    } 
    else if(priority1 == 37.5){
      bobotPrioritas[0][1]= 2;
      bobotPrioritas[1][0]= 1/2;
    }
    else if(priority1 == 25){
      bobotPrioritas[0][1]= 3;
      bobotPrioritas[1][0]= 1/3;
    }
    else if(priority1 == 12.5){
      bobotPrioritas[0][1]= 4;
      bobotPrioritas[1][0]= 1/4;
    }
    else if(priority1 == 0){
      bobotPrioritas[0][1]= 5;
      bobotPrioritas[1][0]= 1/5;
    }
    else if(priority1 == 62.5){
      bobotPrioritas[0][1]= 1/2;
      bobotPrioritas[1][0]= 2;
    }
    else if(priority1 == 75){
      bobotPrioritas[0][1]= 1/3;
      bobotPrioritas[1][0]= 3;
    }
    else if(priority1 == 87.5){
      bobotPrioritas[0][1]= 1/4;
      bobotPrioritas[1][0]= 4;
    }
    else if(priority1 == 100){
      bobotPrioritas[0][1]= 1/5;
      bobotPrioritas[1][0]= 5;
    }
    
    // check priority2
    if(priority2 == 50){
      bobotPrioritas[1][2]= 1;
        bobotPrioritas[2][1]= 1;
    } 
    else if(priority2 == 37.5){
      bobotPrioritas[1][2]= 2;
        bobotPrioritas[2][1]= 1/2;
    }
    else if(priority2 == 25){
      bobotPrioritas[1][2]= 3;
        bobotPrioritas[2][1]= 1/3;
    }
    else if(priority2 == 12.5){
      bobotPrioritas[1][2]= 4;
        bobotPrioritas[2][1]= 1/4;
    }
    else if(priority2 == 0){
      bobotPrioritas[1][2]= 5;
        bobotPrioritas[2][1]= 1/5;
    }
    else if(priority2 == 62.5){
      bobotPrioritas[1][2]= 1/2;
        bobotPrioritas[2][1]= 2;
    }
    else if(priority2 == 75){
      bobotPrioritas[1][2]= 1/3;
        bobotPrioritas[2][1]= 3;
    }
    else if(priority2 == 87.5){
      bobotPrioritas[1][2]= 1/4;
        bobotPrioritas[2][1]= 4;
    }
    else if(priority2 == 100){
      bobotPrioritas[1][2]= 1/5;
        bobotPrioritas[2][1]= 5;
    }
    
    
    // check priority3
    if(priority3 == 50){
      bobotPrioritas[0][2]= 1;
      bobotPrioritas[2][0]= 1;
    } 
    else if(priority3 == 62.5){
      bobotPrioritas[0][2]= 2;
      bobotPrioritas[2][0]= 1/2;
    }
    else if(priority3 == 75){
      bobotPrioritas[0][2]= 3;
      bobotPrioritas[2][0]= 1/3;
    }
    else if(priority3 == 87.5){
      bobotPrioritas[0][2]= 4;
      bobotPrioritas[2][0]= 1/4;
    }
    else if(priority3 == 100){
      bobotPrioritas[0][2]= 5;
      bobotPrioritas[2][0]= 1/5;
    }
    else if(priority3 == 37.5){
      bobotPrioritas[0][2]= 1/2;
      bobotPrioritas[2][0]= 2;
    }
    else if(priority3 == 25){
      bobotPrioritas[0][2]= 1/3;
      bobotPrioritas[2][0]= 3;
    }
    else if(priority3 == 12.5){
      bobotPrioritas[0][2]= 1/4;
      bobotPrioritas[2][0]= 4;
    }
    else if(priority3 == 0){
      bobotPrioritas[0][2]= 1/5;
      bobotPrioritas[2][0]= 5;
    }

    console.log(bobotPrioritas);

    const sum = [1,1,1];

    for(let i = 0; i < 3; i++){
      let totalSum = 0;
      for(let j = 0; j < 3; j++){
        totalSum += bobotPrioritas[j][i];
      }
      sum[i] = totalSum;
    }

    console.log("Sum :" + sum);

    const normalisasi = [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ];

    for(let i=0; i < sum.length; i++){
      for(let j=0; j < sum.length; j++){
        normalisasi[i][j] = bobotPrioritas[i][j]/sum[j];
      }
    }

    console.log(normalisasi);

    const sumVector = [1,1,1];
    const eigenVector = [1,1,1];

    for(let i=0; i < 3; i++){
      let total = 0;
      for(let j=0; j < 3; j++){
        total += normalisasi[i][j];
      }
      sumVector[i] = total;
      eigenVector[i] = sumVector[i]/sum.length;
    }

    console.log("Sum Vector : " + sumVector);
    console.log("Eigen Vector : " + eigenVector);

    const eigenValue = [1,1,1];

    for(let i=0; i < 3; i++){
      // Cara 1
      // eigenValue[i] = sum[i] * eigenVector[i];
      // Cara 2
      eigenValue[i] = sumVector[i] * eigenVector[i];
    }

    console.log("Eigen Value : " + eigenValue);

    let eigenMax = 0;

    for(let i=0; i < eigenValue.length; i++){
      eigenMax += eigenValue[i];
    }

    console.log("Eigen Maks : " + eigenMax);

    const CI = (eigenMax-3)/(3-1);
    const CR = CI/0.58;

    console.log("CI : " + CI);
    console.log("CR : " + CR);

    if(CR > 0.1){
      submitButton.classList.remove('hidden');
      loadingButton.classList.add('hidden');
      return alert("Hasil input preferensi anda kurang konsisten, mohon masukkan ulang preferensi anda.");
    } else {
      console.log("Hasil input preferensi anda sudah konsisten, proses perhitungan dapat dilanjutkan ke dalam tahap TOPSIS.");
      // -------------------------------------------
      // TOPSIS
      // -------------------------------------------
      // Menentukan matriks ternormalisasi
      let sumBass = 0;
      let sumMid = 0;
      let sumTreble = 0;

      IEM.forEach((iem) => {
        sumBass += iem.bass * iem.bass;
        sumMid += iem.mid * iem.mid;
        sumTreble += iem.treble * iem.treble;
      });

      sumBass = Math.sqrt(sumBass);
      sumMid = Math.sqrt(sumMid);
      sumTreble = Math.sqrt(sumTreble);

      console.log("Sum Bass : " + sumBass);
      console.log("Sum Mid : " + sumMid);
      console.log("Sum Treble : " + sumTreble);

      const normalisasiIEM = [];
      const normalisasiBobotIEM = [];

      IEM.forEach((iem) => {
        let bass = 0;
        let mid = 0;
        let treble = 0;

        bass += iem.bass/sumBass;
        mid += iem.mid/sumMid;
        treble += iem.treble/sumTreble;

        normalisasiIEM.push([iem.name, iem.price, bass, mid, treble, iem.linkBeli, iem.bass, iem.mid, iem.treble ]);

        bass = bass * eigenVector[0];
        mid = mid * eigenVector[1];
        treble = treble * eigenVector[2];

        normalisasiBobotIEM.push([iem.name, iem.price, bass, mid, treble, iem.linkBeli, iem.gambar, iem.bass, iem.mid, iem.treble, iem.jumlahDriver, iem.tipeDriver ]);

      })
      
      console.log(normalisasiIEM);
      console.log(normalisasiBobotIEM);

      // Solusi ideal

      const totalBass = [];
      const totalMid = [];
      const totalTreble = [];

      normalisasiBobotIEM.forEach((iem) => {
        totalBass.push(iem[2]);
        totalMid.push(iem[3]);
        totalTreble.push(iem[4]);
      })

      console.log(totalBass);
      console.log(totalMid);
      console.log(totalTreble);

      let yNegatifBass = Math.max(...totalBass);
      let yPositifBass = Math.min(...totalBass);
      let yNegatifMid = Math.max(...totalMid);
      let yPositifMid = Math.min(...totalMid);
      let yNegatifTreble = Math.max(...totalTreble);
      let yPositifTreble = Math.min(...totalTreble);

      console.log("y- Bass : "+yNegatifBass);
      console.log("y+ Bass : "+yPositifBass);
      console.log("y- Mid : "+yNegatifMid);
      console.log("y+ Mid : "+yPositifMid);
      console.log("y- Treble : "+yNegatifTreble);
      console.log("y+ Treble : "+yPositifTreble);

      let solusiIdealIEM = [];

      normalisasiBobotIEM.forEach((iem) => {
        let sPositif = 0;
        let sNegatif = 0;
        
        sPositif += Math.sqrt(((iem[2]-yPositifBass)*(iem[2]-yPositifBass))+((iem[3]-yPositifMid)*(iem[3]-yPositifMid))+((iem[4]-yPositifTreble)*(iem[4]-yPositifTreble)));
        sNegatif += Math.sqrt(((iem[2]-yNegatifBass)*(iem[2]-yNegatifBass))+((iem[3]-yNegatifMid)*(iem[3]-yNegatifMid))+((iem[4]-yNegatifTreble)*(iem[4]-yNegatifTreble)));

        
        solusiIdealIEM.push({name: iem[0], price:iem[1], sPositif: sPositif, sNegatif: sNegatif, linkBeli: iem[5], gambar: iem[6], bass: iem[7], mid:iem[8], treble:iem[9], jumlahDriver: iem[10], tipeDriver: iem[11] });
        
      })
      console.log(solusiIdealIEM);

      let rekomendasiIEM = [];

      solusiIdealIEM.forEach((iem) => {
        let preferensi = 0;
        preferensi += iem.sNegatif/(iem.sPositif + iem.sNegatif);

        rekomendasiIEM.push({name: iem.name, price: iem.price, preferensi: preferensi, linkBeli: iem.linkBeli, gambar: iem.gambar, bass: iem.bass, mid:iem.mid, treble: iem.treble, jumlahDriver: iem.jumlahDriver, tipeDriver: iem.tipeDriver});

      })
      console.log(rekomendasiIEM);

      rekomendasiIEM.sort((a, b) => b.preferensi - a.preferensi);


      
      if(priceRange !== 0){
        let filteredDataIEM = rekomendasiIEM.filter((iem) => iem.price <= priceRange);
        setDataRekomendasiIEM(filteredDataIEM);
      } else{
        setDataRekomendasiIEM(rekomendasiIEM);
      }

      inputSection.classList.add('hidden');
      result.classList.remove('hidden');

    }

  }

  
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
                  <h4 className='font-semibold text-lg text-sky-500 mb-2'>Rekomendasi</h4>
                  <h2 className='font-bold text-black dark:text-white text-4xl mb-4'>Temukan IEM Anda!</h2>
                  <p className='font-medium text-slate-500 dark:text-slate-300 md:text-lg'>
                  Masukkan preferensi anda :
                  </p>
                </div>
              </div>

              {/* Input Section */}
              <div id="inputSection" className='w-full px-4' data-aos="fade-up">
                <div className='w-full p-4 bg-slate-50 dark:bg-slate-900 dark:text-white shadow-md rounded-lg' data-aos="fade-up">
                    <div className="container">
                        {/* <form ref={preference} onSubmit={calculateIEM}> */}
                          <div className='w-full py-4 flex'>
                              <div className=" w-4/6 mx-auto flex justify-center space-x-3 lg:space-x-20">
                                <p className=' lg:text-lg text-sm text-black dark:text-white'>5</p>
                                <p className=' lg:text-lg text-sm text-black dark:text-white'>4</p>
                                <p className=' lg:text-lg text-sm text-black dark:text-white'>3</p>
                                <p className=' lg:text-lg text-sm text-black dark:text-white'>2</p>
                                <p className=' lg:text-lg text-sm text-black dark:text-white'>Equal</p>
                                <p className=' lg:text-lg text-sm text-black dark:text-white'>2</p>
                                <p className=' lg:text-lg text-sm text-black dark:text-white'>3</p>
                                <p className=' lg:text-lg text-sm text-black dark:text-white'>4</p>
                                <p className=' lg:text-lg text-sm text-black dark:text-white'>5</p>
                              </div>
                          </div>
                          <div className='w-full py-6 flex mb-8'>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 text-left'>Bass</p>
                              <div className=" w-4/6">
                                  <input type="range" step={12.5} name="priority1" defaultValue={50} onChange={(e) => setPriority1(e.target.value)} className="w-full justify-center"/>
                              </div>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 order-last text-right'>Mid</p>
                          </div>
                          <div className='w-full py-6 flex mb-8'>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 text-left'>Mid</p>
                              <div className="w-4/6">
                                  <input type="range" step={12.5} name="priority2" defaultValue={50} onChange={(e) => setPriority2(e.target.value)} className="w-full justify-center"/>
                              </div>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 order-last text-right'>Treble</p>
                          </div>
                          <div className='w-full py-6 flex mb-8'>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 text-left'>Treble</p>
                              <div className="w-4/6">
                                  <input type="range" step={12.5} name="priority3" defaultValue={50} onChange={(e) => setPriority3(e.target.value)} className="w-full justify-center"/>
                              </div>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 order-last text-right'>Bass</p>
                          </div>
                          <div className='w-full py-6 flex mb-2'>
                              <p className='w-full lg:text-lg text-sm text-black dark:text-white lg:w-1/6 text-left'>Price Range :</p>
                              <div className="lg:w-4/6">
                                  <select type="dropdown" defaultValue={0} name="price" onChange={(e) => setPriceRange(e.target.value)} className="border lg:text-lg text-sm border-sky-500 text-black rounded-lg px-4 py-2">
                                    <option value={0}> Any </option>
                                    <option value={300000}> {"<"} Rp300.000 </option>
                                    <option value={500000}> {"<"} Rp500.000 </option>
                                    <option value={700000}> {"<"} Rp700.000 </option>
                                    <option value={900000}> {"<"} Rp900.000 </option>
                                  </select>
                              </div>
                              
                          </div>
                          <div id="submitButton" className="w-full py-4 flex">
                            <button id="submit" onClick={calculate} className='text-base mr-3 font-semibold text-white bg-slate-800 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 dark:bg-sky-500 dark:hover:bg-white dark:hover:text-black dark:hover:opacity-100 transition duration-300 ease-in-out'>
                              Cari IEM
                            </button>
                            <Link href='/'>
                              <a className='text-base font-semibold text-slate-800 bg-white py-3 px-8 rounded-full border border-slate-800 hover:shadow-lg hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:hover:opacity-100 transition duration-300 ease-in-out'>
                                Back to Home
                              </a>
                            </Link>
                          </div>
                          <div id="loadingButton" className="w-full py-4 flex hidden">
                          <button id='load' className='flex justify-center text-base font-semibold text-white bg-sky-300 py-3 px-8 rounded-full transition duration-500' disabled>
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </button>
                          </div>
                        {/* </form> */}
                    </div>
                </div>
              </div>

              {/* Result Section */}
              <div id="result" className='w-full px-4 mt-20 hidden' data-aos="fade-up">
                <div className='w-full p-4 bg-slate-50 dark:bg-slate-900 dark:text-white shadow-md rounded-lg' data-aos="fade-up">
                    <div className="container">
                    <div className='w-full px-4'>
                      <div className='mx-auto text-center mb-16'>
                        {/* <h4 className='font-semibold text-lg text-sky-500 mb-2'>Recommendation</h4> */}
                        <h2 className='font-bold text-black dark:text-white text-4xl mb-6 mt-8'>Ini IEM untuk anda!</h2>
                        {/* <div className="group"> */}
                          <div className="your-iem-bg hover:scale-110 bg-sky-500 py-5 lg:py-10 mb-6 lg:w-1/3 mx-auto transition ease-in-out duration-300">
                            {dataRekomendasiIEM.map((iem, i) => {
                              while(i < 1){
                                return(
                                  <a key={i} href={iem.linkBeli} target="_blank" className="">
                                    <img className="mx-auto h-28 lg:w-44 lg:h-44" src={iem.gambar}/>
                                    <h2 className='font-bold text-white text-lg lg:text-2xl my-4 uppercase'>{iem.name}</h2>
                                    <h2 className='font-semibold text-white text-md lg:text-lg my-4 uppercase'>
                                      {
                                        new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(iem.preferensi)
                                      }
                                    </h2>
                                  </a>
                                )
                              }
                            })}
                          </div>
                        {/* </div> */}
                        <p className='font-medium text-slate-500 dark:text-slate-300 md:text-lg'>
                        Ini adalah beberapa IEM yang sesuai dengan preferensi anda :
                        </p>
                      </div>
                    </div>

                    <div className=' overflow-auto rounded-lg shadow mb-8'>
                        <table className="w-full">
                          <thead className=" bg-gray-200 border-b-2 border-gray-200 dark:bg-slate-800 dark:text-white">
                            <tr>
                              {/* <th className="p-3 w-16 text-sm font-semibold tracking-wide text-left">No.</th> */}
                              <th className="p-3 w-44 text-sm font-semibold tracking-wide text-left">Nama</th>
                              <th className="p-3 w-44 text-sm font-semibold tracking-wide text-center">Preferensi</th>
                              <th className="p-3 w-32 text-sm font-semibold tracking-wide text-center">Link Beli</th>
                            </tr>
                          </thead>
                          <tbody className=" divide-y divide-gray-100">
                            {dataRekomendasiIEM.map((iem, i) => {
                              const handleOnClose = (e) => {
                                const container = document.getElementById(`${i}`);
                                if(e.target.id === `${i}`) {
                                  container.classList.add('hidden');
                                }
                              }
                              return(
                                <>
                                  <tr className=" dark:bg-slate-900" key={i}>
                                    <td className="p-3 text-sm flex text-gray-700 whitespace-nowrap dark:text-white">
                                      <img className="h-5 mr-2" src={iem.gambar}/>
                                      <p>{iem.name}</p>
                                      <button className="bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800 text-xs hover:bg-sky-500 hover:text-white ml-2 px-2 rounded-md" onClick={() => {const container = document.getElementById(`${i}`);container.classList.remove('hidden');}}>Details</button>
                                    </td>
                                    {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-white text-center">{Math.floor((iem.preferensi * 100)).toFixed(1)}%</td> */}
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-white text-center">
                                      {
                                        new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(iem.preferensi)
                                      }
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                      <a href={iem.linkBeli} target="_blank" className="py-1 px-2 text-sky-500 bg-transparent border border-sky-500 hover:text-white hover:bg-sky-500 rounded-lg">
                                        Click Here
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
                                          <p>
                                            {
                                              new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(iem.preferensi)
                                            }  
                                          </p>
                                        </div>
                                        <div className="container">
                                          <p className="text-base text-white dark:text-gray-400">Harga : { new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(iem.price)}</p>
                                          <p className="text-base text-white dark:text-gray-400">Bass : {"⭐".repeat(iem.bass)}</p>
                                          <p className="text-base text-white dark:text-gray-400">Mid : {"⭐".repeat(iem.mid)}</p>
                                          <p className="text-base text-white dark:text-gray-400">Treble : {"⭐".repeat(iem.treble)}</p>
                                          <p className="text-base text-white dark:text-gray-400">Jumlah Driver : {iem.jumlahDriver}</p>
                                          <p className="text-base text-white dark:text-gray-400">Tipe Driver : {iem.tipeDriver}</p>
                                          <p className="text-base text-white dark:text-gray-400">Tipe Driver : <a href={iem.linkBeli} className="font-semibold underline hover:text-slate-800 dark:hover:text-sky-500" target="_blank">Klik disini</a></p>
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

                      <div className="w-full mb-6">
                        
                        <div className='w-full py-6 flex flex-wrap justify-between mb-8'>
                          <p className=' text-left'>
                            <p className="text-base text-gray-400 mb-6">
                              Kurang puas?
                            </p>
                            <a href='/recommend' className='text-base mr-3 font-semibold text-white bg-slate-800 dark:bg-slate-100 dark:text-slate-800 py-3 px-8 rounded-full mb-8 hover:shadow-lg hover:opacity-80 dark:hover:bg-sky-500 dark:hover:text-white dark:hover:opacity-100 transition duration-300 ease-in-out'>
                              Coba Lagi...
                            </a>
                            <Link href='/'>
                              <a className='text-base font-semibold text-slate-800 bg-white py-3 px-8 rounded-full border border-slate-800 hover:shadow-lg hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:hover:opacity-100 transition duration-300 ease-in-out'>
                                Back to Home
                              </a>
                            </Link>
                          </p>
                          <p className=' my-auto order-last mt-10 lg:mt-0 lg:text-right'>
                            <p className="text-base text-gray-400 mb-6">
                              Jika berkenan, mohon bantuannya mengisi survey berikut :
                            </p>
                            <a href='https://forms.gle/DVJy2HEBHtF8NSxh6' target="_blank" className='text-base font-semibold text-slate-800 bg-white dark:bg-slate-100 border dark:hover:text-white border-slate-800 dark:text-slate-800 py-3 px-8 rounded-full mb-8 hover:shadow-lg hover:border-sky-500 dark:hover:border-sky-500 hover:bg-sky-500 dark:hover:bg-sky-500 hover:text-white transition duration-300 ease-in-out'>
                              Survey
                            </a>
                          </p>
                        </div>
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
