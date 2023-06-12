import React, { useState, useRef  } from 'react';
import styles from './pdf.module.css'
import api from '@/api';
import { useDispatch } from 'react-redux';
import { createPortrait } from '@/store/actions/models';

function PortraitForm({ formData, gameId, characterId, handleModalClose }) {
  const fileInputRef = useRef();
  const [selectedOption, setSelectedOption] = useState(''); // For storing selected option (url, generate, upload)
  const [imageURL, setImageURL] = useState(''); // For storing image URL
  const [imageDescription, setImageDescription] = useState(''); // For storing image description when generating image
  const [suggestUrl, setSuggestUrl] = useState(''); // For storing image description when generating image
  const dispatch = useDispatch();
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getSuggestion = async () => {
    if(!characterId) return;
    const ctx = {
        formData,
        gameId,
        characterId,

    }
    ctx.formData.imageDescription = imageDescription;
    try {
      const { data } = await api.post(`/suggestions/portrait`, ctx);
      console.log('data', data);
      setSuggestUrl(data.url);
    } catch (error) {
        console.log('error', error);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
  
    const data = {}
    data['imageDescription'] = imageDescription
  
    // Depending on the selected option, different data is sent
    switch (selectedOption) {
      case 'url':
        data['imageUrl'] = imageURL
        break;
  
      case 'generate':
        // The image description will be sent to your image generating API
        data['imageUrl'] = suggestUrl
        break;
  
      default:
        console.error('Invalid option');
        return;
    }
    //dispatch an action to create the portrait

    dispatch(createPortrait({modelData: data, gameId, characterId}))
    handleModalClose();


  };

  const handleCancel = (event) => {
      event.preventDefault();
      handleModalClose();
  };
  

  return (
    <>
      <label className={styles.label}>
        Use Image URL:
        <input 
          type="radio" 
          value="url" 
          checked={selectedOption === 'url'} 
          onChange={handleOptionChange} 
          className={styles.radioInput} 
        />
        <input 
          type="text" 
          placeholder="Enter Image URL" 
          onChange={e => setImageURL(e.target.value)} 
          disabled={selectedOption !== 'url'} 
          className={styles.textInput} 
        />
      </label>

      <label className={styles.label}>
        Generate Image:
        <input 
          type="radio" 
          value="generate" 
          checked={selectedOption === 'generate'} 
          onChange={handleOptionChange} 
          className={styles.radioInput} 
        />
        <label>
          Image Description:
        <textarea
          name="imageDescription"
          rows="3"
          value={imageDescription}
          onChange={e => setImageDescription(e.target.value)}
          disabled={selectedOption !== 'generate'}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
        />
        </label>
        <button 
        onClick={getSuggestion}
          type="button"
          disabled={selectedOption !== 'generate'} 
          className={styles.generateButton} 
        >
          Get Images
        </button>
      </label>

      <label className={styles.label}>
        Upload Image:
        <input 
          type="radio" 
          value="upload" 
          checked={selectedOption === 'upload'} 
          onChange={handleOptionChange} 
          className={styles.radioInput} 
        />
        <input 
          type="file" 
          name="picture"
          accept="image/*" 
          disabled={selectedOption !== 'upload'}
          ref={fileInputRef}
        />
      </label>
      {suggestUrl && <div>
        <img src={suggestUrl} alt="portrait" />
      </div>}

      <div className="pt-5">
                <div className="flex justify-end">
                    <button onClick={handleSave} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                    <button onClick={handleCancel} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                </div>
            </div>
    </>
  );
};

export default PortraitForm;
