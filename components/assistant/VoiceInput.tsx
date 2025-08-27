
import React, { useState, useEffect, useRef } from 'react';
import Icon from '../common/Icon';
import toast from 'react-hot-toast';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition: any = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, disabled }) => {
    const [isListening, setIsListening] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
      isMounted.current = true;
      return () => { isMounted.current = false };
    }, []);
    
    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (isMounted.current) {
              onTranscript(transcript);
              setIsListening(false);
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            toast.error(`Speech recognition error: ${event.error}`);
            if (isMounted.current) {
              setIsListening(false);
            }
        };

        recognition.onend = () => {
            if (isMounted.current) {
              setIsListening(false);
            }
        };

    }, [onTranscript]);

    const handleToggleListening = () => {
        if (!SpeechRecognition) {
            toast.error("Sorry, your browser doesn't support voice recognition.");
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
            setIsListening(true);
        }
    };
    
    return (
        <button
            type="button"
            onClick={handleToggleListening}
            disabled={disabled}
            className={`p-2 rounded-lg ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-600'} disabled:bg-opacity-50`}
        >
            <Icon name={isListening ? 'MicOff' : 'Mic'} size={20} />
        </button>
    );
};

export default VoiceInput;
