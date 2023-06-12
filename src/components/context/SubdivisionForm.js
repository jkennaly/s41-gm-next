import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addModel } from '../../store/actions/models';
import UwpModal from '../modals/BuildUwpModal';
import { api } from '../../api';

const SubdivisionForm = ({ 
    game, 
    context, 
    setDisplay, 
    display 
}) => {
  const { register, handleSubmit, formState, getValues, setValue, watch } = useForm();
    const dispatch = useDispatch();
    const [uwp, setUwp] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);

    const { errors } = formState;
    const description = watch('description')
    const name = watch('name')
    const prompt = watch('prompt')

    const onCancel = () => {
        setDisplay({scale: 'game', focus: 'overall', type: 'universe', function: 'view'});
    }

    const handleUwpSubmit = (uwp) => {
        console.log('handleUwpSubmit', uwp);
      setUwp(uwp);
      setIsOpen(false);
    }

  const onSubmit = async (modelData) => {
    modelData.gameId = game.id;
    modelData.universeId = context.id;
    modelData.superId = display.parentId;
    modelData.uwp = uwp;

    console.log('onSubmit', modelData);

    dispatch(addModel({modelData, modelName: 'subdivision'}, 'subdivision'))
    setDisplay({scale: 'game', focus: 'overall', type: 'universe', function: 'view'});
    
  }
  const requestSuggestion = async (event) => {
    //get the form data form the hook form
    const formData = getValues();

    const ctx = {
        game, 
        context, 
        setDisplay, 
        display,
        formData
        
    }
    try {
    console.log('getting a suggestion', formData);
    const { data } = await api.post(`/suggestions`, ctx);
    console.log('suggestion', data);
    setValue('description', data.suggestion);
    } catch (error) {
        console.log('error', error);
    }
    
  }

  const submitDisabled = !description || !name
  const suggestionDisabled = description || !name || !prompt
  console.log('SubdivisionForm', display);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-md min-w-80">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input 
              {...register('name', { required: true })} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && <span className="text-red-500 text-xs italic">This field is required</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scale">Scale</label>
            <input 
              {...register('scale', { required: true })} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.scale && <span className="text-red-500 text-xs italic">This field is required</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uwp">UWP</label>
            <p>{uwp}</p>
            <button type="button" onClick={() => setIsOpen(true)}>Enter UWP</button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
            <textarea
              {...register('description')} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">Prompt</label>
            <textarea
              {...register('prompt')} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button 
              type="button"
              disabled={suggestionDisabled}
                onClick={requestSuggestion}
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${suggestionDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Suggest Description
            </button>
            <button 
              type="submit"
              disabled={submitDisabled}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${submitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
>
              Create Subdivision
            </button>
            <button
                type="button"
                onClick={onCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Cancel
            </button>
          </div>
        </form>

        <UwpModal 
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setIsOpen}
          handleSubmit={handleUwpSubmit}
        />
      </div>
    </div>
  );
};

export default SubdivisionForm;
