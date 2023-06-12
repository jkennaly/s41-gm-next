import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import MyModal from '../../modals/AddTraitModal';
import HomeworldInput from './HomeworldInput';
import NameInput from './NameInput';
import TraitContent from './TraitContent';
import PortraitForm from './potraitForm';
import { addModel } from '../../../store/actions/models';
import { useDispatch, useSelector } from 'react-redux';
import { selectImgSrcForCharacter, selectCharacter } from '@/store/selectors/characters';

const PersonalDataFileForm = ({ setActiveSection, characterId, gameId }) => {
    const character = useSelector((state) => selectCharacter(state, characterId));
  
    const currentPdf = character.personalDataFile || {};
    const { register, handleSubmit, setValue, getValues, control } = useForm();
    //set the default values for the form from the currentPdf
    const portraitSrc = useSelector((state) => selectImgSrcForCharacter(state, character.id));
  

    const traitField = useFieldArray({
        control,
        name: "traits"
    });

    const noteField = useFieldArray({
        control,
        name: "backgroundNotes"
    });

    const featureField = useFieldArray({
        control,
        name: "distinguishingFeatures"
    });

    useEffect(() => {
        setValue('name', currentPdf.name);
        setValue('age', currentPdf.age);
        setValue('species', currentPdf.species);
        setValue('homeworld', currentPdf.homeworld);
        setValue('title', currentPdf.title);
        
        traitField.remove()
        if(currentPdf.traits) {
        currentPdf.traits.forEach(el => {
            traitField.append(el)
        });
        }
        
        featureField.remove()
        if(currentPdf.distinguishingFeatures) {
        currentPdf.distinguishingFeatures.forEach(el => {
            featureField.append(el)
        });
        }
        
        noteField.remove()
        if(currentPdf.backgroundNotes) {
        currentPdf.backgroundNotes.forEach(el => {
            noteField.append(el)
        });       
        }
        setValue('portrait', currentPdf.portrait);


    }, [])
    
    
    const formData = getValues();
    
    const dispatch = useDispatch();
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalSubmit, setModalSubmit] = useState('trait');


    const handleModalClose = () => {
        setModalOpen(false);
    };

    const onSubmit = (data) => {
        console.log(data);
        dispatch(addModel({modelData: data, modelName: 'pdf', characterId: character.id}, 'pdf'))
    
        setActiveSection(null)
    };

    const handleCancel = (event) => {
        event.preventDefault();
        setActiveSection(null)
    };

    const handleAddPortrait = () => {
        setModalSubmit('portrait')

        setModalOpen(true);
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

    const submitTrait = e => {
        e.preventDefault();
    }

    const submitFeature = e => {
        e.preventDefault();
    }

    const submitNote = e => {
        e.preventDefault();
    }

    const submitAddPortrait = e => {
        e.preventDefault();
    }

    const { 
        traits = [],
        distinguishingFeatures = [],
        backgroundNotes = [],  
    } = formData;

    console.log({character});

    const content = modalSubmit === 'portrait' ? <PortraitForm 
    formData={formData} characterId={character.id} gameId={gameId} 
    handleModalClose={handleModalClose} 
/> 
: modalSubmit === 'trait' ? <TraitContent 
fields={traitField.fields} append={traitField.append} 
remove={traitField.remove} setValue={setValue} 
character={character} gameId={gameId} 
handleSubmit={handleSubmit} 
register={register} 
fieldName={"trait"} 
getValues={getValues} 
handleModalClose={handleModalClose} 
/> 
: modalSubmit === 'feature' ? <TraitContent 
    fields={featureField.fields} append={featureField.append} 
    remove={featureField.remove} setValue={setValue} 
    character={character} gameId={gameId} 
    handleSubmit={handleSubmit} 
    register={register} 
    fieldName={"distinguishingFeature"} 
    getValues={getValues} 
    handleModalClose={handleModalClose} 
/> 
    : <TraitContent 
    fields={noteField.fields} append={noteField.append} 
    remove={noteField.remove} setValue={setValue} 
    character={character} gameId={gameId} 
    handleSubmit={handleSubmit} 
    register={register} 
    fieldName={"backgroundNote"} 
    getValues={getValues} 
    handleModalClose={handleModalClose} 
/>

    return (
        <>
            <MyModal
                heading={modalSubmit === 'portrait' ? 'Add Portrait' : modalSubmit === 'trait' ? 'Add Trait' : modalSubmit === 'feature' ? 'Add Distinguishing Feature' : 'Add Background Note'}
                content={content}
                modalIsOpen={isModalOpen}
                setModalIsOpen={setModalOpen}
                handleSubmit={modalSubmit === 'portrait' ? submitAddPortrait : modalSubmit === 'trait' ? submitTrait : modalSubmit === 'feature' ? submitFeature : submitNote}
            ></MyModal>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Data</h3>
          { portraitSrc && <img src={portraitSrc} alt="portrait" className="h-60 w-60 rounded-full mx-auto" />}
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="species" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Species</label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
                {...register('species', { required: true })}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <HomeworldInput register={register} gameId={gameId} setValue={setValue} />
        <div className="space-y-6 sm:space-y-5">
          <NameInput register={register} setValue={setValue} />

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Title</label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                {...register('title', { required: true })}
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

                    {traits.map(({trait}, index) => (
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
                    {distinguishingFeatures.map(({trait: feature}, index) => (
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
                    {backgroundNotes.map(({trait: note}, index) => (
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
