import { useEffect, useState } from 'react';

const useSpeechSynthesis = (props = {}) => {
  const { onEnd = () => {} } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [position, setPosition] = useState();
  const [paused, setPaused] = useState(false);
  const [utterance, setUtterance] = useState();

  const processVoices = voiceOptions => {
    setVoices(voiceOptions);
  };

  const pause = () => {
    window?.speechSynthesis?.pause();
  };

  const resume = () => {
    setSpeaking(true);
    setPaused(false);
    window?.speechSynthesis?.resume();
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = event => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  const handlePause = event => {
    setPosition(event.charIndex);
    setPaused(true);
    setSpeaking(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSupported(true);
      getVoices();
    }
  }, []);

  const speak = (args = {}) => {
    const {
      voice = null,
      text = '',
      rate = 1,
      pitch = 1,
      volume = 1,
      textPosition = 0,
    } = args;

    if (!supported) return;

    // Kill the old instance, and start a new one at the previous
    // position
    window.speechSynthesis.cancel();

    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    const _utterance = utterance ?? new window.SpeechSynthesisUtterance();
    _utterance.text = textPosition > 0 ? text.slice(textPosition) : text;
    _utterance.voice =
      voice ?? voices?.find(voice => voice.name === 'Google UK English Female');
    _utterance.onend = handleEnd;
    _utterance.onpause = handlePause;
    _utterance.rate = rate;
    _utterance.pitch = pitch;
    _utterance.volume = volume;

    setUtterance(_utterance);

    window?.speechSynthesis?.speak(_utterance);

    setSpeaking(true);
    setPaused(false);
  };

  const cancel = () => {
    if (!supported) return;

    setSpeaking(false);
    setPaused(false);
    window.speechSynthesis.cancel();
  };

  return {
    supported,
    speak,
    speaking,
    cancel,
    voices,
    pause,
    paused,
    position,
    resume,
  };
};

export default useSpeechSynthesis;
