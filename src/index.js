import Server from './Server/server.js';


const server = Server.init();
server.start(() => {
    console.log('servidor en ejecución');
});

export { server };