module.exports = Web3 => ({
    web3http: new Web3(new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/83177faca4234778befaca343bb25d23'
    )),
    
    web3: new Web3(new Web3.providers.WebsocketProvider(
    'wss://rinkeby.infura.io/ws/v3/83177faca4234778befaca343bb25d23'))
})

//"https://mainnet.infura.io/v3/YOUR_PROJECT_ID"