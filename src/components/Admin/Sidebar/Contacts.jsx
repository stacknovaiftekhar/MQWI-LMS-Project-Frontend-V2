import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import useRemove from '../../../hooks/useRemove';
import useDelete from '../../../hooks/useDelete';
import useFetch from '../../../hooks/useFetch';
import ContactInfoCard from '../pages/Contacts/ContactInfoCard';
import SocialLinksCard from '../pages/Contacts/SocialLinksCard';
import WalletInfoCard from '../pages/Contacts/WalletInfoCard';
import BankDetailCard from '../pages/Contacts/BankDetailCard';

const Contacts = () => {
  const { contactInfo, socialLinks, walletInfo, bankDetail, setWalletInfo, setBankDetail, refetchAll } = useFetch();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.reload) {
      refetchAll();
    }
  }, [location.state]);

  const deleteContactInfo = useRemove('contact/contact-info', { onSuccess: true });
  const deleteSocialLinks = useRemove('contact/social-links', { onSuccess: true });
  const deleteWalletInfo = useDelete('contact/wallet-info', setWalletInfo);
  const deleteBankDetail = useDelete('contact/bank-detail', setBankDetail);

  return (
    <section className="p-3">
      <ContactInfoCard contactInfo={contactInfo} onDelete={deleteContactInfo} />
      <br />
      <SocialLinksCard socialLinks={socialLinks} onDelete={deleteSocialLinks} />
      <br />
      <WalletInfoCard walletInfo={walletInfo} onDelete={deleteWalletInfo} />
      <br />
      <BankDetailCard bankDetail={bankDetail} onDelete={deleteBankDetail} />
      <div id="outlet-scroll-target">
        <Outlet />
      </div>
    </section>
  );
};

export default Contacts;