import { WalletInfoList, BankDetailList } from "../api/admin";
import { PurposeList } from "../api/mixed";
import { useEffect, useState } from "react";

const useSelect = () => {
  const [purposes, setPurposes] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, w, b] = await Promise.all([
          PurposeList(),
          WalletInfoList(),
          BankDetailList(),
        ]);
        setPurposes(p.data);
        setWallets(w.data);
        setBanks(b.data);
      } catch (error) {
        console.error("Failed to Load Options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { purposes, wallets, banks, loading };
};

export default useSelect;