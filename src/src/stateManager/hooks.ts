import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useState, useEffect } from 'react'
import { time } from 'console'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTimeDiff = (timestamp: number) => {
    console.log(timestamp)
    const [currentTime, setCurrentTime] = useState(new Date());
    const timeDiff = `${Math.floor((currentTime.getTime()/1000 - timestamp)/60)} minutes ago`;
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

    return timeDiff;
}