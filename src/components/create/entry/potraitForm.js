import React, { useState, useRef  } from 'react';
import styles from './pdf.module.css'

function PersonalDataFileForm({ setActiveSection }) {
  const fileInputRef = useRef();
  const [selectedOption, setSelectedOption] = useState(''); // For storing selected option (url, generate, upload)
  const [imageURL, setImageURL] = useState(''); // For storing image URL
  const [imageDescription, setImageDescription] = useState(''); // For storing image description when generating image

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
  
    // Depending on the selected option, different data is sent
    switch (selectedOption) {
      case 'url':
        data.append('imageUrl', imageURL);
        break;
  
      case 'generate':
        // The image description will be sent to your image generating API
        data.append('imageDescription', imageDescription);
        break;
  
      case 'upload':
        const file = fileInputRef.current.files[0];
        data.append('picture', file);
        break;
  
      default:
        console.error('Invalid option');
        return;
    }

    setActiveSection(null)
  };

  const handleCancel = (event) => {
      event.preventDefault();
      setActiveSection(null)
  };
  

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
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
        <textarea
          name="currentPrompt"
          rows="3"
          disabled
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
        />
        <textarea
          name="imageDescription"
          rows="3"
          value={imageDescription}
          onChange={e => setImageDescription(e.target.value)}
          disabled={selectedOption !== 'generate'}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
        />
        <button 
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

      <div className="pt-5">
                <div className="flex justify-end">
                    <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                    <button onClick={handleCancel} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                </div>
            </div>
    </form>
  );
};

export default PersonalDataFileForm;
