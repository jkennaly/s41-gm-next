import { useEffect, useState } from 'react';

const SourceReferenceInput = ({sourceReferenceChanged}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState('');
    const [book, setBook] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        sourceReferenceChanged({
            page,
            book,
            notes,
        });
    }, [page, book, notes]);

    return (
        <div>
            <label>
                Add Source Reference
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={e => setIsChecked(e.target.value)}
                />
            </label>

            {isChecked && (
                <>
                    <label>
                        Page:
                        <input
                            type="number"
                            value={page}
                            onChange={e => setPage(e.target.value)}
                        />
                    </label>

                    <label>
                        Book:
                        <input
                            type="text"
                            value={book}
                            onChange={e => setBook(e.target.value)}
                        />
                    </label>

                    <label>
                        Notes:
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </label>
                </>
            )}
        </div>
    );
};

export default SourceReferenceInput;
