import { createClient } from '@supabase/supabase-js';

// ATENÇÃO: Substitua pelos dados do seu projeto Supabase
const supabaseUrl = 'https://nivfzgcyrzowozkigtdp.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdmZ6Z2N5cnpvd296a2lndGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMzE3ODEsImV4cCI6MjA3OTgwNzc4MX0.hR8A0u0zaDNzPAHW3Zad7H3TyYjq5e1vK0UfttP1FYQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);