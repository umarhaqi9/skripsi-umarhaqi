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
    else if(priority1 == 25){
      bobotPrioritas[0][1]= 2;
      bobotPrioritas[1][0]= 1/2;
    }
    else if(priority1 == 0){
      bobotPrioritas[0][1]= 3;
      bobotPrioritas[1][0]= 1/3;
    }
    else if(priority1 == 75){
      bobotPrioritas[0][1]= 1/2;
      bobotPrioritas[1][0]= 2;
    }
    else if(priority1 == 100){
      bobotPrioritas[0][1]= 1/3;
      bobotPrioritas[1][0]= 3;
    }
    
    // check priority2
    if(priority2 == 50){
      bobotPrioritas[1][2]= 1;
        bobotPrioritas[2][1]= 1;
    } 
    else if(priority2 == 25){
      bobotPrioritas[1][2]= 2;
        bobotPrioritas[2][1]= 1/2;
    }
    else if(priority2 == 0){
      bobotPrioritas[1][2]= 3;
        bobotPrioritas[2][1]= 1/3;
    }
    else if(priority2 == 75){
      bobotPrioritas[1][2]= 1/2;
        bobotPrioritas[2][1]= 2;
    }
    else if(priority2 == 100){
      bobotPrioritas[1][2]= 1/3;
        bobotPrioritas[2][1]= 3;
    }
    
    // check priority3
    if(priority3 == 50){
      bobotPrioritas[0][2]= 1;
      bobotPrioritas[2][0]= 1;
    } 
    else if(priority3 == 25){
      bobotPrioritas[0][2]= 2;
      bobotPrioritas[2][0]= 1/2;
    }
    else if(priority3 == 0){
      bobotPrioritas[0][2]= 3;
      bobotPrioritas[2][0]= 1/3;
    }
    else if(priority3 == 75){
      bobotPrioritas[0][2]= 1/2;
      bobotPrioritas[2][0]= 2;
    }
    else if(priority3 == 100){
      bobotPrioritas[0][2]= 1/3;
      bobotPrioritas[2][0]= 3;
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
      eigenValue[i] = sum[i] * eigenVector[i];
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
      return alert("Hasil input preferensi anda tidak konsisten, mohon masukkan ulang preferensi anda.");
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

        normalisasiIEM.push([iem.name, iem.price, bass, mid, treble, iem.linkBeli]);

        bass = bass * eigenVector[0];
        mid = mid * eigenVector[1];
        treble = treble * eigenVector[2];

        normalisasiBobotIEM.push([iem.name, iem.price, bass, mid, treble, iem.linkBeli]);

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

        
        solusiIdealIEM.push({name: iem[0], price:iem[1], sPositif: sPositif, sNegatif: sNegatif, linkBeli: iem[5]});
        
      })
      console.log(solusiIdealIEM);

      let rekomendasiIEM = [];

      solusiIdealIEM.forEach((iem) => {
        let preferensi = 0;
        preferensi += iem.sNegatif/(iem.sPositif + iem.sNegatif);

        rekomendasiIEM.push({name: iem.name, price: iem.price, preferensi: preferensi, linkBeli: iem.linkBeli});

      })
      console.log(rekomendasiIEM);


      
      if(priceRange >= 0){
        let filteredDataIEM = rekomendasiIEM.filter((iem) => iem.price <= priceRange);
        setDataRekomendasiIEM(filteredDataIEM);
      } else{
        setDataRekomendasiIEM(rekomendasiIEM);
      }


    }

  }

  // const calculateIEM = (e) => {
  //   // e.preventDefault();
  //   console.log(preference.current);
  // }


  
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
                <div className='w-full p-4 bg-slate-50 dark:bg-slate-900 dark:text-white shadow-md rounded-lg' data-aos="fade-up">
                    <div className="container">
                        {/* <form ref={preference} onSubmit={calculateIEM}> */}
                          <div className='w-full py-6 flex mb-8'>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 text-left'>Bass</p>
                              <div className=" w-4/6">
                                  <input type="range" step={25} name="priority1" defaultValue={50} onChange={(e) => setPriority1(e.target.value)} className="w-full justify-center"/>
                              </div>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 order-last text-right'>Mid</p>
                          </div>
                          <div className='w-full py-6 flex mb-8'>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 text-left'>Mid</p>
                              <div className="w-4/6">
                                  <input type="range" step={25} name="priority2" defaultValue={50} onChange={(e) => setPriority2(e.target.value)} className="w-full justify-center"/>
                              </div>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 order-last text-right'>Treble</p>
                          </div>
                          <div className='w-full py-6 flex mb-8'>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 text-left'>Bass</p>
                              <div className="w-4/6">
                                  <input type="range" step={25} name="priority3" defaultValue={50} onChange={(e) => setPriority3(e.target.value)} className="w-full justify-center"/>
                              </div>
                              <p className=' lg:text-lg text-sm text-black dark:text-white w-1/6 order-last text-right'>Treble</p>
                          </div>
                          <div className='w-full py-6 flex mb-2'>
                              <p className='w-full lg:text-lg text-sm text-black dark:text-white lg:w-1/6 text-left'>Price Range :</p>
                              <div className="lg:w-4/6">
                                  <select type="dropdown" defaultValue={0} name="price" onChange={(e) => setPriceRange(e.target.value)} className="border lg:text-lg text-sm border-sky-500 text-black rounded-lg px-4 py-2">
                                    <option> Any </option>
                                    <option value={300000}> Under Rp300.000 </option>
                                    <option value={500000}> Under Rp500.000 </option>
                                    <option value={700000}> Under Rp700.000 </option>
                                    <option value={900000}> Under Rp900.000 </option>
                                  </select>
                              </div>
                              
                          </div>
                          <div className="w-full py-6 flex">
                            <button id="submit" onClick={calculate} className='text-base font-semibold text-white bg-slate-800 py-3 px-8 rounded-full mr-3 hover:shadow-lg hover:opacity-80 dark:bg-sky-500 dark:hover:bg-white dark:hover:text-black dark:hover:opacity-100 transition duration-300 ease-in-out'>
                              Find IEM
                            </button>
                          </div>
                        {/* </form> */}
                    </div>
                </div>
              </div>

              {/* Result Section */}
              <div className='w-full px-4 mt-20' data-aos="fade-up">
                <div className='w-full p-4 bg-slate-50 dark:bg-slate-900 dark:text-white shadow-md rounded-lg' data-aos="fade-up">
                    <div className="container">
                    <div className='w-full px-4'>
                      <div className='mx-auto text-center mb-16'>
                        {/* <h4 className='font-semibold text-lg text-sky-500 mb-2'>Recommendation</h4> */}
                        <h2 className='font-bold text-black dark:text-white text-4xl mb-4 mt-8'>Here is Your IEM!</h2>
                        <p className='font-medium text-slate-500 dark:text-slate-300 md:text-lg'>
                        Ini adalah beberapa IEM yang sesuai dengan preferensi anda :
                        </p>
                      </div>
                    </div>

                    <div className=' overflow-auto rounded-lg shadow mb-12'>
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
                              return(
                                <tr className=" dark:bg-slate-900" key={i}>
                                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-white">{iem.name}</td>
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
                              )
                            })}
                          </tbody>
                        </table>
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
