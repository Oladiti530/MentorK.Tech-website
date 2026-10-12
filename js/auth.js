import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://kluyudkqqbvzzwzqzotg.supabase.co";
const SUPABASE_KEY = "sb_publishable_GRnYHdZ7fSZaI8O9_CFGgA_MrFoa1ov";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/index.html' }
  });
  if (error) alert(error.message);
}

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else {
    alert("Account created! Now login.");
    window.location.href = "login.html";
  }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else window.location.href = "index.html";
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}
