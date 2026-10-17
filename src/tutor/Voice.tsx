import {useEffect,useState,useRef} from 'react';
import {Volume2,Pause,Play,Square} from 'lucide-react';
import {languageCodes} from './model';
export default function Voice({text,language,onStep}:{text:string;language:string;onStep?:(n:number)=>void}){
 const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]),[active,setActive]=useState(false),[paused,setPaused]=useState(false),[error,setError]=useState('');
 const generation=useRef(0);
 const supported=typeof window!=='undefined'&&'speechSynthesis' in window;
 useEffect(()=>{if(!supported)return;const update=()=>setVoices(speechSynthesis.getVoices());update();speechSynthesis.addEventListener('voiceschanged',update);return()=>{speechSynthesis.removeEventListener('voiceschanged',update);generation.current++;speechSynthesis.cancel();};},[supported]);
 useEffect(()=>{generation.current++;if(supported)speechSynthesis.cancel();setActive(false);setPaused(false);},[text,language,supported]);
 const voice=voices.find(v=>v.lang.toLowerCase().startsWith(languageCodes[language]||'en'));
 function speak(){if(!voice){setError(`No ${language} voice is installed in this browser. Text explanations are available.`);return;}const run=++generation.current;speechSynthesis.cancel();setError('');setActive(true);setPaused(false);const parts=text.match(/[^.!?\n]+[.!?]?/g)?.filter(x=>x.trim())||[text];let i=0;const next=()=>{if(run!==generation.current)return;if(i>=parts.length){setActive(false);return;}onStep?.(i);const utterance=new SpeechSynthesisUtterance(parts[i++]);utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.92;utterance.onend=next;utterance.onerror=()=>{if(run!==generation.current)return;setActive(false);setError('Voice playback stopped. Try again or read the explanation.');};speechSynthesis.speak(utterance);};next();}
 return <div className="et-voice"><span>Browser voice · {language}</span><button type="button" disabled={!supported||!text.trim()} onClick={speak}><Volume2 size={15}/> Read aloud</button><button type="button" disabled={!active} onClick={()=>{if(paused)speechSynthesis.resume();else speechSynthesis.pause();setPaused(!paused);}}>{paused?<Play size={15}/>:<Pause size={15}/>} {paused?'Resume':'Pause'}</button><button type="button" disabled={!active} onClick={()=>{generation.current++;speechSynthesis.cancel();setActive(false);setPaused(false);}}><Square size={15}/> Stop</button>{(!supported||error)&&<small role="status">{error||'Voice playback is unavailable in this browser.'}</small>}</div>;
}
