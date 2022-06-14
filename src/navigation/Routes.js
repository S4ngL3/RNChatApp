import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [initilizing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    console.log('user:', JSON.stringify(user));
    setUser(user);
    if (initilizing) setInitializing(false);
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });
  return <NavigationContainer>{user ? <HomeStack /> : <AuthStack />}</NavigationContainer>;
}
