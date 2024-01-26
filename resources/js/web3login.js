import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const web3Modal = new Web3Modal({
	cacheProvider: true,
	providerOptions: {
        walletconnect: {
            package: window.WalletConnectProvider,
            options: {
                infuraId: '065f8a1a254f499594133463f1bc6786', // Replace with your Infura API key
            },
        },
        metamask: {
            package: window.MetaMaskProvider,
            // Options are automatically inferred but can also be defined explicitly
            // network: 'mainnet',
        },
    }, // add additional providers here, like WalletConnect, Coinbase Wallet, etc.
});

const loginWeb3 = async () => {
	const message = await axios.get("/_web3/signature").then((res) => res.data);
	const provider = await web3Modal.connect();

	provider.on("accountsChanged", () => web3Modal.clearCachedProvider());

	const web3 = new ethers.providers.Web3Provider(provider);

    console.log(web3)

	axios.post("/_web3/login", {
		address: await web3.getSigner().getAddress(),
		signature: await web3.getSigner().signMessage(message),
	})
    .then(response => {
        window.location = '/dashboard'
    });
};

const registerWeb3 = async () => {
	const message = await axios.get("/_web3/signature").then((res) => res.data);
	const provider = await web3Modal.connect();

	provider.on("accountsChanged", () => web3Modal.clearCachedProvider());

	const web3 = new ethers.providers.Web3Provider(provider);

	axios.post("/_web3/register", {
		address: await web3.getSigner().getAddress(),
		signature: await web3.getSigner().signMessage(message),
	})
    .then(response => {
        window.location = '/dashboard'
    });
};

const linkWeb3 = async () => {
	const message = await axios.get("/_web3/signature").then((res) => res.data);
	const provider = await web3Modal.connect();

	provider.on("accountsChanged", () => web3Modal.clearCachedProvider());

	const web3 = new ethers.providers.Web3Provider(provider);

	axios.post("/_web3/link", {
		address: await web3.getSigner().getAddress(),
		signature: await web3.getSigner().signMessage(message),
	})
    .then(response => {
        window.location = '/dashboard'
    });
};

document.addEventListener('DOMContentLoaded', function () {
    const login = document.querySelector('.web3login');

    if (login) {
        login.addEventListener('click', loginWeb3);
    }

    const register = document.querySelector('.web3register');

    if (register) {
        register.addEventListener('click', registerWeb3);
    }

    const link = document.querySelector('.web3link');

    if (link) {
        link.addEventListener('click', linkWeb3);
    }
});