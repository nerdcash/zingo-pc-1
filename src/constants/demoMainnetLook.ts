// DEMO ONLY: when the app is built with ZINGO_DEMO_MAINNET_LOOK=1, testnet
// wallets are *displayed* as if they were mainnet (ZEC ticker, "Mainnet"
// labels, USD price). Network behavior (chain, servers, addresses, sends)
// is unchanged. Used for promo-video filming. Unset = upstream behavior.
export const demoMainnetLook: boolean = process.env.ZINGO_DEMO_MAINNET_LOOK === "1";

// DEMO ONLY: the wallet name shown in the UI (the stored alias is untouched).
export const demoWalletName = (alias: string): string => (demoMainnetLook ? "Merchant" : alias);

// DEMO ONLY: "Ironwood" (the testnet NU6.3 pool) reads as the familiar
// mainnet shielded pool name, "Orchard".
export const demoPoolLabel = (label: string): string =>
  demoMainnetLook ? label.replace(/Ironwood/g, "Orchard") : label;
