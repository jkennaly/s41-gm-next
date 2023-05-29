import React, { useEffect, useState } from 'react';
import MyModal from '../../modals/AddTraitModal';

const PersonalDataFileForm = ({ setActiveSection, character }) => {
    const pdf = character?.personalDataFile || {};
    const [name, setName] = useState(pdf.Name || '');
    const [species, setSpecies] = useState(pdf.Species || '');
    const [homeworld, setHomeworld] = useState(pdf.Homeworld || '');
    const [age, setAge] = useState(pdf.Age || '');
    const [title, setTitle] = useState(pdf.Title || '');
    const [traits, setTraits] = useState(pdf.Traits || []);
    const [features, setFeatures] = useState(pdf.DistinguishingFeatures || []);
    const [notes, setNotes] = useState(pdf.BackgroundNotes || []);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newTrait, setNewTrait] = useState('');
    const [newNote, setNewNote] = useState('');
    const [newFeature, setNewFeature] = useState('');


    const handleSaveTrait = () => {
        // Code to submit the new trait via a Colyseus message goes here
        console.log(newTrait);
        setTraits([...traits, newTrait]);
        setModalOpen(false);
        setNewTrait('');
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setNewTrait('');
    };
    const [modalSubmit, setModalSubmit] = useState('trait');

    useEffect(() => {
        setName(name || pdf.Name || '');
        setSpecies(species || pdf.Species || '');
        setHomeworld(homeworld || pdf.Homeworld || '');
        setAge(age || pdf.Age || '');
        setTitle(title || pdf.Title || '');
        setTraits(traits || pdf.Traits || []);
        setFeatures(features || pdf.DistinguishingFeatures || []);
        setNotes(notes || pdf.BackgroundNotes || []);
    }, [pdf]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setActiveSection(null)
    };

    const handleCancel = (event) => {
        event.preventDefault();
        setActiveSection(null)
    };

    const handleAddPortrait = () => {
        console.log("Add Portrait Clicked");
    };

    const handleSelectPortrait = () => {
        console.log("Select Portrait Clicked");
    };

    const handleAddFeature = () => {
        setModalSubmit('feature')

        setModalOpen(true);
    };

    const handleAddNote = () => {
        setModalSubmit('note')

        setModalOpen(true);
    };

    const handleAddTrait = () => {
        setModalSubmit('trait')

        setModalOpen(true);
    };

    const handleSaveFeature = () => {
        // Code to submit the new Feature via a Colyseus message goes here
        console.log(newFeature);
        setFeatures([...features, newFeature]);
        setModalOpen(false);
        setNewFeature('');
    };

    const handleSaveNote = () => {
        // Code to submit the new Note via a Colyseus message goes here
        console.log(newNote);
        setNotes([...notes, newNote]);
        setModalOpen(false);
        setNewNote('');

    };

    const submitTrait = e => {
        e.preventDefault();
        setNewTrait(e.target.value);
    }

    const submitFeature = e => {
        e.preventDefault();
        setNewFeature(e.target.value);
    }

    const submitNote = e => {
        e.preventDefault();
        setNewNote(e.target.value);
    }

    const traitContent = <>
        <textarea className='mt-1 block w-full h-20' value={newTrait} onChange={(e) => setNewTrait(e.target.value)} />
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleModalClose}>Cancel</button>
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSaveTrait}>Save</button>
    </>

    const noteContent = <>
        <textarea className='mt-1 block w-full h-20' value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleModalClose}>Cancel</button>
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSaveNote}>Save</button>
    </>

    const featureContent = <>
        <textarea className='mt-1 block w-full h-20' value={newFeature} onChange={(e) => setNewFeature(e.target.value)} />
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleModalClose}>Cancel</button>
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSaveFeature}>Save</button>
    </>


    return (
        <>
            <MyModal
                heading={modalSubmit === 'trait' ? 'Add Trait' : modalSubmit === 'feature' ? 'Add Distinguishing Feature' : 'Add Background Note'}
                content={modalSubmit === 'trait' ? traitContent : modalSubmit === 'feature' ? featureContent : noteContent}
                modalIsOpen={isModalOpen}
                setModalIsOpen={setModalOpen}
                handleSubmit={modalSubmit === 'trait' ? submitTrait : modalSubmit === 'feature' ? submitFeature : submitNote}
            ></MyModal>
            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Data</h3>

                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="species" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Species</label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                id="species"
                                name="species"
                                type="text"
                                required
                                value={species}
                                onChange={(event) => setSpecies(event.target.value)}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="homeworld" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Homeworld</label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                id="homeworld"
                                name="homeworld"
                                type="text"
                                required
                                value={homeworld}
                                onChange={(event) => setHomeworld(event.target.value)}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Name</label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Age</label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    required
                                    value={age}
                                    onChange={(event) => setAge(event.target.value)}
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Title</label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <button onClick={handleAddTrait} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Trait</button>
                    <span className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Traits
                    </span>
                    {traits.map((trait, index) => (
                        <div key={index} className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    {trait}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <button onClick={handleAddFeature} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Distinguishing Feature</button>
                    <span className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Distinguishing Features
                    </span>
                    {features.map((feature, index) => (
                        <div key={index} className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    {feature}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <button onClick={handleAddNote} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Background Note</button>
                    <span className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Background Notes
                    </span>
                    {notes.map((note, index) => (
                        <div key={index} className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    {note}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-5 grid grid-cols-5 gap-4">
                    <button onClick={handleAddPortrait} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Portrait</button>
                    <button onClick={handleSelectPortrait} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Select Portrait</button>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                        <button onClick={handleCancel} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default PersonalDataFileForm;
