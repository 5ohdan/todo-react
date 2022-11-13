import { supabase } from './../supabaseClient.js';

export const isLogged = async () => {
  const user = await supabase.auth.getUser();
  return user;
};
