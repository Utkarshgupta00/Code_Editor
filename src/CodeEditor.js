import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import './CodeEditor.css';
import Navbar from './Navbar';

const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [isLocked, setIsLocked] = useState(false);
  
    const [copyMessage, setCopyMessage] = useState('');
    const [saveMessage, setSaveMessage] = useState(''); // New state for save message

    const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyMessage();
    };

    const handleInputChange = (e) => {
        const newText = e.target.value;
        setCode(newText);
    };

    const handleSave = () => {
        if (code.trim() === '') {
            // If there is nothing written in the text area, prevent saving
            setSaveMessage('Please enter some code before saving.');
            setTimeout(() => {
                setSaveMessage('');
            }, 3000); // Display the message for 3 seconds
            return;
        }

        // Save the code to the savedCode state


        // Save the code as a .txt file
        const blob = new Blob([code], { type: 'text/plain' });
        saveAs(blob, 'savedCode.txt');
    };

    const showCopyMessage = () => {
        setCopyMessage('Code copied to clipboard');
        setTimeout(() => {
            setCopyMessage('');
        }, 2000);
    };

    const toggleLock = () => {
        setIsLocked(!isLocked);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Tab' && !isLocked) {
            e.preventDefault();
            const codeTextArea = e.target;
            const selectionStart = codeTextArea.selectionStart;
            const selectionEnd = codeTextArea.selectionEnd;

            const spaces = '  ';

            codeTextArea.value =
                code.substring(0, selectionStart) +
                spaces +
                code.substring(selectionEnd);
            codeTextArea.selectionStart = selectionStart + spaces.length;
            codeTextArea.selectionEnd = codeTextArea.selectionStart;

            setCode(codeTextArea.value);
        }
    };

    return (
        <>
            <Navbar onSave={handleSave} />
            <div className="hero">Edit Your  Code in<span> Seconds</span></div>

            <div className="code-editor">
                <textarea
                    className="code"
                    value={code}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    readOnly={isLocked}
                    dir="ltr"
                    placeholder="
                    example : 

                def factorial(n):
                    if n == 0:
                        return 1
                    else:
                        return n * factorial(n - 1)
                
                number = 5
                result = factorial(number)
                print(f'The factorial of {number} is {result}')
                "
                />

                <div className="editor-toolbar">
                    <button className="button" onClick={handleCopy}>
                        COPY
                    </button>

                    <button className="button" onClick={toggleLock}>
                        {isLocked ? 'UNLOCK' : 'LOCK'}
                    </button>
                </div>
                {copyMessage && <div className="copy-message">{copyMessage}</div>}
                {saveMessage && <div className="save-message">{saveMessage}</div>}
            </div>

        </>
    );
};

export default CodeEditor;
