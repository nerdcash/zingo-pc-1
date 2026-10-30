import { demoMainnetLook, demoWalletName, demoPoolLabel } from "../../constants/demoMainnetLook";
import React, { useContext } from "react";
import cstyles from "../common/Common.module.css";
import { ContextApp } from "../../context/ContextAppState";
import { ServerChainNameEnum, WalletType } from "../appstate";
import { ipcRenderer } from "../../electronBridge";

type SelectWalletProps = {
  navigateToLoadingScreenChangingWallet: () => void;
};

const SelectWallet = ({ navigateToLoadingScreenChangingWallet }: SelectWalletProps) => {
  const context = useContext(ContextApp);
  const { currentWallet, wallets, openErrorModal } = context;

  const walletsSorted = wallets.sort((a, b) => {
    const chainCmp = a.chain_name.localeCompare(b.chain_name);
    return chainCmp !== 0 ? chainCmp : a.id - b.id;
  });

  // DEMO ONLY: with the mainnet look on, testnet wallets are listed under the
  // MAINNET heading (merged with any real mainnet wallets) and no TESTNET
  // group is rendered.
  const inMainGroup = (w: WalletType): boolean =>
    w.chain_name === ServerChainNameEnum.mainChainName ||
    (demoMainnetLook && w.chain_name === ServerChainNameEnum.testChainName);
  const inTestGroup = (w: WalletType): boolean =>
    !demoMainnetLook && w.chain_name === ServerChainNameEnum.testChainName;

  return (
    <>
      {currentWallet !== null && (
        <select
          className={cstyles.fieldselect}
          value={currentWallet.id}
          onChange={async (e) => {
            openErrorModal("Change Wallet", "Opening the new active Wallet selected");
            const id: number = Number(e.target.value);
            await ipcRenderer.invoke("saveSettings", { key: "currentwalletid", value: id });
            navigateToLoadingScreenChangingWallet();
          }}
        >
          {walletsSorted.filter(inMainGroup).length > 0 && (
            <optgroup label="MAINNET">
              {walletsSorted.filter(inMainGroup).map((w: WalletType) => (
                <option key={w.id} value={w.id}>
                  {demoWalletName(w.alias) + " - [" + w.creationType + "]" + (w.id === currentWallet.id ? " \u2714" : "")}
                </option>
              ))}
            </optgroup>
          )}
          {walletsSorted.filter(inTestGroup).length > 0 && (
            <optgroup label="TESTNET">
              {walletsSorted.filter(inTestGroup).map((w: WalletType) => (
                <option key={w.id} value={w.id}>
                  {demoWalletName(w.alias) + " - [" + w.creationType + "]" + (w.id === currentWallet.id ? " \u2714" : "")}
                </option>
              ))}
            </optgroup>
          )}
          {walletsSorted.filter((w: WalletType) => w.chain_name === ServerChainNameEnum.regtestChainName).length >
            0 && (
            <optgroup label="REGTEST">
              {walletsSorted
                .filter((w: WalletType) => w.chain_name === ServerChainNameEnum.regtestChainName)
                .map((w: WalletType) => (
                  <option key={w.id} value={w.id}>
                    {demoWalletName(w.alias) + " - [" + w.creationType + "]" + (w.id === currentWallet.id ? " \u2714" : "")}
                  </option>
                ))}
            </optgroup>
          )}
        </select>
      )}
    </>
  );
};

export default SelectWallet;
