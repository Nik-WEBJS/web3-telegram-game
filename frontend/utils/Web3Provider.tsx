import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

export const Web3Context = createContext<ethers.BrowserProvider | null>(null);

import { ReactNode } from "react";

interface EthereumWindow extends Window {
  ethereum?: any;
}

declare const window: EthereumWindow;

const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.BrowserProvider(window.ethereum));
    }
  }, []);

  return (
    <Web3Context.Provider value={provider}>{children}</Web3Context.Provider>
  );
};

export default Web3Provider;
