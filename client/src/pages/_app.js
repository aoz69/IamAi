// ** Next Imports
import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { CacheProvider } from '@emotion/react'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import CircularProgress from '@mui/material/CircularProgress';
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'
const clientSideEmotionCache = createEmotionCache()



const App = props => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (router.pathname !== '/pages/login') {
      fetch('http://localhost:3100/getSession', {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success' && data.user) {
            console.log(data.user.name);
            setLoading(false);
          } else {
            router.push('/pages/login'); 
          }
        })
        .catch((error) => {
          console.error('Error fetching user session:', error);
          setLoading(false);
        });
    } else {
      setLoading(false); 
    }
}, [router.pathname]);

    if (loading) {
      return <CircularProgress />;
    }
  
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props


  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
