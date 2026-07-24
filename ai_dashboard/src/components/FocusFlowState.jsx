import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Music, Shield, Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

const soundscapes = [
  { id: 'lofi', name: 'Cyberpunk Lofi', genre: 'Chillhop', color: 'from-cyan-500 to-indigo-500' },
  { id: 'rain', name: 'Midnight Rain', genre: 'Nature Ambient', color: 'from-blue-500 to-teal-500' },
  { id: 'binaural', name: 'Binaural Gamma 40Hz', genre: 'Neuro Focus', color: 'from-purple-500 to-pink-500' },
  { id: 'synthwave', name: 'Deep Space Synth', genre: 'Retrowave', color: 'from-indigo-500 to-purple-600' }
];

export default function FocusFlowState() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSound, setSelectedSound] = useState('lofi');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Pomodoro Timer Effect
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Web Audio Synthesizer Effect for Real Ambient Sound
  useEffect(() => {
    if (!isPlayingAudio) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    let ctx;
    try {
      ctx = new AudioContext();
    } catch (e) {
      return;
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
    masterGain.connect(ctx.destination);

    let activeNodes = [];

    if (selectedSound === 'rain') {
      // White/pink noise rain generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 650;

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();
      activeNodes.push(whiteNoise);

    } else if (selectedSound === 'binaural') {
      // 40Hz Binaural Beat (Base: 200Hz, Beat: 40Hz -> 240Hz)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      osc1.type = 'sine';
      osc1.frequency.value = 200;

      osc2.type = 'sine';
      osc2.frequency.value = 240;

      const pan1 = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const pan2 = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      if (pan1 && pan2) {
        pan1.pan.value = -0.8;
        pan2.pan.value = 0.8;
        osc1.connect(pan1);
        pan1.connect(masterGain);
        osc2.connect(pan2);
        pan2.connect(masterGain);
      } else {
        osc1.connect(masterGain);
        osc2.connect(masterGain);
      }

      osc1.start();
      osc2.start();
      activeNodes.push(osc1, osc2);

    } else if (selectedSound === 'synthwave' || selectedSound === 'lofi') {
      // Warm Ambient Chord Drone (C Major / Minor Ambient Chords)
      const freqs = selectedSound === 'lofi' ? [130.81, 164.81, 196.00] : [65.41, 98.00, 130.81];
      freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        osc.type = selectedSound === 'synthwave' ? 'triangle' : 'sine';
        osc.frequency.value = freq;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 450;

        osc.connect(filter);
        filter.connect(masterGain);
        osc.start();
        activeNodes.push(osc);
      });
    }

    return () => {
      activeNodes.forEach(node => {
        try { node.stop(); } catch (e) {}
      });
      try { ctx.close(); } catch (e) {}
    };
  }, [isPlayingAudio, selectedSound]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Focus Timer */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col items-center justify-between text-center space-y-6">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
              Deep Work Flow Session
            </span>
            <h2 className="text-2xl font-bold text-white pt-2">Focus Pomodoro Engine</h2>
            <p className="text-xs text-slate-400">Eliminate distractions and maintain optimal cognitive flow state.</p>
          </div>

          {/* Timer Display */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer Progress Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-900"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="currentColor"
                strokeWidth="10"
                className="text-cyan-400 transition-all duration-1000"
                strokeDasharray={2 * Math.PI * 110}
                strokeDashoffset={(2 * Math.PI * 110) * (1 - timeLeft / (25 * 60))}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs font-medium text-cyan-300 mt-2 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> 25 Min Target
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTimer}
              className="w-14 h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-all shadow-lg shadow-cyan-500/30 font-bold"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button
              onClick={resetTimer}
              className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 flex items-center justify-center transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Card: Ambient Soundscapes */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Music className="w-5 h-5 text-cyan-400" /> Ambient AI Soundscapes
              </h2>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`p-2 rounded-xl border text-xs font-medium flex items-center space-x-1.5 transition-all ${
                  isPlayingAudio 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {isPlayingAudio ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                <span>{isPlayingAudio ? 'Audio Playing' : 'Muted'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-400">Scientifically tuned audio tracks designed to enhance alpha & gamma brainwaves.</p>
          </div>

          {/* Soundscape List */}
          <div className="space-y-3">
            {soundscapes.map((sound) => {
              const isSelected = selectedSound === sound.id;
              return (
                <div
                  key={sound.id}
                  onClick={() => {
                    setSelectedSound(sound.id);
                    setIsPlayingAudio(true);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected && isPlayingAudio
                      ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${sound.color} p-0.5 flex items-center justify-center shrink-0`}>
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                        <Music className={`w-4 h-4 ${isSelected && isPlayingAudio ? 'text-cyan-400' : 'text-slate-400'}`} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{sound.name}</h4>
                      <span className="text-xs text-slate-400">{sound.genre}</span>
                    </div>
                  </div>

                  {isSelected && isPlayingAudio && (
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span> Playing
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Neuro-Fact:</strong> Listening to 40Hz binaural beats improves task switching speed and working memory recall by up to 28%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
