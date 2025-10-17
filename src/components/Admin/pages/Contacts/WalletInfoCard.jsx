import { Link } from 'react-router-dom';
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';

const WalletInfoCard = ({ walletInfo, onDelete }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="card shadow w-100 p-3">
        {walletInfo.length > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-start">
              <h4 className="text-center text-success pb-2">Wallet Info</h4>
              <Link to="wallet-info" className="btn text-success pt-0">
                <FaPlusCircle className="me-1 mb-1" /> ADD WALLET INFO
              </Link>
            </div>
            {walletInfo.map((wallet) => (
              <ul className="border-0 list-group w-100 mb-3" key={wallet.id}>
                <div className="d-flex">
                  <li className="list-group-item w-40">💼 Wallet Name:- {wallet.name}</li>
                  <li className="list-group-item w-40 border-start-0 border-1">📲 Wallet Number:- {wallet.number}</li>
                  <li className="list-group-item w-20 border-start-0 border-1 text-center">
                    <Link to={`wallet-info/${wallet.id}`} className="btn btn-sm btn-warning me-2"><FaEdit /></Link>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(wallet.id)}><FaTrash /></button>
                  </li>
                </div>
              </ul>
            ))}
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Link to="wallet-info" className="btn btn-outline-success w-25">
              <FaPlusCircle className="me-1 mb-1" /> ADD WALLET INFO
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletInfoCard;