// src/store/StoreProvider.tsx

'use client'; // Ensure this runs as a Client Component

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/app/store/store'; // Adjust the path if necessary

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
