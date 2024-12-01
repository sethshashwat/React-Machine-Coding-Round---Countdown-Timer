import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerID, setTimerID] = useState(0);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  }

  const handleStart = () => {
    if (hours < 0 || minutes < 0 || seconds < 0) {
      alert("Invalid Input");
      return;
    } else {
      setIsStart(true);
    }
  }

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerID);
  }

  const handleResume = () => {
    setIsPaused(false);
    runTimer(seconds, minutes, hours); 
  }

  const handleReset = () => {
    setIsStart(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    clearInterval(timerID);
  }

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (min === 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    };

    if (sec === 0 && min === 0 && hr === 0) {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      clearInterval(tid);
      alert("Timer is finished");
      setIsStart(false);
    }
  }

  useEffect(() => {
    let tId;
    if (isStart) {
      tId = setInterval(() => {
        runTimer(seconds, minutes, hours, tId);
      }, 1000);
      setTimerID(tId);
    }
    return () => {
      clearInterval(tId);
    }
  }, [isStart, hours, minutes, seconds])

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {
        !isStart &&
        <div className="input-container">
          <div className="input-box">
            <input type="text" id="hours" placeholder='HH' onChange={handleChange} />
            <span>:</span>
            <input type="text" id="minutes" placeholder='MM' onChange={handleChange} />
            <span>:</span>
            <input type="text" id="seconds" placeholder='SS' onChange={handleChange} />
          </div>
          <button className="timer-button" onClick={handleStart}>Start</button>
        </div>
      }

      {
        isStart &&
        <div className="show-container">
          <div className="timer-box">
            <div>{hours < 10 ? `0${hours}` : hours}</div>
            <span>:</span>
            <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
            <span>:</span>
            <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
          </div>
          <div className="buttons">
            {
              !isPaused && <button className="timer-button" onClick={handlePause}>Pause</button>
            }
            {
              isPaused && <button className="timer-button" onClick={handleResume}>Resume</button>
            }
            <button className="timer-button" onClick={handleReset}>Reset</button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
