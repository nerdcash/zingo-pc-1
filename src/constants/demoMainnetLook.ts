// DEMO ONLY: when the app is built with ZINGO_DEMO_MAINNET_LOOK=1, testnet
// wallets are *displayed* as if they were mainnet (ZEC ticker, "Mainnet"
// labels, USD price). Network behavior (chain, servers, addresses, sends)
// is unchanged. Used for promo-video filming. Unset = upstream behavior.
export const demoMainnetLook: boolean = process.env.ZINGO_DEMO_MAINNET_LOOK === "1";
