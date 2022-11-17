import React, { useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { AuthComponentProps } from '../utils/interfaces.js';

export const AuthComponent = ({ onLogin }: AuthComponentProps) => {
  const loginHandler = async () => {
    try {
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) throw new Error();
      onLogin(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => loginHandler()}
      className="bg-blue-700 text-white hover:bg-blue-800 rounded p-2"
    >
      Sign in with Github
    </button>
  );
};
