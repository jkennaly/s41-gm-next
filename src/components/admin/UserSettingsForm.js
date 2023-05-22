import axios from 'axios';
import React, { useState, useRef  } from 'react';
import { IntegerInput, StringInput, DateTimeInput, SelectInput } from '../formInputs/FormInputs';
import { updateSettings } from '../../store/actions/settings';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/store/reducers/auth';
import { useRouter } from 'next/router';
import styles from './UserSettings.module.css'
import { Button } from '../Button';
import md5 from 'md5';


function UserSettings({ schema }) {
  const fileInputRef = useRef();
  const user = useSelector(selectUser) || {};
  const [selectedOption, setSelectedOption] = useState(''); // For storing selected option (url, gravatar, upload)
  const [imageURL, setImageURL] = useState(''); // For storing image URL
  const [email, setEmail] = useState(''); // For storing user's email (for Gravatar)

  const dispatch = useDispatch();
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
  
      case 'gravatar':
        // Assuming you have some user's email stored to get their Gravatar
        data.append('imageUrl', gravatarUrl(user.email));
        break;
  
      case 'upload':
        // Assuming that file input is accessed through a ref
        const file = fileInputRef.current.files[0];
        data.append('picture', file);
        break;
  
      default:
        console.error('Invalid option');
        return;
    }

    // Dispatch the action
    dispatch(updateSettings(data));
  
    // try {
    //   const response = await axios.post('http://your-api-endpoint.com', data);
    //   // Once the server responds, dispatch the action
    //   dispatch({ type: 'POST_DATA_SUCCESS', payload: response.data });
    // } catch (error) {
    //   console.error(error);
    //   dispatch({ type: 'POST_DATA_FAILURE', payload: error });
    // }
  };
  

  const gravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
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
        Use Gravatar:
        <input 
          type="radio" 
          value="gravatar" 
          checked={selectedOption === 'gravatar'} 
          onChange={handleOptionChange} 
          className={styles.radioInput} 
        />
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

      <Button type="submit" >Submit</Button>
      <Button type="button" >cancel</Button>
    </form>
  );
};

export default UserSettings;