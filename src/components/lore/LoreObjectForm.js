import { useState } from 'react';
import axios from 'axios';
import SourceReferenceInput from '../formInputs/SourceReferenceInput';

const LoreObjectForm = () => {
    const [lore, setLore] = useState('');
    const [sourceReference, setSourceReference] = useState('');
    const [prompt, setPrompt] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/games/lore', {
                lore,
                sourceReference,
                prompt
            });

            // Handle response here
            console.log(response.data);
        } catch (error) {
            // Handle error here
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <>
            <label>
                Lore:
                <textarea value={lore} onChange={e => setLore(e.target.value)} />
            </label>

            <SourceReferenceInput sourceReferenceChanged={setSourceReference} />
            </>

            <>
            <label>
                Prompt:
                <textarea value={prompt} onChange={e => setPrompt(e.target.value)} />
            </label>
            </>

            <button type="submit">Submit</button>
        </form>
    );
};

export default LoreObjectForm;
