import { supabase } from './../supabaseClient.js';

export const isLogged = async () => {
  const response = await supabase.auth.getUser();
  const user = response.data.user;
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
