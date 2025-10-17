import { useNavigate } from "react-router";

const Instructions = ({ selectedWallet, selectedBank, selectedColor, course }) => {
  const walletName = selectedWallet?.name.toUpperCase();
  const ussdCodes = { Bkash: "*247#", Nagad: "*167#", Rocket: "*322#" };
  const navigate = useNavigate();

  const CopyButton = ({ label }) => {
    const handleCopy = () => {
      if (selectedWallet?.number) {
        navigator.clipboard.writeText(selectedWallet.number)
          .then(() => alert('Copied to Clipboard!'))
          .catch(err => console.error('Failed to Copy!', err));
      }
    };

    return selectedWallet?.number && (
      <button onClick={handleCopy} className="btn btn-outline-light btn-sm abf px-2 py-0 ms-2">{label}</button>
    );
  };

  const walletGuidesBn = [
    <><span className='text-warning'>{ussdCodes[selectedWallet?.name]}</span> ডায়াল করে আপনার {walletName} মোবাইল মেনুতে যান অথবা {walletName} অ্যাপ খুলুন।</>,
    <>এরপর <span className='text-warning'>"Send Money"</span> নির্বাচন করুন।</>,
    <>প্রাপকের {walletName} নম্বরটি লিখুন: <span className='text-warning'>{selectedWallet?.number}</span><CopyButton label="কপি"/></>,
    <>টাকার পরিমাণ লিখুন: <span className='text-warning'>{course.features?.enrollment}</span></>,
    <>নিশ্চিত করতে এখন আপনার {walletName} মোবাইল মেনু পিনটি প্রবেশ করান।</>,
    <>সম্পন্ন! এরপর আপনি {walletName} থেকে একটি নিশ্চিতকরণ বার্তা পাবেন।</>,
    <>এখন উপরের ইনপুট বক্সে আপনার <span className='text-warning'>Transaction ID</span> টি লিখুন।</>,
    <>তারপর <span className='text-warning'>SUBMIT</span> বাটনে ক্লিক করুন এবং নিশ্চিতকরণের জন্য অপেক্ষা করুন।</>,
  ];

  const walletGuidesEn = [
    <>Go to Your {walletName} Mobile Menu by Dialing: <span className='text-warning'>{ussdCodes[selectedWallet?.name]}</span> or Open {walletName} App.</>,
    <>Choose: <span className='text-warning'>"Send Money"</span></>,
    <>Enter the Receiver Account Number: <span className='text-warning'>{selectedWallet?.number}</span><CopyButton label="Copy" /></>,
    <>Enter the Amount: <span className='text-warning'>{course.features?.enrollment}</span></>,
    <>Now Enter Your {walletName} Mobile Menu PIN to Confirm.</>,
    <>Done! You will Receive a Confirmation Message from {walletName}.</>,
    <>Enter the <span className='text-warning'>Transaction ID</span> in the input box above.</>,
    <>Then click the <span className='text-warning'>SUBMIT</span> button and wait for confirmation.</>,
  ];

  const bankGuidesBn = [
    <>ওয়েবসাইট অথবা মোবাইল ব্যাংকিং অ্যাপ ব্যবহার করে আপনার ব্যাংক অ্যাকাউন্টে লগ ইন করুন।</>,
    <>নিম্নলিখিত ব্যাংকের বিবরণ ব্যবহার করে একটি প্রাপকের অ্যাকাউন্ট যোগ করুন:</>,
    <>অ্যাকাউন্ট নম্বর: <span className='text-warning'>{selectedBank?.account}</span></>,
    <>অ্যাকাউন্টের নাম: <span className='text-warning'>{selectedBank?.name}</span></>,
    <>ব্যাংকের নাম: <span className='text-warning me-5'>{selectedBank?.bank}</span>
      ➤ &nbsp; শাখার নাম: <span className='text-warning'>{selectedBank?.branch}</span></>,
    <><span className='text-warning'>Money Transfer</span> মেনুতে যান এবং ট্রান্সফারটি সম্পূর্ণ করুন।</>,
    <>ট্রান্সফারের পরে, উপরের ইনপুট বক্সে আপনার <span className='text-warning'>Transaction ID</span> টি লিখুন।</>,
    <>তারপর <span className='text-warning'>SUBMIT</span> বাটনে ক্লিক করুন এবং নিশ্চিতকরণের জন্য অপেক্ষা করুন।</>,
  ];

  const bankGuidesEn = [
    <>Log in to Your Bank Account using the Website or Mobile Banking App.</>,
    <>Add a Beneficiary Account using the following Bank details:</>,
    <>Account Number: <span className='text-warning'>{selectedBank?.account}</span></>,
    <>Account Name: <span className='text-warning'>{selectedBank?.name}</span></>,
    <>Bank Name: <span className='text-warning me-5'>{selectedBank?.bank}</span>
      ➤ &nbsp; Branch Name: <span className='text-warning'>{selectedBank?.branch}</span></>,
    <>Go to the <span className='text-warning'>Money Transfer</span> Page and Complete the Transfer.</>,
    <>After Transfer, Enter the <span className='text-warning'>Transaction ID</span> in the input box.</>,
    <>Then click the <span className='text-warning'>SUBMIT</span> button and wait for confirmation.</>,
  ];

  if (!selectedWallet && !selectedBank) return null;

  const payMethod = (<span className='text-warning text-uppercase'> {selectedWallet?.name || "Islami Bank"}</span>)
  const headingBn = (<h5 className="card-title mb-3 mt-2 hsf hsb">📤 পেমেন্ট নির্দেশাবলী: {payMethod}</h5>)
  const headingEn = (<h5 className="card-title mb-3 mt-2 hsf hsb">📤 Payment Instructions: {payMethod}</h5>)

  return (
    <section>
      {/* Both Bangla and English Instructions */}
      <div className="instructions card shadow border text-light p-2 mt-4 position-relative" style={{ backgroundColor: selectedColor }}>
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`./`)}></button>
        {/* Payment Instruction Card */}
        <div className="card-body hsf">
          {selectedWallet && (
            <div className="row">
              <div className="col-lg-6 col-12">{headingBn}
                {walletGuidesBn.map((instruction, idx) => (
                  <div key={idx} className="ps-1 py-2 item">➤ &nbsp; {instruction}</div>
                ))}
              </div>
              <hr className="d-lg-none d-block" />
              <div className="col-lg-6 col-12 mt-lg-0 mt-4">{headingEn}
                {walletGuidesEn.map((instruction, idx) => (
                  <div key={idx} className="ps-1 py-2 item">➤ &nbsp; {instruction}</div>
                ))}
              </div>
            </div>
          )}

          {selectedBank && (
            <div className="row">
              <div className="col-lg-6 col-12">{headingBn}
                {bankGuidesBn.map((instruction, idx) => (
                  <div key={idx} className="ps-1 py-2 item">➤ &nbsp; {instruction}</div>
                ))}
              </div>
              <hr className="d-lg-none d-block" />
              <div className="col-lg-6 col-12 mt-lg-0 mt-4">{headingEn}
                {bankGuidesEn.map((instruction, idx) => (
                  <div key={idx} className="ps-1 py-2 item">➤ &nbsp; {instruction}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Instructions;