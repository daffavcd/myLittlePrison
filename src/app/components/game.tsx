"use client";
import { useState, useEffect, useRef, Fragment } from 'react';
import Image from 'next/image';
import ModalPortfolio from './modalPortfolio';
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { LightBulbIcon } from '@heroicons/react/24/solid'
import { portfolios } from '../data/portfolios';

export default function Game() {

    let actualCol = 0;

    const [isDesktop, setIsDesktop] = useState(true);

    const IDLE_TIME = 5000; // 5 milliseconds
    const [isIdle, setIsIdle] = useState(false);

    const startX = useRef<number | null>(null);
    const startY = useRef<number | null>(null);

    const [modalOpen, setModalOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [isCharacterMoving, setIsCharacterMoving] = useState(false);
    const [characterImage, setCharacterImage] = useState('char_idle');

    const [portfolio, setPortfolio] = useState({
        colCell: 0,
        title: "",
        desc: "",
        repoLink: "",
        features: [],
        imagesPath: [],
        techImagesPath: []
    });

    // mapLayout.rowCenter and mapLayout.colCenter is the center cell of the displayed map
    // characterPosition.rowCell and characterPosition.colCell is the current cell of the character
    const [mapLayout, setMapLayout] = useState(
        {
            maxRowCell: 9,
            maxColCell: 81,
            maxColCellEachRowDisplayed: 9,
            maxColCellDisplayed: 27,
            maxColCellEachRow: 9,
            rowCenter: 5,
            colCenter: 41,
            objectCell: [1, 2],
            portfolioCell: portfolios
        }
    );

    const characterPosition = useRef({ rowCell: 5, colCell: 41 });
    let translation = useRef({ dx: "", dy: "" });
    let translationObject = useRef({ dx: "", dy: "" });
    let cellHeight = useRef(90);
    let cellWidth = useRef(90);

    // ====================================START OF FUNCTION ====================================

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        startX.current = e.touches[0].clientX;
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        // ABORTING MOVEMENT IF THE CHARACTER STILL ON ANIMATION
        if (isCharacterMoving) return;

        if (startX.current === null || startY.current === null) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const deltaX = currentX - startX.current;
        const deltaY = currentY - startY.current;

        let simulatedKeyEvent = new KeyboardEvent('keydown', { key: 'None' });

        if (Math.abs(deltaX) > 90 || Math.abs(deltaY) > 90) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    simulatedKeyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                } else {
                    simulatedKeyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                }
            } else {
                if (deltaY > 0) {
                    simulatedKeyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                } else {
                    simulatedKeyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                }
            }
            moveDisplayCharacter(simulatedKeyEvent);
        }
    };

    const handleTouchEnd = () => {
        startX.current = null;
        startY.current = null;
    };

    // TRACKING IDLE TIME
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsIdle(true);
            console.log('User is idle');
        }, IDLE_TIME);

        return () => {
            clearTimeout(timeoutId); // Cleanup the timer on unmount
        };
    }); // Empty dependency array means this effect runs once on mount

    // LISTENING TO KEYBOARD EVENT
    useEffect(() => {
        document.body.addEventListener('keydown', moveDisplayCharacter);
        return () => {
            document.body.removeEventListener('keydown', moveDisplayCharacter)
        }
    })

    // GETTING THE CENTER CELL HEIGHT FOR THE FIRST TIME
    useEffect(() => {
        let centerCell = document.getElementById(`cell-row-${mapLayout.rowCenter}-col-${mapLayout.colCenter}`);
        if (centerCell != null || centerCell != undefined) {
            cellHeight.current = centerCell.offsetHeight;
            cellWidth.current = centerCell.offsetWidth;
            console.log(`New cell dimension detected! ${cellHeight.current}px x ${cellWidth.current}px `);
        }
    }, [mapLayout]);

    // GET WINDOW RESOLUTION
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 639px)');
        setIsDesktop(!mediaQuery.matches);
        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setIsDesktop(!e.matches);
        };


        mediaQuery.addEventListener('change', handleMediaQueryChange);
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    // CHANGE MAP LAYOUT BASED ON WINDOW RESOLUTION
    useEffect(() => {
        if (!isDesktop) {
            setMapLayout(m => ({
                ...m,
                maxColCellEachRowDisplayed: 3,
                maxColCellDisplayed: 9,
            }));
        } else {
            setMapLayout(m => ({
                ...m,
                maxColCellEachRowDisplayed: 9,
                maxColCellDisplayed: 27,
            }));
        }
    }, [isDesktop]);

    const moveDisplayCharacter = (event: KeyboardEvent) => {
        // RESET IDLE IF THE USER NOT AFK
        setIsIdle(false);
        // ABORTING MOVEMENT IF THE MODAL IS OPEN
        if (modalOpen && event.key === "Enter" || event.key === "Esc") {
            setModalOpen(false);
        }

        if (modalOpen) return;
        // ABORTING MOVEMENT IF THE CHARACTER STILL ON ANIMATION
        if (isCharacterMoving) return;

        isPortfolioAround(event.key);

        // CONDITION TO MOVE THE CHARACTER WAS FULFILLED
        const key = event.key;
        if (key === "ArrowUp" && characterPosition.current.rowCell > 1) {
            moveAnimation("Up");
        } else if (key === "ArrowRight" && characterPosition.current.colCell < mapLayout.maxColCell && characterPosition.current.colCell % mapLayout.maxColCellEachRow !== 0) {
            moveAnimation("Right");
        } else if (key === "ArrowDown" && characterPosition.current.rowCell < mapLayout.maxRowCell) {
            moveAnimation("Down");
        } else if (key === "ArrowLeft" && characterPosition.current.colCell > 1 && characterPosition.current.colCell % mapLayout.maxColCellEachRow !== 1) {
            moveAnimation("Left");
        }
    }

    const moveAnimation = (heading: string) => {
        let nextCharacterImage = "char_idle";
        let nextLayout = "None";

        // ABORT ANIMATION IF THE CHARACTER IS COLLIDING WITH AN OBJECT
        // if (isColliding(heading)) return;

        // CHANGE THE STATE TO MOVING
        if (heading == "Up") {
            nextCharacterImage = "char_run_up";
            // MOVE UP DISPLAYED MAP ONCE ? IF THERE IS ANOTHER TOP AND IF NOT AT THE VERY TOP
            if (characterPosition.current.rowCell - 1 > 1 && characterPosition.current.rowCell - 1 < mapLayout.rowCenter) {
                nextLayout = "Up";
            }

            // DONT TRANSLATE OBJECT DOWN IF THE CHARACTER WITHIN TWO ROW FROM THE TOP OR BOTTOM
            if (characterPosition.current.rowCell <= 2 || characterPosition.current.rowCell == mapLayout.maxRowCell) {
                translation.current = { dx: `0px`, dy: `-${cellHeight.current}px` };
                translationObject.current = { dx: `0px`, dy: `0px` };
            } else {
                translation.current = { dx: `0px`, dy: `0px` };
                translationObject.current = { dx: `0px`, dy: `${cellHeight.current}px` };
            }

        } else if (heading == "Right") {
            nextCharacterImage = "char_run_right";

            if (((characterPosition.current.colCell + 1) % mapLayout.maxColCellEachRow) != 0 && ((characterPosition.current.colCell + 1) % mapLayout.maxColCellEachRow) > 2 && mapLayout.maxColCellEachRowDisplayed < mapLayout.maxColCellEachRow) {
                nextLayout = "Right";
            }

            // IF ON THE RIGHTMOST OF THE MAP, TRANSLATE THE CHAR ONLY AND NOT THE OBJECT
            if (characterPosition.current.colCell % mapLayout.maxColCellEachRow == 8 || characterPosition.current.colCell % mapLayout.maxColCellEachRow == 1 && mapLayout.maxColCellEachRowDisplayed < mapLayout.maxColCellEachRow) {
                translation.current = { dx: `${cellWidth.current}px`, dy: `0px` };
                translationObject.current = { dx: `0px`, dy: `0px` };
            } else if (mapLayout.maxColCellEachRowDisplayed < mapLayout.maxColCellEachRow) {
                translation.current = { dx: `0px`, dy: `0px` };
                translationObject.current = { dx: `-${cellWidth.current}px`, dy: `0px` };
            } else { // IF DESKTOP JUST DO NORMAL TRANSLATION
                translation.current = { dx: `${cellWidth.current}px`, dy: `0px` };
                translationObject.current = { dx: `0px`, dy: `$0px` };
            }

        } else if (heading == "Down") {
            nextCharacterImage = "char_run_down";
            // MOVE DOWN DISPLAYED MAP ONCE IF THERE IS ANOTHER BOTTOM AND IF NOT AT THE VERY BOTTOM
            if (characterPosition.current.rowCell + 1 < mapLayout.maxRowCell && characterPosition.current.rowCell + 1 > mapLayout.rowCenter) {
                nextLayout = "Down";
            }

            // DONT TRANSLATE OBJECT UP IF THE CHARACTER WITHIN TWO ROW FROM THE TOP OR BOTTOM
            if (characterPosition.current.rowCell == 1 || characterPosition.current.rowCell == mapLayout.maxRowCell - 1) {
                translation.current = { dx: `0px`, dy: `${cellHeight.current}px` };
                translationObject.current = { dx: `0px`, dy: `0px` };
            } else {
                translation.current = { dx: `0px`, dy: `0px` };
                translationObject.current = { dx: `0px`, dy: `-${cellHeight.current}px` };
            }
        } else if (heading == "Left") {
            nextCharacterImage = "char_run_left";

            // CHANGE LAYOUT TO LEFT IF THERE IS ANOTHER LEFT AND IF NOT AT THE VERY LEFT
            if (((characterPosition.current.colCell - 1) % mapLayout.maxColCellEachRow) != 1 && ((characterPosition.current.colCell - 1) % mapLayout.maxColCellEachRow) < 8 && mapLayout.maxColCellEachRowDisplayed < mapLayout.maxColCellEachRow) {
                nextLayout = "Left";
            }

            // IF ON THE LEFTMOST OF THE MAP, TRANSLATE THE CHAR ONLY AND NOT THE OBJECT
            if (characterPosition.current.colCell % mapLayout.maxColCellEachRow == 0 || characterPosition.current.colCell % mapLayout.maxColCellEachRow == 2 && mapLayout.maxColCellEachRowDisplayed < mapLayout.maxColCellEachRow) {
                translation.current = { dx: `-${cellWidth.current}px`, dy: `0px` };
                translationObject.current = { dx: `0px`, dy: `0px` };
            } else if (mapLayout.maxColCellEachRowDisplayed < mapLayout.maxColCellEachRow) {
                translation.current = { dx: `0px`, dy: `0px` };
                translationObject.current = { dx: `${cellWidth.current}px`, dy: `0px` };
            } else { // IF DESKTOP JUST DO NORMAL TRANSLATION
                translation.current = { dx: `-${cellWidth.current}px`, dy: `0px` };
                translationObject.current = { dx: `0px`, dy: `$0px` };
            }
        }
        // CHANGE THE STATE HERE TO RE RENDER THE DISPLAYED MAP
        setCharacterImage(nextCharacterImage);
        setIsCharacterMoving(true);
        setTimeout(() => {
            moveRefCharacter(heading);
            // CHANGE THE STATE TO NOT MOVING
            setCharacterImage("char_idle");
            setIsCharacterMoving(false);
            handleTouchEnd();
            if (nextLayout != "None") {
                changeMapLayout(nextLayout);
            }
        }, 300);
    }

    const changeMapLayout = (heading: string) => {
        console.log("Map Layout Changed!");
        if (heading == "Up") {
            setMapLayout(
                {
                    ...mapLayout,
                    rowCenter: mapLayout.rowCenter - 1,
                    colCenter: mapLayout.colCenter - mapLayout.maxColCellEachRow,
                }
            );
        } else if (heading == "Down") {
            setMapLayout({
                ...mapLayout,
                rowCenter: mapLayout.rowCenter + 1,
                colCenter: mapLayout.colCenter + mapLayout.maxColCellEachRow,

            })
        } else if (heading == "Right") {
            setMapLayout({
                ...mapLayout,
                colCenter: mapLayout.colCenter + 1,
            })
        } else if (heading == "Left") {
            setMapLayout({
                ...mapLayout,
                colCenter: mapLayout.colCenter - 1,
            })
        }
    }

    const moveRefCharacter = (heading: string) => {
        if (heading == "Up") {
            characterPosition.current = { rowCell: characterPosition.current.rowCell - 1, colCell: characterPosition.current.colCell - mapLayout.maxColCellEachRow };
        } else if (heading == "Right") {
            characterPosition.current = { rowCell: characterPosition.current.rowCell, colCell: characterPosition.current.colCell + 1 };
        } else if (heading == "Down") {
            characterPosition.current = { rowCell: characterPosition.current.rowCell + 1, colCell: characterPosition.current.colCell + mapLayout.maxColCellEachRow };
        } else if (heading == "Left") {
            characterPosition.current = { rowCell: characterPosition.current.rowCell, colCell: characterPosition.current.colCell - 1 };
        }
    }

    const isColliding = (heading: string) => {
        let isColliding = false;
        // CHECKING IF THE CHARACTER IS COLLIDING WITH OBJECT
        if (heading == "Up") {
            if (mapLayout.objectCell.includes(characterPosition.current.colCell - mapLayout.maxColCellEachRow)) {
                isColliding = true;
            }
        } else if (heading == "Right") {
            if (mapLayout.objectCell.includes(characterPosition.current.colCell + 1)) {
                isColliding = true;
            }
        } else if (heading == "Down") {
            if (mapLayout.objectCell.includes(characterPosition.current.colCell + mapLayout.maxColCellEachRow)) {
                isColliding = true;
            }
        } else if (heading == "Left") {
            if (mapLayout.objectCell.includes(characterPosition.current.colCell - 1)) {
                isColliding = true;
            }
        }
        return isColliding;
    }

    const clickPortfolio = (currentPortfolio: object) => {
        setPortfolio(prevState => ({
            ...prevState,
            ...currentPortfolio
        }));
        setModalOpen(true);
    }

    const isPortfolioAround = (event: string) => {
        const key = event;
        const characterCoordinate = characterPosition.current.colCell;
        const portfolioCoordinate = mapLayout.portfolioCell.map((x) => x.colCell);

        if (key === "Enter" && portfolioCoordinate.includes(characterCoordinate)) {
            clickPortfolio(mapLayout.portfolioCell[portfolioCoordinate.indexOf(characterCoordinate)]);
        }
    }


    return (
        <div className="col-span-12 sm:pl-24 sm:pr-24" id="game-map">
            <div className="relative h-96"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="dark-overlay-game rounded"></div>
                <div id="cell-row" className={`grid grid-cols-3 sm:grid-cols-9 gap-0 p-4 h-full overflow-hidden`}>
                    {
                        [...Array(mapLayout.maxColCellDisplayed)].map((x, j) => {
                            // These rules created to make it dynamic when displaying/maping the game map (The key is the displayed COL CENTER).
                            // (if you want to change the map dimension, just change the variable ref declared at the very above *use odds number*).
                            // The rules to get the current iteration of row and col is:
                            // GET CURRENT COL RULES= (current iteration + current displayed coll center) - (total coll for a row + floor of total coll for a row / 2).
                            // Get curret row = (current iteration(j) + center coll of displayed map) - total distance to the first column of the displayed map from center coll of displayed map.
                            const currentCol = (j + mapLayout.colCenter) - (mapLayout.maxColCellEachRow + Math.floor(mapLayout.maxColCellEachRowDisplayed / 2))

                            if (actualCol == 0) {
                                actualCol = currentCol;
                            } else {
                                actualCol = actualCol + 1;
                            }

                            // IF THE CURRENT COL IS THE LAST COL OF THE DISPLAYED MAP, THEN ADD ACTUAL COLL.
                            if (j % mapLayout.maxColCellEachRowDisplayed == 0 && j != 0 && mapLayout.maxColCellEachRowDisplayed < mapLayout.maxColCellEachRow) {
                                actualCol = actualCol + (mapLayout.maxColCellEachRow - mapLayout.maxColCellEachRowDisplayed);
                            }

                            const currentRow = Math.ceil(actualCol / mapLayout.maxColCellEachRow);


                            return (
                                <div key={j}
                                    id={`cell-row-${currentRow}-col-${actualCol}`}
                                    className={`character-container flex items-center justify-center col-span-1 text-center border border-indigo-600 relative`}
                                >

                                    {/* CONDITION IF ROW & COLL CELL MATCH, TO SHOW CHARACTER  */}
                                    {
                                        (currentRow == characterPosition.current.rowCell && actualCol == characterPosition.current.colCell) ? (
                                            // <Character />
                                            <Image
                                                alt="Character"
                                                className='z-30'
                                                src={`/images/sprites/${characterImage}.gif`}
                                                fill={true}
                                                priority={true}
                                                sizes="(max-width: 150px) 100vw, (max-width: 300px) 50vw, 33vw"
                                                style={{
                                                    objectFit: 'cover',
                                                    height: '100%',
                                                    width: '100%',
                                                    position: 'absolute',
                                                    transition: 'transform 0.3s ease-in-out',
                                                    transform: isCharacterMoving ? `translate(${translation.current.dx}, ${translation.current.dy})` : 'none',
                                                }}
                                            />
                                        ) : null
                                    }
                                    {/* CONDITION IF COLL CELL MATCH, TO SHOW PORTFOLIO OBJECT */}
                                    {mapLayout.portfolioCell.map((portfolio, k) => (
                                        actualCol === portfolio.colCell ? (
                                            <LightBulbIcon
                                                key={k}
                                                className={`${isIdle ? 'animate-bounce-mlp' : ''} text-blood shadow cursor-pointer hover:text-white`} aria-hidden="true" onClick={() => clickPortfolio(portfolio)}
                                                style={{
                                                    objectFit: 'cover',
                                                    width: '45%',
                                                    height: '45%',
                                                    position: 'absolute',
                                                    transition: 'transform 0.2s ease-in-out',
                                                    transform: isCharacterMoving ? `translate(${translationObject.current.dx}, ${translationObject.current.dy})` : 'none',
                                                }}
                                            />
                                        ) : null
                                    ))}
                                </div>
                            )
                        })}
                </div>
                {/* {!isDesktop ? (
                    <div className='flex items-center text-lg font-medium p-4 text-white text-center sm:invisible relative z-10 h-full'>
                        {`To explore my projects, please utilize a desktop (width of 640 pixels or more) and provide a keyboard. I'm trying to make it as a game-like experience.`}
                    </div>
                ) : null} */}
            </div>
            <ModalPortfolio portfolio={portfolio} modalOpen={modalOpen} setModalOpen={setModalOpen} cancelButtonRef={cancelButtonRef} />
        </div >
    )
}