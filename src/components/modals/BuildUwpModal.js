import React, { useState } from 'react';
import AppModal from '../Modal';

const BuildUwp = ({ modalIsOpen, setModalIsOpen, handleSubmit }) => {
    const [traitText, setTraitText] = useState('');
    const [starport, setStarport] = useState('A');
    const [size, setSize] = useState('0');
    const [atmosphere, setAtmosphere] = useState('0');
    const [hydrographics, setHydrographics] = useState('0');
    const [population, setPopulation] = useState('0');
    const [government, setGovernment] = useState('0');
    const [lawLevel, setLawLevel] = useState('0');
    const [techLevel, setTechLevel] = useState('0');
    const [bases, setBases] = useState([]);
    const [tradeCodes, setTradeCodes] = useState([]);
    const [travelZone, setTravelZone] = useState('0');
    const [allegiance, setAllegiance] = useState('');

    const handleStarportChange = (e) => {
        setStarport(e.target.value);
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleAtmoChange = (e) => {
        setAtmosphere(e.target.value);
    };

    const handleHydroChange = (e) => {
        setHydrographics(e.target.value);
    };

    const handlePopChange = (e) => {
        setPopulation(e.target.value);
    };

    const handleGovChange = (e) => {
        setGovernment(e.target.value);
    };

    const handleLawChange = (e) => {
        setLawLevel(e.target.value);
    };

    const handleTechChange = (e) => {
        setTechLevel(e.target.value);
    };

    const handleTravelChange = (e) => {
        setTravelZone(e.target.value);
    };

    const handleAllegianceChange = (e) => {
        setAllegiance(e.target.value);
    };

    const handleBaseChange = (e) => {
        const { value } = e.target;
        if (bases.includes(value)) {
            const newBases = bases.filter((base) => base !== value);
            setBases(newBases);
        } else {
            const newBases = [...bases, value];
            setBases(newBases);
        }
    };

    const handleTradeChange = (e) => {
        const { value } = e.target;
        if (tradeCodes.includes(value)) {
            const newTradeCodes = tradeCodes.filter((code) => code !== value);
            setTradeCodes(newTradeCodes);
        } else {
            const newTradeCodes = [...tradeCodes, value];
            setTradeCodes(newTradeCodes);
        }
    };

    const handleTraitChange = (e) => {
        setTraitText(e.target.value);
    };

    const handleModalOpen = () => {
        setModalIsOpen(true);
    };


    const handleModalClose = () => {
        setModalIsOpen(false);
        setTraitText('');
    };

    const handleSaveTrait = () => {
        setModalIsOpen(false);
        const uwp = `${starport}${size}${atmosphere}${hydrographics}${population}${government}${lawLevel}-${techLevel} ${bases.join(' ')} ${tradeCodes.join(' ')} ${travelZone} ${allegiance}`;
        setTraitText(uwp);
        handleSubmit(traitText);
    };

    const content = (onSubmit) => (
        <form onSubmit={onSubmit}>
        {/* 
            hex location 
            Starport Quality
            Size
            Atmosphere
            Hydrographics
            Population
            Government
            Law Level
            Tech Level
            Bases
            Trade Codes
            Travel Zone
            Allegiance
            Stellar Data
            //just for reference the UWP of modern day Earth is:
            //A867A97-D
        */}

        {
            //starport quality
        }
        <label className='block'>
            <span className='text-gray-700'>Starport Quality</span>
            <select onChange={handleStarportChange} className='mt-1 block w-full'>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
                <option value='D'>D</option>
                <option value='E'>E</option>
                <option value='X'>X</option>
            </select>
        </label>

        {
            //size
        }
        <label className='block'>
            <span className='text-gray-700'>Size</span>
            <select onChange={handleSizeChange} className='mt-1 block w-full'>
                <option value='0'>{`0 - d<1000km, 0G`}</option>
                <option value='1'>1 - d=1600km, .05G</option>
                <option value='2'>2 - d=3200km, .15G</option>
                <option value='3'>3 - d=4800km, .25G</option>
                <option value='4'>4 - d=6400km, .35G</option>
                <option value='5'>5 - d=8000km, .45G</option>
                <option value='6'>6 - d=9600km, .7G</option>
                <option value='7'>7 - d=11200km, .9G</option>
                <option value='8'>8 - d=12800km, 1.0G</option>
                <option value='9'>9 - d=14400km, 1.25G</option>
                <option value='A'>A - d=16000km, 1.4G</option>
                
            </select>

        </label>

        {
            //atmosphere
        }
        <label className='block'>
            <span className='text-gray-700'>Atmosphere</span>
            <select onChange={handleAtmoChange} className='mt-1 block w-full'>
                <option value='0'>0 - None, 0.00 Bar, Vacc Suit</option>
                <option value='1'>1 - Trace, 0.09 Bar, Vacc Suit</option>
                <option value='2'>2 - Very Thin Tainted, 0.42 Bar, Respirator+Filter</option>
                <option value='3'>3 - Very Thin, 0.42 Bar, Respirator</option>
                <option value='4'>4 - Thin Tainted, 0.7 Bar, Filter</option>
                <option value='5'>5 - Thin, 0.7 Bar, None</option>
                <option value='6'>6 - Standard, 1.5 Bar, None</option>
                <option value='7'>7 - Standard Tainted, 1.5 Bar, Filter</option>
                <option value='8'>8 - Dense, 2.5 Bar, None</option>
                <option value='9'>9 - Dense Tainted, 2.5 Bar, Filter</option>
                <option value='A'>A - Exotic, Varies, Air Supply</option>
                <option value='B'>B - Corrosive, Varies, Vacc Suit</option>
                <option value='C'>C - Insidious, Varies, Vacc Suit</option>
                <option value='D'>D - Dense High, &gt2.5 Bar, None</option>
                <option value='E'>E - Low, &lt0.5 Bar, None</option>
                <option value='F'>F - Unusual, Varies, Varies</option>

            </select>
        </label>

        {
            //hydrographics
        }
        <label className='block'>
            <span className='text-gray-700'>Hydrographics</span>
            <select onChange={handleHydroChange} className='mt-1 block w-full'>
                <option value='0'>0 - 0-5%, Desert</option>
                <option value='1'>1 - 6-15%, Dry</option>
                <option value='2'>2 - 16-25%, Small Seas</option>
                <option value='3'>3 - 26-35%, Small Ocean</option>
                <option value='4'>4 - 36-45%, Wet</option>
                <option value='5'>5 - 46-55%, A Large Ocean</option>
                <option value='6'>6 - 56-65%, Large Oceans</option>
                <option value='7'>7 - 66-75%, Earth-Like</option>
                <option value='8'>8 - 76-85%, Archipelagos</option>
                <option value='9'>9 - 86-95%, Few Islands</option>
                <option value='A'>A - 96-100%, Water World</option>
                </select>
        </label>

        {
            //population
        }
        <label className='block'>
            <span className='text-gray-700'>Population</span>   
            <select onChange={handlePopChange} className='mt-1 block w-full'>
                <option value='0'>0 - 0</option>
                <option value='1'>1 - 10+; single family</option>
                <option value='2'>2 - 100+; vilage</option>
                <option value='3'>3 - 1,000+</option>
                <option value='4'>4 - 10,000+, small town</option>
                <option value='5'>5 - 100,000+, small city</option>
                <option value='6'>6 - 1,000,000+, large city</option>
                <option value='7'>7 - 10,000,000+, small nation</option>
                <option value='8'>8 - 100,000,000+, large nation</option>
                <option value='9'>9 - 1,000,000,000+, modern earth</option>
                <option value='A'>A - 10,000,000,000+, vast</option>
                <option value='B'>B - 100,000,000,000+, crowded world</option>
                <option value='C'>C - 1,000,000,000,000+, world-city</option>
            </select>
        </label>

        {
            //government
        }
        <label className='block'>
            <span className='text-gray-700'>Government</span>
            <select onChange={handleGovChange} className='mt-1 block w-full'>
                <option value='0'>0 - None</option>
                <option value='1'>1 - Company/Corporation</option>
                <option value='2'>2 - Participating Democracy</option>
                <option value='3'>3 - Self-Perpetuating Oligarchy</option>
                <option value='4'>4 - Representative Democracy</option>
                <option value='5'>5 - Feudal Technocracy</option>
                <option value='6'>6 - Captive Government</option>
                <option value='7'>7 - Balkanization</option>
                <option value='8'>8 - Civil Service Bureaucracy</option>
                <option value='9'>9 - Impersonal Bureaucracy</option>
                <option value='A'>A - Charismatic Dictator</option>
                <option value='B'>B - Non-Charismatic Leader</option>
                <option value='C'>C - Charismatic Oligarchy</option>
                <option value='D'>D - Religious Dictatorship</option>
                <option value='E'>E - Religious Autocracy</option>
                <option value='F'>F - Totalitarian Oligarchy</option>
            </select>
        </label>

        {
            //law level
        }
        <label className='block'>
            <span className='text-gray-700'>Law Level</span>
            <select onChange={handleLawChange} className='mt-1 block w-full'>
                <option value='0'>0 - No Law</option>
                <option value='1'>1 - Low Law</option>
                <option value='2'>2 - Low Law</option>
                <option value='3'>3 - Low Law</option>
                <option value='4'>4 - Moderate Law</option>
                <option value='5'>5 - Moderate Law</option>
                <option value='6'>6 - Moderate Law</option>
                <option value='7'>7 - Moderate Law</option>
                <option value='8'>8 - High Law</option>
                <option value='9'>9 - High Law</option>
                <option value='A'>A - High Law</option>
                <option value='B'>B - Extreme Law</option>
                <option value='C'>C - Extreme Law</option>
                <option value='D'>D - Extreme Law</option>
                <option value='E'>E - Extreme Law</option>
                <option value='F'>F - Extreme Law</option>
            </select>
        </label>

        {
            //tech level
        }
        <label className='block'>
            <span className='text-gray-700'>Tech Level</span>
            <select onChange={handleTechChange} className='mt-1 block w-full'>
                <option value='0'>0 - Stone Age</option>
                <option value='1'>1 - Bronze Age</option>
                <option value='2'>2 - Medieval</option>
                <option value='3'>3 - Renaissance</option>
                <option value='4'>4 - Early Industrial</option>
                <option value='5'>5 - Industrial</option>
                <option value='6'>6 - Pre-Stellar</option>
                <option value='7'>7 - Pre-Stellar</option>
                <option value='8'>8 - Pre-Stellar</option>
                <option value='9'>9 - Average Stellar</option>
                <option value='A'>A - Average Stellar</option>
                <option value='B'>B - Average Stellar</option>
                <option value='C'>C - Average Stellar</option>
                <option value='D'>D - High Stellar</option>
                <option value='E'>E - High Stellar</option>
                <option value='F'>F - High Stellar</option>
            </select>
        </label>

        {
            //bases
        }
        <label className='block'>
            <span className='text-gray-700'>Bases</span>
            <div className='mt-1 block w-full'>
                <label className='inline-flex items-center'>
                    <input onChange={handleBaseChange} value="N" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Naval</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleBaseChange} value="S" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Scout</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleBaseChange} value="C" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Corsair</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleBaseChange} value="D" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Depot</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleBaseChange} value="M" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Military</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleBaseChange} value="W" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Way Station</span>
                </label>
            </div>
        </label>

        {
            //trade codes
        }
        <label className='block'>
            <span className='text-gray-700'>Trade Codes</span>
            <div className='mt-1 block w-full'>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Ag" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Ag</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="As" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>As</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Ba" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Ba</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="De" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>De</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Fl" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Fl</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Ga" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Ga</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Hi" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Hi</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Ht" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Ht</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Ic" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Ic</span>
                </label>
            </div>
            <div className='mt-1 block w-full'>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="In" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>In</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Lo" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Lo</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Lt" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>Lt</span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Na" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>
                        Na
                    </span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Ni" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>
                        Ni
                    </span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Po" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>
                        Po
                    </span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Ri" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>
                        Ri
                    </span>
                </label>
                <label className='inline-flex items-center'>
                    <input onChange={handleTradeChange} value="Va" type='checkbox' className='form-checkbox' />
                    <span className='ml-2'>
                        Va
                    </span>
                </label>
            </div>
        </label>

        {
            //travel zone
        }
        <label className='block'>
            <span className='text-gray-700'>Travel Zone</span>
            <select onChange={handleTravelChange} className='mt-1 block w-full'>
                <option value='G'>G - Green</option>
                <option value='A'>A - Amber</option>
                <option value='R'>R - Red</option>
                <option value='E'>E - Exclusion</option>
            </select>
        </label>

        {
            //allegiance
        }
        <label className='block'>
            <span className='text-gray-700'>Allegiance</span>
            <input onChange={handleAllegianceChange} className='mt-1 block w-full' type='text' />
        </label>

            <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleModalClose}>Cancel</button>
            <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSaveTrait}>Save</button>
        </form>
    );

    return (
        <div>
            <AppModal 
                modalIsOpen={modalIsOpen} 
                closeModal={() => setModalIsOpen(false)} 
                content={content} 
                onSubmit={handleSubmit} 
                heading={"Build UWP"}
            />
        </div>
    );
};

export default BuildUwp;
