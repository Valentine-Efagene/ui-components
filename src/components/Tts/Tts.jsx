import Listen from '@/Components/Common/Icons/Listen';
import { Pause, Play, Stop } from '@/Components/Common/Icons';
import IconButton from '@/Components/Common/Input/Buttons/IconButton';
import useSpeechSynthesis from '@/Hooks/useSpeechSynthesis';
import { string } from 'prop-types';
import React from 'react';
import { useState } from 'react';
import styles from './Tts.module.css';

Tts.propTypes = {
  text: string,
};

function Tts({ text }) {
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(0);

  const {
    speak,
    paused,
    speaking,
    supported,
    voices,
    position,
    resume,
    pause,
    cancel,
  } = useSpeechSynthesis({
    onEnd,
  });

  const handleRateChange = e => {
    const _rate = e.target.value;
    setRate(_rate);
    speak({ text, voice, rate, pitch, textPosition: position });
  };

  const onEnd = () => {
    // You could do something here after speaking has finished
  };

  const voice = voices[voiceIndex] || null;

  const play = () => {
    if (supported) {
      speak({ text, voice, rate, pitch });
    }
  };

  return (
    <div className={styles.tts}>
      <Listen fill={speaking ? '#151646' : '#15164680'} />
      <IconButton
        onClick={cancel}
        icon={<Stop className={styles.icon} fill={'#151646'} />}
      />
      {/* <button>
        <img src="/assets/rewind.svg" alt="" />
      </button> */}
      {!speaking && (
        <IconButton
          className={styles.icon}
          disabled={speaking}
          onClick={paused ? resume : play}
          icon={
            <Play
              className={styles.icon}
              fill={speaking ? '#15164680' : '#151646'}
            />
          }
        />
      )}
      {speaking && (
        <IconButton
          onClick={pause}
          icon={<Pause className={styles.icon} fill={'#151646'} />}
        />
      )}
      {/* <button onClick={resume}>
        <img src="/assets/fast-forward.svg" alt="" />
      </button> */}
      <img src="/assets/timer.svg" alt="" />
      <input
        type="range"
        min="0.5"
        max="2"
        defaultValue="1"
        name="rate"
        step="0.1"
        id="rate"
        onChange={handleRateChange}
      />
    </div>
  );
}

export default Tts;
