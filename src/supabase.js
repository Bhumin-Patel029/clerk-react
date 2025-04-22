import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lvappjlginaoveusqryh.supabase.co'; // <-- paste from Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2YXBwamxnaW5hb3ZldXNxcnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyODk4MTIsImV4cCI6MjA2MDg2NTgxMn0.l1DDKk8qKzxeYHoZo7YXwAu8Y4nGf8kZit2VegIt024'; // <-- paste from Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
