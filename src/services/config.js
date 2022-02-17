var config;

console.log("Node Environment: ", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    config = {
        mysql: {
            host: 'localhost',
            database: 'sales',
            username: 'root',
            password: ''
        },
        api_url: 'http://localhost:3001',
        socket_url: 'http://localhost:3005',
    };
} else {
    config = {
        mysql: {
            host: 'localhost',
            database: 'sales',
            username: 'root',
            password: ''
        },
        api_url: 'http://localhost:3001',
        socket_url: 'http://localhost:3005',
    };
}

module.exports = config;