module.exports = { 
    apps: [
        { 
            name: 'new-dream', 
            script: 'yarn', 
            args: 'run start:production', // cluster mode 根据cpu个数启动最大进程数量 
            instances: 0 , 
            autorestart: true,
            watch: false, 
            max_memory_restart: '1G', 
            env_production: { NODE_ENV: 'production' } 
        }
    ], 
    deploy: 
        { 
            production: 
            { 
                user: 'user',//服务器用户名 
                host: 'ip',//服务器ip 
                ref: 'origin/master', 
                repo: 'git@github.com:test/test.git', 
                path: '/var/www/test',//项目部署到服务器目录 
                ssh_options: ['ForwardAgent=yes'], 'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
             } 
        } 
    };