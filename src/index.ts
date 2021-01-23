import Server from './Server/server';


const server = Server.init();
server.start(() => {
    console.log('servidor en ejecución');
});

export { server };