import server from './app/server'
import env from 'dotenv'
import path from 'path'
env.config({ path: path.join(__dirname, '.env') });
server();