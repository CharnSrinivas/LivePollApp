import env from 'dotenv'
import path from 'path';
env.config({ path: path.join(__dirname, '.env') });
import('./app/server').then(server_module => {
    server_module.default()
})
