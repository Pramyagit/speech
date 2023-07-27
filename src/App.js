import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import useClipboard from "react-use-clipboard";

function App() {
 
  const [isActive, setIsActive] = useState(false);

  const[input,setInput]=useState('')
  const [isCopied, setCopied] = useClipboard(input,{
    successDuration:10000
  });
  const startListening=()=>{
    SpeechRecognition.startListening({continuous:true});
    setIsActive(current => !current);
  }
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div className="App">
      <h1>Speech Recognition</h1>
      <div className='container'>
      <div className='btns'>
          <div className='btnsBtn'>
          <button  className={isActive ? 'bg-act' : ''} onClick={startListening}>start</button>
            <button onClick={SpeechRecognition.stopListening}>stop</button>
            <button onClick={resetTranscript}>reset</button>
          </div>
        <div className='text' id="textcopy" onClick={(e)=>
      // console.log(e.target.innerHTML)
      setInput(e.target.innerHTML)
          } value={input}>{transcript}</div>
        </div>
        <button className='btncopy' onClick={setCopied}>
      Copy to clipboard {isCopied?alert("copy the text"):""}
    </button>
       
      </div>
    </div>
  );
}

export default App;
