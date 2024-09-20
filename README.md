# build-social-media-dapp-on-core

## Contract Deployment

- Fork and clone the repo 
- Navigate into the folder using `cd build-social-media-dapp-on-core`.
- Install dependencies by running `npm install`.
- Create **.env** file and place your Private Key inside it.
- Run `npx hardhat compile` to compile.
- Run `npx hardhat ignition deploy ./ignition/modules/deploy.js --network core_testnet`to deploy.
