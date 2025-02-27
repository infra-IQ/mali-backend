import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv"
dotenv.config()

const supabase = createClient(process.env.SUPABASE_PROJECT_URL || "", process.env.SUPABASE_PUBLIC_KEY || "", {
  global: {
    fetch: (...args) => fetch(...args),
  },
})

export default supabase
