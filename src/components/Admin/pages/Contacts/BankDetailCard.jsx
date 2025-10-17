import { Link } from 'react-router-dom';
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';

const BankDetailCard = ({ bankDetail, onDelete }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="card shadow w-100 p-3">
        {bankDetail.length > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-start">
              <h4 className="text-center text-success pb-2">Bank Details</h4>
              <Link to="bank-detail" className="btn text-success pt-0">
                <FaPlusCircle className="me-1 mb-1" /> ADD BANK DETAIL
              </Link>
            </div>
            {bankDetail.map((bank) => (
              <ul className="border-0 list-group w-100 mb-3" key={bank.id}>
                <div className="d-flex">
                  <li className="list-group-item w-50">👤 Account Name:- {bank.name}</li>
                  <li className="list-group-item w-50 border-start-0 border-1">💳 Account Number:- {bank.account}</li>
                </div>
                <div className="d-flex">
                  <li className="list-group-item w-40 border-top-0">🏦 Bank Name:- {bank.bank}</li>
                  <li className="list-group-item w-40 border-start-0">🏬 Branch Name:- {bank.branch}</li>
                  <li className="list-group-item w-20 border-start-0 text-center">
                    <Link to={`bank-detail/${bank.id}`} className="btn btn-sm btn-warning me-2"><FaEdit /></Link>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(bank.id)}><FaTrash /></button>
                  </li>
                </div>
              </ul>
            ))}
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Link to="bank-detail" className="btn btn-outline-success w-25">
              <FaPlusCircle className="me-1 mb-1" /> ADD BANK DETAIL
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankDetailCard;