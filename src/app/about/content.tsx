"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Content() {

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Jakarta'
    });
    const formattedTime = formatter.format(now).replace(' ', ', ');

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

    return (
        <>
            <div className="col-span-12">
                <div className={`flex flex-col relative h-screen ${scrolledAbout ? 'blur-sm' : 'blur-none'}`} id='main-content' style={{ marginTop: "-95px" }}>
                    <Image
                        alt="Background Image"
                        src="/images/ruffy.jpg"
                        quality={75}
                        fill
                        priority
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                    <div className='dark-overlay'></div>
                    {/* <Particle /> */}
                    <a href="#first-content">
                        <div className='absolute left-[50%] -translate-x-[50%] bottom-10 text-2xl rounded-lg rotate-45 p-2 bg-blood-90 text-white cursor-pointer z-20 shadow-lg'>
                            <div className='absolute -m-2 w-full h-full rounded-lg border-2 border-white animate-ping-mlp-2' />
                            <ChevronRightIcon className="h-9 w-9 rotate-45" aria-hidden="true" />
                        </div>
                    </a>
                    <div className='flex items-center pl-6 pr-6 md:pl-36 md:pr-36 text-3xl sm:text-4xl leading-normal font-normal p-4 text-white text-center z-10 h-full'>
                        <p className='shadow select-none'>I try to create the portfolio showcase in a game-like experience, hope you enjoy it. </p >
                    </div>
                </div>
                <div className='grid grid-cols-12' id='first-content'>
                    <div className='col-span-12  pt-32 pb-32 pl-6 pr-6 lg:pl-80 lg:pr-80 text-white text-lg sm:text-xl text-center'>
                        {`"I'm well aware that this project still very far from the excepted main concept that so called "Prison". I really need to make time to create the whole assets prison stuff, and taking a consideration because it would likely be a heavy website if i put all those images that i have in mind rendered." - @daffavcd`}
                    </div>
                </div>
                <div className='grid grid-cols-12 pt-32 pb-32 pl-6 pr-6' style={{
                    backgroundImage: `url('/images/blur2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative', // Ensure proper stacking of children
                }}>
                    <div className="dark-overlay"></div>
                    <div className='col-span-12 text-white font-semibold text-3xl sm:text-4xl text-center pt-5 pb-5 z-10 select-none'>
                        {`Code Environment`}
                    </div>
                    <div className='col-span-12 flex justify-center items-center gap-20 pt-5 pb-5 z-10'>
                        <svg className='w-[110px] h-[110px]' viewBox="0 0 477 477" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='fill-[#E40000] hover:fill-white' d="M222.88 0.128362C221.854 0.221604 218.59 0.547949 215.652 0.781052C147.903 6.88837 84.4425 43.439 44.2496 99.617C21.8683 130.853 7.55367 166.285 2.14487 203.814C0.233138 216.915 0 220.784 0 238.547C0 256.309 0.233138 260.179 2.14487 273.279C15.1073 362.838 78.8472 438.083 165.295 465.963C180.775 470.951 197.095 474.354 215.652 476.406C222.88 477.198 254.12 477.198 261.348 476.406C293.381 472.862 320.518 464.937 347.282 451.277C351.385 449.179 352.178 448.62 351.618 448.153C351.245 447.874 333.76 424.423 312.778 396.078L274.636 344.562L226.843 273.839C200.545 234.957 178.91 203.162 178.723 203.162C178.537 203.115 178.35 234.537 178.257 272.906C178.117 340.087 178.071 342.791 177.231 344.376C176.019 346.66 175.087 347.593 173.128 348.618C171.636 349.364 170.331 349.504 163.29 349.504H155.223L153.078 348.152C151.679 347.266 150.654 346.101 149.954 344.749L148.975 342.651L149.068 249.176L149.208 155.655L150.654 153.837C151.4 152.858 152.985 151.599 154.104 150.993C156.016 150.061 156.762 149.967 164.828 149.967C174.34 149.967 175.926 150.34 178.397 153.044C179.096 153.79 204.975 192.765 235.935 239.712C266.896 286.659 309.234 350.763 330.03 382.232L367.798 439.435L369.71 438.177C386.636 427.174 404.541 411.51 418.716 395.192C448.884 360.553 468.327 318.315 474.855 273.279C476.767 260.179 477 256.309 477 238.547C477 220.784 476.767 216.915 474.855 203.814C461.893 114.256 398.153 39.01 311.705 11.1309C296.458 6.18906 280.232 2.78574 262.047 0.734432C257.571 0.268225 226.75 -0.244603 222.88 0.128362ZM320.518 144.373C322.756 145.492 324.574 147.636 325.227 149.874C325.6 151.086 325.694 177.007 325.6 235.423L325.46 319.247L310.679 296.589L295.852 273.932V212.999C295.852 173.604 296.038 151.459 296.318 150.387C297.064 147.776 298.696 145.725 300.934 144.513C302.846 143.534 303.545 143.44 310.866 143.44C317.767 143.44 318.979 143.534 320.518 144.373Z" />
                        </svg>
                        <svg className='w-[125px] h-[125px]' viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='fill-[#E40000] hover:fill-white' d="M256 92C187.733 92 145.067 126.111 128 194.333C153.6 160.222 183.467 147.431 217.6 155.958C237.075 160.824 250.995 174.943 266.402 190.573C291.501 216.033 320.551 245.5 384 245.5C452.267 245.5 494.933 211.389 512 143.167C486.4 177.278 456.533 190.069 422.4 181.542C402.925 176.676 389.005 162.557 373.598 146.927C348.499 121.467 319.449 92 256 92ZM128 245.5C59.7333 245.5 17.0667 279.611 0 347.833C25.6 313.722 55.4667 300.931 89.6 309.458C109.075 314.324 122.995 328.443 138.402 344.073C163.502 369.533 192.551 399 256 399C324.267 399 366.933 364.889 384 296.667C358.4 330.778 328.533 343.569 294.4 335.042C274.925 330.176 261.005 316.057 245.598 300.427C220.498 274.967 191.449 245.5 128 245.5Z" />
                        </svg>
                    </div>
                </div>
                <div className='grid grid-cols-12 pt-14 pb-14 pl-6 pr-6 md:pl-32 md:pr-32 text-white'>
                    <div className='col-span-10 flex justify-start items-center'>
                        <svg className='w-[171px] h-[72px]' viewBox="0 0 726 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='fill-[#E40000] hover:fill-white' d="M171.824 210.2H214.592C229.024 210.2 239.848 214.072 247.064 221.816C254.28 229.56 257.888 240.912 257.888 255.872V274.088C257.888 289.048 254.28 300.4 247.064 308.144C239.848 315.888 229.024 319.76 214.592 319.76H200.864V395H171.824V210.2ZM214.592 293.36C219.344 293.36 222.864 292.04 225.152 289.4C227.616 286.76 228.848 282.272 228.848 275.936V254.024C228.848 247.688 227.616 243.2 225.152 240.56C222.864 237.92 219.344 236.6 214.592 236.6H200.864V293.36H214.592ZM273.66 210.2H316.692C331.652 210.2 342.564 213.72 349.428 220.76C356.292 227.624 359.724 238.272 359.724 252.704V264.056C359.724 283.24 353.388 295.384 340.716 300.488V301.016C347.756 303.128 352.684 307.44 355.5 313.952C358.492 320.464 359.988 329.176 359.988 340.088V372.56C359.988 377.84 360.164 382.152 360.516 385.496C360.868 388.664 361.748 391.832 363.156 395H333.588C332.532 392.008 331.828 389.192 331.476 386.552C331.124 383.912 330.948 379.16 330.948 372.296V338.504C330.948 330.056 329.54 324.16 326.724 320.816C324.084 317.472 319.42 315.8 312.732 315.8H302.7V395H273.66V210.2ZM313.26 289.4C319.068 289.4 323.38 287.904 326.196 284.912C329.188 281.92 330.684 276.904 330.684 269.864V255.608C330.684 248.92 329.452 244.08 326.988 241.088C324.7 238.096 321.004 236.6 315.9 236.6H302.7V289.4H313.26ZM380.137 210.2H409.178V395H380.137V210.2ZM468.68 397.64C454.598 397.64 443.948 393.68 436.736 385.76C429.518 377.664 425.912 366.136 425.912 351.176V340.616H453.368V353.288C453.368 365.256 458.384 371.24 468.416 371.24C473.342 371.24 477.038 369.832 479.504 367.016C482.144 364.024 483.464 359.272 483.464 352.76C483.464 345.016 481.7 338.24 478.184 332.432C474.662 326.448 468.152 319.32 458.648 311.048C446.678 300.488 438.32 290.984 433.568 282.536C428.816 273.912 426.44 264.232 426.44 253.496C426.44 238.888 430.136 227.624 437.528 219.704C444.92 211.608 455.654 207.56 469.736 207.56C483.638 207.56 494.108 211.608 501.152 219.704C508.364 227.624 511.976 239.064 511.976 254.024V261.68H484.52V252.176C484.52 245.84 483.284 241.264 480.824 238.448C478.358 235.456 474.752 233.96 470 233.96C460.316 233.96 455.48 239.856 455.48 251.648C455.48 258.336 457.238 264.584 460.76 270.392C464.456 276.2 471.056 283.24 480.56 291.512C492.704 302.072 501.062 311.664 505.64 320.288C510.212 328.912 512.504 339.032 512.504 350.648C512.504 365.784 508.718 377.4 501.152 385.496C493.76 393.592 482.936 397.64 468.68 397.64ZM571.13 397.64C556.874 397.64 545.96 393.592 538.394 385.496C530.822 377.4 527.042 365.96 527.042 351.176V254.024C527.042 239.24 530.822 227.8 538.394 219.704C545.96 211.608 556.874 207.56 571.13 207.56C585.386 207.56 596.294 211.608 603.866 219.704C611.432 227.8 615.218 239.24 615.218 254.024V351.176C615.218 365.96 611.432 377.4 603.866 385.496C596.294 393.592 585.386 397.64 571.13 397.64ZM571.13 371.24C581.162 371.24 586.178 365.168 586.178 353.024V252.176C586.178 240.032 581.162 233.96 571.13 233.96C561.098 233.96 556.082 240.032 556.082 252.176V353.024C556.082 365.168 561.098 371.24 571.13 371.24ZM634.856 210.2H671.288L699.536 320.816H700.064V210.2H725.936V395H696.104L661.256 260.096H660.728V395H634.856V210.2Z" />
                            <path className='fill-[#E40000] hover:fill-white' d="M195.824 0.199951H224.864V158.6H272.648V185H195.824V0.199951ZM286.574 0.199951H315.614V185H286.574V0.199951ZM360.067 26.6H329.707V0.199951H419.468V26.6H389.107V185H360.067V26.6ZM458.81 26.6H428.45V0.199951H518.21V26.6H487.85V185H458.81V26.6ZM532.268 0.199951H561.308V158.6H609.092V185H532.268V0.199951ZM623.018 0.199951H702.218V26.6H652.058V75.4399H691.922V101.84H652.058V158.6H702.218V185H623.018V0.199951Z" />
                            <path className='fill-[#E40000] hover:fill-white' d="M0.87207 140.6H31.0161L44.4561 236.792H44.8401L58.2801 140.6H88.4241V275H68.4561V173.24H68.0721L52.7121 275H35.0481L19.6881 173.24H19.3041V275H0.87207V140.6ZM123.577 217.784L98.0409 140.6H120.505L134.905 189.944H135.289L149.689 140.6H170.233L144.697 217.784V275H123.577V217.784Z" />
                        </svg>
                    </div>
                    <div className='col-span-2 flex justify-end items-center gap-4'>
                        <a href="mailto:daffavcd@gmail.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon className='h-8 w-8 sm:w-10 sm:h-10 text-blood hover:text-white hover:scale-105 cursor-pointer' icon={faGoogle} />
                        </a>
                        <a href="https://www.linkedin.com/in/daffavcd/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon className='h-8 w-8 sm:w-10 sm:h-10 text-blood hover:text-white hover:scale-105 cursor-pointer' icon={faLinkedin} />
                        </a>
                        <a href="https://github.com/daffavcd" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon className='h-8 w-8 sm:w-10 sm:h-10 text-blood hover:text-white hover:scale-105 cursor-pointer' icon={faGithub} />
                        </a>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-4 pt-14 pb-14 pl-6 pr-6 md:pl-32 md:pr-32 text-white'>
                    <div className='col-span-6 hidden sm:block text-left text-base'>
                        I created this project out of my boredom when I had nothing to do, while I was trying to find a job after my graduation. I trully appreciate it if you have come this far. Just sent me any dms, I would really love to hear it from you.
                    </div>
                    <div className='col-span-12 mb-3 sm:mb-0 text-center sm:col-span-3 sm:text-right text-lg'>
                        {`GMT+7`}<br />
                        {formattedTime}
                    </div>
                    <div className='col-span-12 mb-3 sm:mb-0 text-center sm:col-span-3 sm:text-right text-lg'>
                        {`© 2024`}<br />{`thePromisedDesires`}
                    </div>
                </div>
            </div >
        </>
    )
}