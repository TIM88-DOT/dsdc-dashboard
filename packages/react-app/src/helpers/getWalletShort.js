const getWalletShort = (walletId) => {
	return walletId.slice(0,4) + "..." 
			+ walletId.slice(walletId.length-4,walletId.length);
}

export default getWalletShort;