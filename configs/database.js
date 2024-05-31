const { Client } = require('@elastic/elasticsearch');

const uriMap = {
    development: process.env.DEV_DB_CONNECTION_STRING,
};

console.log("CURRENT_ENV", process.env.CURRENT_ENV);
const selectedEnv = process.env.CURRENT_ENV || 'development';
let uri = uriMap[selectedEnv];


const elasticClient = new Client({
    node: uri,
    auth: {
        apiKey: process.env.ELASTIC_CLOUD_API_KEY
    },
    maxRetries: 5,
    requestTimeout: 60000
});


const getConnectionInfo = async () => {
    const connectionInfo = await elasticClient.info();
    if (!connectionInfo.cluster_name || !connectionInfo.cluster_uuid) return console.error("Elastic Cloud Connection Error")
    console.log("Connected to Elastic Cluster", connectionInfo.cluster_name);
}


module.exports = {
    getConnectionInfo,
    elasticClient
};