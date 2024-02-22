"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { TypeAnimation } from 'react-type-animation';
import { motion, Variants } from "framer-motion";
import Slider from "react-slick";

import mne1Blur from '../../../public/images/portfolios/mne_1_blur.png'
import mne2Blur from '../../../public/images/portfolios/mne_2_blur.png'
import mne3Blur from '../../../public/images/portfolios/mne_3_blur.png'
import jgolf1Blur from '../../../public/images/portfolios/jgolf_1_blur.png'
import jgolf2Blur from '../../../public/images/portfolios/jgolf_2_blur.png'
import jgolf3Blur from '../../../public/images/portfolios/jgolf_3_blur.png'
import jgolf4Blur from '../../../public/images/portfolios/jgolf_4_blur.png'
import resto1Blur from '../../../public/images/portfolios/resto_1_blur.png'
import resto2Blur from '../../../public/images/portfolios/resto_2_blur.png'
import resto3Blur from '../../../public/images/portfolios/resto_3_blur.png'

import mangtas from '../../../public/images/certificates/mangtas.png'
import merdeka from '../../../public/images/certificates/merdeka.png'
import analytic from '../../../public/images/certificates/analytic.png'
import expert from '../../../public/images/certificates/expert.png'
import flutter from '../../../public/images/certificates/flutter.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Foryouhr() {

    const [isDesktop, setIsDesktop] = useState(true);

    // GET WINDOW RESOLUTION
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1279px)');
        setIsDesktop(!mediaQuery.matches);
        // IF IN MOBILE VIEW MOVE THE CONTAINER A BIT TO THE CENTER
        if (mediaQuery.matches) {
            setTranslationPosterContainer({
                translateX: -100,
                translateY: -130
            });
        }

        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setIsDesktop(!e.matches);

            if (e.matches) {
                setTranslationPosterContainer({
                    translateX: -100,
                    translateY: -130
                });
            }
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    const [scrolledAbout, setScrolledAbout] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setScrolledAbout(true);
            } else {
                setScrolledAbout(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const [hoveredLinkGame, setHoveredLinkGame] = useState(false);

    const textLeftVariants: Variants = {
        offscreen: {
            x: -1000
        },
        onscreen: {
            x: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    // POSTER FUNCTIONALITIES

    let posterIteration = 0;

    const [currentActivePoster, setCurrentActivePoster] = useState(16);

    const availablePosters = [
        9, 10, 11,
        15, 16, 17,
        21, 22, 23
    ];

    const posterOrder = [9, 15, 21, 10, 16, 22, 11, 17, 23];

    const translationValueForOneMove = { x: 332, y: 526 };

    const [translationPosterContainer, setTranslationPosterContainer] = useState({
        translateX: 0,
        translateY: 0
    });

    const movePosterContainer = (headingPoster: number) => {
        let translationXValue = translationValueForOneMove.x;
        let translationYValue = translationValueForOneMove.y;
        // CHANGE VALUE IF IN MOBILE VIEW
        if (!isDesktop) {
            translationXValue = 177;
            translationYValue = 288;
        }

        let translationX = translationPosterContainer.translateX;
        let translationY = translationPosterContainer.translateY;

        const postersPerRow = 6;
        const currentRow = Math.ceil(currentActivePoster / postersPerRow);
        const currentColumn = currentActivePoster % postersPerRow || postersPerRow;
        const headingRow = Math.ceil(headingPoster / postersPerRow);
        const headingColumn = headingPoster % postersPerRow || postersPerRow;

        const rowDifference = headingRow - currentRow;
        const columnDifference = headingColumn - currentColumn;

        translationX = translationX - (columnDifference * translationXValue);
        translationY = translationY - (rowDifference * translationYValue);

        // console.log(`headingPoster: ${headingPoster}, currentActivePoster: ${currentActivePoster}, translationX: ${translationX}, translationY: ${translationY}`);
        setTranslationPosterContainer({
            ...translationPosterContainer,
            translateX: translationX,
            translateY: translationY
        })

        setCurrentActivePoster(headingPoster);
    }

    const nextPoster = () => {
        const currentIndex = posterOrder.indexOf(currentActivePoster);
        const nextIndex = (currentIndex + 1) % posterOrder.length;
        movePosterContainer(posterOrder[nextIndex]);
    };

    const prevPoster = () => {
        const currentIndex = posterOrder.indexOf(currentActivePoster);
        const nextIndex = (currentIndex - 1 + posterOrder.length) % posterOrder.length;
        movePosterContainer(posterOrder[nextIndex]);
    };

    // CAROUSEL FUNCTIONALLITY
    const NextArrowCarousel = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`absolute top-[35%] -mr-2 lg:-mr-6 right-0 scale-100 transition-transform ease-in-out duration-150 cursor-pointer text-poster hover:scale-110 bg-btn-certificates p-3 z-20 max-w-lg shadow-black`}
                style={{ ...style }}
                onClick={onClick}
            >
                <ChevronRightIcon className="h-8 w-8 lg:h-11 lg:w-11" aria-hidden="true" />
            </div>
        );
    }

    const LeftArrowCarousel = (props: any) => {
        const { className, style, onClick } = props;
        return (

            <div
                className={`absolute top-[35%] -ml-2 lg:-ml-6 left-0 scale-100 transition-transform ease-in-out duration-150 cursor-pointer text-poster hover:scale-110 bg-btn-certificates p-3 z-20 max-w-lg shadow-black`}
                style={{ ...style }}
                onClick={onClick}
            >
                <ChevronLeftIcon className="h-8 w-8 lg:h-11 lg:w-11" aria-hidden="true" />
            </div>
        );
    }

    const carouselSettings = {
        className: "center",
        centerMode: true,
        dots: false,
        speed: 500,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrowCarousel />,
        prevArrow: <LeftArrowCarousel />,
        responsive: [

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                }
            },
        ]
    };

    const substractWords = (text: string) => {
        let maxCharacter = 136;
        if (!isDesktop) maxCharacter = 58;

        if (text.length <= maxCharacter) {
            return text;
        } else {
            return text.substring(0, maxCharacter) + "...";
        }
    }

    return (
        <>
            <main className='bg-black overflow-x-hidden'>
                <div className="col-span-12">
                    <div className={`flex flex-col h-screen ${scrolledAbout ? 'blur-sm' : 'blur-none'}`} id='main-content' style={{
                        backgroundImage: `url('/images/blur3.svg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative', // Ensure proper stacking of children
                    }}>

                        <div className='dark-overlay'></div>
                        {/* <Particle /> */}
                        <a href="#first-content">
                            <div className='absolute left-[50%] -translate-x-[50%] bottom-10 text-2xl rounded-lg rotate-45 p-2 bg-blood-90 text-white cursor-pointer z-20 shadow-lg'>
                                <div className='absolute -m-2 w-full h-full rounded-lg border-2 border-white animate-ping-mlp-2' />
                                <ChevronRightIcon className="h-9 w-9 rotate-45" aria-hidden="true" />
                            </div>
                        </a>
                        {/* <div className="absolute left-[50%] -translate-x-[50%] top-7 grid grid-cols-12 gap-4 bg-black px-4 py-2 rounded-full leading-normal font-medium  text-white text-center shadow-black">
                            <div className='flex col-span-4 py-2 px-4 justify-center items-center rounded-full bg-blood relative'>
                                <div className='dark-overlay'></div>
                                <p className='z-10'>Projects</p>
                            </div>
                            <div className='flex col-span-4 py-2 px-4 justify-center items-center rounded-full bg-blood relative'>
                                <div className='dark-overlay'></div>
                                <p className='z-10'>About</p>
                            </div>
                            <div className='flex col-span-4 py-2 px-4 justify-center items-center rounded-full bg-blood relative'>
                                <div className='dark-overlay'></div>
                                <p className='z-10'>Contact</p>
                            </div>
                        </div> */}
                        <div className='flex items-center pl-6 pr-6 md:pl-36 md:pr-36 text-4xl sm:text-5xl leading-normal font-normal p-4 text-white text-center z-10 h-full' style={{ lineHeight: 1.3 }}>
                            <TypeAnimation
                                sequence={[
                                    `Hello, how's it going?`,
                                    500,
                                    `The Promised Desire's here,`,
                                    500,
                                    `You lookin' for a dance partner?`,
                                    700,
                                    `Be it in a genre of system, an app, or a website, I'd be down for it;`,
                                    1000,
                                    `Well, in case you don't know how to move your feet, don't be worried about it,`,
                                    1000,
                                    `I will lead the dance for you.`,
                                    1000,
                                ]}
                                speed={85}
                                className='shadow select-none'
                                repeat={Infinity}
                            />
                        </div>
                    </div>
                    <motion.div className='grid grid-cols-12 py-28 lg:py-52 pl-6 pr-6 lg:pl-24 lg:pr-24'
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.5 }}
                        id='first-content'>
                        <motion.div className='col-span-12 lg:col-span-7 text-white font-normal text-xl sm:text-2xl text-left' variants={textLeftVariants}>
                            {`For those of you who are able to appreciate code, I'd like to recommend experiencing my works through a `}
                            <Link href={`/game`} className='hover:text-red-600 underline'
                                onMouseEnter={() => setHoveredLinkGame(true)}
                                onMouseLeave={() => setHoveredLinkGame(false)}>
                                {`mini-game here.`}
                            </Link>
                        </motion.div>
                        <div className='hidden lg:col-span-5 justify-center items-center sm:flex px-28'>
                            <div className={`absolute scale-0 ${hoveredLinkGame && 'scale-100'} transition-transform ease-in-out duration-300 grid grid-cols-12 py-4 px-2 w-auto h-auto rounded bg-modal-mlp border-modal-mlp shadow-sm z-50`}
                                id='thumbnail-portfolio=hover'
                                style={{ zIndex: 70 }}
                            >
                                <div className="col-span-12">
                                    <Image
                                        src="/images/game-mode.png"
                                        title={`Blur`}
                                        alt={`Blur`}
                                        height={500}
                                        width={350}
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0Z2T8DwACKgFKDPXbYwAAAABJRU5ErkJggg=="
                                        placeholder="blur"
                                        style={{
                                            objectFit: 'cover',
                                            height: '100%',
                                            width: '100%',
                                            maxWidth: '500px',
                                            maxHeight: '350px'
                                        }}
                                    />
                                    <div className='dark-overlay'></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    {/* PORTFOLIO SECTION */}
                    <div className='grid grid-cols-12 pt-0 lg:pt-32 pb-0 lg:pb-72 pl-6 pr-6 lg:pl-24 lg:pr-24 overflow-hidden lg:overflow-visible'>
                        <div className='col-span-12 lg:col-span-7'>
                            <div className="relative flex justify-center items-center w-full min-h-[690px] lg:min-h-[230px]" >
                                <Image
                                    src={mne1Blur}
                                    className='z-20 absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'rotate(67deg) translate(-5px, 106px);',
                                        maxWidth: '550px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(67deg) translate(-5px, 106px) scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(67deg) translate(-5px, 106px) scale(1)'}
                                />
                                <Image
                                    src={mne2Blur}
                                    className='z-10 absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'rotate(328deg) translate(48px, 80px);',
                                        maxWidth: '550px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(328deg) translate(48px, 80px) scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(328deg) translate(48px, 80px) scale(1)'}
                                />
                                <Image
                                    src={mne3Blur}
                                    className='z-0 absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'translate(0px, -150px);',
                                        maxWidth: '550px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(0px, -150px) scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(0px, -150px) scale(1)'}
                                />
                            </div>
                        </div>
                        <div className='col-span-12 lg:col-span-5 grid-cols-12 p-3 grid'>
                            <div className='col-span-12 text-white font-semibold text-2xl flex justify-start items-end sm:px-5'>
                                {`SR-APP`}
                            </div>
                            <div className='col-span-12 text-white font-normal text-xl flex justify-start items-start sm:px-5'>
                                <ul className="list-disc text-left">
                                    <li className='mt-2'>{`I developed SR-APP, the 1st Corporate Social Responsibility microservices app in Indonesia as the main front end developer.`}</li>
                                    <li className='mt-2'>{`Implemented using React and Laravel in a Single Page Application, the app manages to monitor every CSR progress effectively.`}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 pt-0 lg:pt-32 pb-24 lg:pb-72 pl-6 pr-6 lg:pl-24 lg:pr-24 overflow-hidden lg:overflow-visible'>
                        <div className='col-span-12 lg:col-span-7'>
                            <div className="relative flex justify-center items-center w-full min-h-[835px] lg:min-h-[345px]" >
                                <Image
                                    src={jgolf1Blur}
                                    className='z-30  absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'rotate(315deg) translate(-172px, 179px);',
                                        maxWidth: '415px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(315deg) translate(-172px, 179px) scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(315deg) translate(-172px, 179px) scale(1)'}
                                />
                                <Image
                                    src={jgolf3Blur}
                                    className='z-20 absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'rotate(0deg) translate(-227px, 118px );',
                                        maxWidth: '415px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) translate(-227px, 118px) scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) translate(-227px, 118px) scale(1)'}
                                />
                                <Image
                                    src={jgolf4Blur}
                                    className='z-10 absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'rotate(349deg) translate(121px, 150px) ;',
                                        maxWidth: '415px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(349deg) translate(121px, 150px)  scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(349deg) translate(121px, 150px)  scale(1)'}
                                />
                                <Image
                                    src={jgolf2Blur}
                                    className='z-0 absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'rotate(12deg) translate(-32px, -24px );',
                                        maxWidth: '415px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(12deg) translate(-32px, -24px ) scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(12deg) translate(-32px, -24px ) scale(1)'}
                                />
                            </div>
                        </div>
                        <div className='col-span-12 lg:col-span-5 grid-cols-12 p-3 grid'
                        >
                            <div className='col-span-12 text-white font-semibold text-2xl flex justify-start items-end sm:px-5'>
                                {`J-GOLF`}
                            </div>
                            <div className='col-span-12 text-white font-normal text-xl flex justify-start items-start sm:px-5'>
                                <ul className="list-disc text-left">
                                    <li className='mt-2'>{`I designed and developed a Mobile focus golf web application as the 1st Indonesian Golf Management app using Laravel.`}</li>
                                    <li className='mt-2'>{`J-Golf primarily manages subscription packages for courses training, golf event creation, scoring, and rankings.`}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 pt-0 lg:pt-32 pb-24 pl-6 pr-6 lg:pl-24 lg:pr-24 overflow-hidden lg:overflow-visible'>
                        <div className='col-span-12 lg:col-span-7'>
                            <div className="relative flex justify-center items-center w-full min-h-[565px] lg:min-h-[580px]" >
                                <Image
                                    src={resto2Blur}
                                    className='z-30 absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'rotate(41deg) translate(40px, -57px);',
                                        maxWidth: '550px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(41deg) translate(40px, -57px) scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(41deg) translate(40px, -57px) scale(1)'}
                                />
                                <Image
                                    src={resto3Blur}
                                    className='z-20  absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'rotate(349deg) translate(-115px, 77px);',
                                        maxWidth: '550px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(349deg) translate(-115px, 77px) scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(349deg) translate(-115px, 77px) scale(1)'}
                                />
                                <Image
                                    src={resto1Blur}
                                    className='z-10  absolute hover:z-50 transition-transform ease-in-out duration-300'
                                    placeholder="blur"
                                    alt="MNE"
                                    style={{
                                        objectFit: 'cover',
                                        transform: 'rotate(0deg) translate(-164px, -89px);',
                                        maxWidth: '550px',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) translate(-164px, -89px)   scale(1.15)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) translate(-164px, -89px)  scale(1)'}
                                />
                            </div>
                        </div>
                        <div className='col-span-12 lg:col-span-5 grid-cols-12 p-3 grid'>
                            <div className='col-span-12 text-white font-semibold text-2xl flex justify-start items-end sm:px-5'>
                                {`MY DESIRED UTOPIAS`}
                            </div>
                            <div className='col-span-12 text-white font-normal text-xl flex justify-start items-start sm:px-5'>
                                <ul className="list-disc text-left">
                                    <li className='mt-2'>{`My Desired Utopias is the culmination of my Dicoding "Becoming a Web Front- End Developer Expert" certification journey.`}</li>
                                    <li className='mt-2'>{`Featuring a Progressive Web App (PWA) that fetches Dicoding API's using Hapi, Webpack, and vanilla CSS/JS.`}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 pt-0 lg:pt-0 pb-32 pl-6 pr-6 lg:pl-24 lg:pr-24 shadow-poster-high'>
                        <div className='col-span-12 flex justify-center items-center'>
                            <Link href={`/game`}>
                                <div className='inline-flex justify-center items-center p-4 bg-btn-explore text-white text-lg drop-shadow-xl max-h-16 sm:max-h-12 rounded-xl cursor-pointer text-bloo hover:scale-110 transition-transform ease-in-out duration-150'>
                                    <div className='absolute -m-2 w-full h-full rounded-md border-2 border-btn-explore animate-ping-mlp-3' />
                                    <span className="font-medium text-xl text-center" >{`Explore more in Game Mode `}<sup>12</sup></span>
                                </div>
                            </Link>

                        </div>
                    </div>
                    {/* END OF PORTFOLIO SECTION */}
                    <div className='relative h-[720px] lg:h-[540px] flex justify-center items-center overflow-hidden' >
                        <div className='absolute top-[30%] scale-100 transition-transform ease-in-out duration-150 cursor-pointer text-poster hover:scale-110 left-0 bg-header-poster p-3 z-20 max-w-lg mh shadow-black' onClick={prevPoster}>
                            <ChevronLeftIcon className="h-8 w-8 lg:h-11 lg:w-11" aria-hidden="true" />
                        </div>
                        <div className='absolute top-[30%] scale-100 transition-transform ease-in-out duration-150 cursor-pointer text-poster hover:scale-110 right-0 bg-header-poster p-3 z-20 max-w-lg mh shadow-black' onClick={nextPoster}>
                            <ChevronRightIcon className="h-8 w-8 lg:h-11 lg:w-11" aria-hidden="true" />
                        </div>
                        <div className='absolute lg:left-[20%] lg:-translate-x-[20%] min-h-[270px] bottom-0 bg-header-poster p-9 z-20 max-w-lg select-none shadow-black'>
                            <div className="col-span-1 flex justify-start items-end text-white font-bold text-2xl pb-2">
                                {`Childhood`}
                            </div>
                            <div className="col-span-1 flex justify-start items-start text-white font-medium text-lg">
                                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus consequat enim, sodales consectetur ex consequat sed. `}
                            </div>
                        </div>
                        <div className='relative flex transition-transform ease-in-out duration-300' style={{
                            transform: `rotate(13deg) translate(${translationPosterContainer.translateX}px, ${translationPosterContainer.translateY}px)`,
                        }}>
                            {/* FIXED WIDTH FOR POSTER CAROUSEL */}
                            <div className='min-h-[830px] w-[1000px] lg:w-[2000px] grid grid-cols-12 gap-5 pt-14 pb-14 pl-6 pr-6 text-left select-none'>

                                {
                                    [...Array(30)].map((j) => {
                                        posterIteration++;
                                        let currentIteration = posterIteration;
                                        return (
                                            <div key={posterIteration}
                                                id={`poster-${posterIteration}`}
                                                className={`min-h-[265px] lg:min-h-[500px] w-[144px] lg:w-[308px] col-span-2 p-4 lg:p-6 grid grid-cols-1 ${availablePosters.includes(currentIteration) && currentIteration != currentActivePoster ? 'cursor-pointer' : ''} ${posterIteration == currentActivePoster ? 'bg-poster-active' : availablePosters.includes(currentIteration) ? 'bg-poster' : 'bg-poster-unhovered'}`}
                                                onClick={availablePosters.includes(currentIteration) && currentIteration != currentActivePoster ? () => movePosterContainer(currentIteration) : undefined}
                                            >
                                                <div className="col-span-1 flex justify-center items-center">
                                                    <Image
                                                        src={`/images/icons/next-js-black.svg`}
                                                        title="Next.Js"
                                                        alt="Next.Js"
                                                        className='w-[80px] lg:w-[165px]'
                                                        height={165}
                                                        width={165}
                                                        style={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-span-1 flex justify-start items-end text-black font-bold text-lg lg:text-2xl pb-1 lg:pb-2">
                                                    {`Childhood`}
                                                </div>
                                                <div className="col-span-1 flex justify-start items-start text-black font-medium text-sm lg:text-lg">
                                                    {`${substractWords('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}`}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-12 pt-32 pb-10 pl-6 pr-6 text-white font-semibold text-3xl sm:text-4xl text-center select-none'>
                            {`Some of My Certifications`}
                        </div>
                    </div>
                    <div className='pt-10 pb-8 pl-2 pr-2 lg:pl-6 lg:pr-6'>
                        <Slider {...carouselSettings}>
                            <div>
                                <Image
                                    src={mangtas}
                                    className='z-10  select-none'
                                    width={423}
                                    height={300}
                                    placeholder="blur"
                                    alt="Picture of the certificate"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div>
                                <Image
                                    src={merdeka}
                                    className='z-10  select-none'
                                    width={423}
                                    height={300}
                                    placeholder="blur"
                                    alt="Picture of the certificate"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div>
                                <Image
                                    src={analytic}
                                    className='z-10  select-none'
                                    width={423}
                                    height={300}
                                    placeholder="blur"
                                    alt="Picture of the certificate"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div>
                                <Image
                                    src={expert}
                                    className='z-10  select-none'
                                    width={423}
                                    height={300}
                                    placeholder="blur"
                                    alt="Picture of the certificate"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div>
                                <Image
                                    src={flutter}
                                    className='z-10  select-none'
                                    width={423}
                                    height={300}
                                    placeholder="blur"
                                    alt="Picture of the certificate"
                                    style={{ objectFit: 'cover' }}
                                />

                            </div>
                        </Slider>

                    </div>
                    <div className='grid grid-cols-12 pt-20 pb-0 pl-6 pr-6 lg:pl-36 lg:pr-36 bg-black gap-5'>
                        <div className='col-span-12 sm:col-span-6 flex justify-center overflow-hidden'>
                            <Player
                                autoplay
                                loop
                                src="/images/lottie/world-rednew.json"
                                style={{ height: '400px', width: '400px' }}
                            >
                            </Player>
                        </div>
                        <div className='col-span-12 sm:col-span-6 flex flex-col justify-center text-xl font-normal text-left text-white select-none'
                        >
                            <span className='text-2xl sm:text-3xl font-semibold mb-4'>{`Full-Stack Engineer`}</span>
                            {`While lately I've been focusing on Front-End Development, I used to prefer being a Back-End Developer on my starting days.`}
                        </div>
                    </div>
                    <div className='grid grid-cols-12 pt-0 pb-32 pl-6 pr-6 lg:pl-36 lg:pr-36 bg-black gap-5'>
                        <div className='col-span-12 sm:col-span-6 flex flex-col justify-center text-xl font-normal text-left text-white select-none'

                        >
                            <span className='text-2xl sm:text-3xl font-semibold mb-4'>{`7 Years of Study`}</span>
                            {`Graduated as a BASc in Informatics Engineering major. I've studied a broad range of computer disciplines since I was 15 y/o.`}
                        </div>
                        <div className='col-span-12 sm:col-span-6 flex justify-center order-first sm:order-last overflow-hidden'>
                            <Player
                                autoplay
                                loop
                                src="/images/lottie/study-rednew.json"
                                style={{ height: '400px', width: '400px' }}
                            >
                            </Player>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 pt-32 pb-32 px-20 sm:pl-24 sm:pr-24' style={{
                        backgroundImage: `url('/images/blur4.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative', // Ensure proper stacking of children
                    }}

                    >
                        <div className="dark-overlay"></div>
                        <motion.div className='col-span-12 text-white font-medium text-2xl sm:text-4xl text-left pt-5 pb-5 z-10 select-none'
                            initial={{ opacity: 0, scale: 0.5 }}
                            viewport={{ once: true, amount: 0.1 }}
                            whileInView={{
                                opacity: 1, scale: 1, transition: {
                                    duration: 0.8,
                                    delay: 0.5,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }
                            }}
                        >
                            {`Does that mean I'm limited to the listed area?`}
                        </motion.div>
                        <motion.div className='col-span-12 text-white text-xl font-normal sm:text-2xl flex justify-center items-center select-none gap-20 pt-5 pb-5 z-10'
                            initial={{ opacity: 0, scale: 0.5 }}
                            viewport={{ once: true, amount: 0.1 }}
                            whileInView={{
                                opacity: 1, scale: 1, transition: {
                                    duration: 0.8,
                                    delay: 0.5,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }
                            }}
                        >
                            {`Of course not;`}<br /> {`My Curiosity, Imagination, and Adaptability are shamelessly always dancing along.`}
                        </motion.div>
                    </div>
                    <div className='grid grid-cols-12 pt-14 pb-14 pl-6 pr-6 md:pl-32 md:pr-32 text-white'>
                        <div className='col-span-10 text-left'>
                            <Image
                                src="/images/logo-full.svg"
                                width={190}
                                height={80}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className='col-span-2 flex justify-end items-center gap-4'>
                            <Link href="https://mail.google.com/mail/?fs=1&to=daffavcd@gmail.com&tf=cm" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon className='h-8 w-8 sm:w-10 sm:h-10 text-blood hover:text-white cursor-pointer' icon={faGoogle} />
                            </Link>
                            <Link href="https://twitter.com/messages/compose?recipient_id=813202528816930816" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon className='h-8 w-8 sm:w-10 sm:h-10 text-blood hover:text-white cursor-pointer' icon={faTwitter} />
                            </Link>
                            <Link href="https://github.com/daffavcd" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon className='h-8 w-8 sm:w-10 sm:h-10 text-blood hover:text-white cursor-pointer' icon={faGithub} />
                            </Link>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 gap-4 pt-14 pb-14 pl-6 pr-6 md:pl-32 md:pr-32 text-white'>
                        <div className='col-span-12 sm:col-span-6 text-center sm:text-left text-base'>
                            <Link href={`/game`} className='hover:text-red-600 underline'>
                                {`Try Game Mode`}
                            </Link>
                            <br />{`Experience my works through a mini-game.`}
                        </div>
                        <div className='col-span-12 mb-3 sm:mb-0 sm:col-span-3'>
                            <div className='w-full'>
                                <AudioPlayer
                                    loop={false}
                                    preload={`none`}
                                    customVolumeControls={[]}
                                    showJumpControls={false}
                                    customAdditionalControls={[]}
                                    layout='horizontal'
                                    src="/super_boring.aac"
                                    onPlay={e => console.log("onPlay")}
                                />
                            </div>
                        </div>
                        <div className='col-span-12 mb-3 sm:mb-0 text-center sm:col-span-3 sm:text-right text-lg'>
                            {`© 2024`}<br />{`thePromisedDesires`}
                        </div>
                    </div>
                </div >
            </main >
        </>
    )
}