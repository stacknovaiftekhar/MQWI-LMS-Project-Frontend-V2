import { ContactInfoDetail, SocialLinksDetail, WalletInfoList, BankDetailList } from "../api/admin";
import { useEffect, useState } from 'react';

const useFetch = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);
  const [walletInfo, setWalletInfo] = useState([]);
  const [bankDetail, setBankDetail] = useState([]);

  
  const fetchAll = async () => {
    try {
      const [contactRes, socialRes, walletRes, bankRes] = await Promise.all([
        ContactInfoDetail(),
        SocialLinksDetail(),
        WalletInfoList(),
        BankDetailList(),
      ]);

      setContactInfo(contactRes.data);
      setSocialLinks(socialRes.data);
      setWalletInfo(walletRes.data);
      setBankDetail(bankRes.data);
    } catch (error) {
      console.error('Failed to Fetch Information:', error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    contactInfo,
    socialLinks,
    walletInfo,
    bankDetail,
    setWalletInfo,
    setBankDetail,
    refetchAll: fetchAll,
  };
};

export default useFetch;