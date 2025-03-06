import React, { useEffect, useState, Suspense } from 'react';
import getWeather from './async/getWeather';
import { useAppDispatch } from './hooks/hooks';
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Saved = React.lazy(() => import('./pages/Saved'));
// const Contact = React.lazy(() => import('./pages/Contact'));

const App = () => {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        dispatch(getWeather(response.coords));
      },
      (error) => {
        const coords = {
          latitude: 28.7041,
          longitude: 77.1025,
        };
        dispatch(getWeather(coords));
      }
    );
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme ? '#101827' : '#DDDDDD';
  }, [theme]);

  return (
    <Routes>
      <Route path='*' element={<Layout theme={theme} setTheme={setTheme} />}>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home theme={theme} />
            </Suspense>
          }
        />
        <Route
          path='saved'
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Saved theme={theme} />
            </Suspense>
          }
        />
        
      </Route>
    </Routes>
  );
};

export default App;
