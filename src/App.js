import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import useClipboard from "react-use-clipboard";
// import { useTranslation } from 'react-i18next'
// const languages = [
//     { value: '', text: "Options" },
//     { value: 'en', text: "English" },
//     { value: 'hi', text: "Hindi" },
//     { value: 'bn', text: "Bengali" },
//      { value: 'ta', text: "Tamil" }
// ]


function App() {
  // const [lang, setLang] = useState('en');
  // const { t } = useTranslation();
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
  // const select= document.getElementsByClassName('select');

  //   console.log(select);


// const selcetionLang=(e)=>{
//   const lang=e.target.value;
//   let a=[lang];
//   console.log(a)
// }
// const handleChange = e => {
//         setLang(e.target.value);
//         let loc={transcript};
//          let set=window.location.replace(loc+ "?lng=" + e.target.value);
//          console.log(set)
//     }

  
  return (
    <div className="App">
      <h1>Speech Recognition</h1>
      <div className='container'>
        {/* <select  className='select' onChange={selcetionLang}>
        <option value="">select the language</option>
          <option value="Tamil">Tamil</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Kanada">Kanada</option>
          <option value="Malayam">Malayalam</option>
          <option value="Telugu">Telugu</option>
          <option value="French">French</option>
          <option value="Japanese">Japenese</option>
        </select> */}
            {/* <label>{t('choose')}</label>
 
        <select value={lang} onChange={handleChange}>
                {languages.map(item => {
                  // console.log(item.text)
                  return (<option key={item.value}
                    value={item.value}>{item.text}</option>);
                  }
                      )
                    }
            </select>
        <br></br>
       */}
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
