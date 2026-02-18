import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://swphlegimpvvegcfsahz.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU0NmEwMWZmLWNiNzYtNDU4ZC1hYTRjLWNiMTRmYWE1Y2NmMiJ9.eyJwcm9qZWN0SWQiOiJzd3BobGVnaW1wdnZlZ2Nmc2FoeiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcxMjI0ODA3LCJleHAiOjIwODY1ODQ4MDcsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.49CgD_csVU5zbwx3nAXXNEU5AG_w4eU2g5_HG4Kx31s';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };