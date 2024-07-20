import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from '../Redux/rootReducer';
import './global.css'

const TokenModal = () => {
  const dispatch = useDispatch();
  const selectedOption = useTypedSelector((state) => state.tableData.tokenToShow)
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const tokenArray: string[] = ["BTC","DOGE","USDT","SOL"]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   dispatch({type: "SET_TOKEN_TO_SHOW", payload: event.target.value})
};

  return (
    <div>
    <button className="change-button" onClick={() => setIsVisible(true)}>Change Token</button>
      {isVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select an Option</h3>
            <form>
                {tokenArray?.map((item) => {
                    return(
                <div className='radio-button'>
                  <input
                    type="radio"
                    value={item}
                    checked={selectedOption === item}
                    onChange={handleChange}
                  /> {item}
                  </div>
                    )
                })
                }
            </form>
            <button className="close-button" onClick={() => setIsVisible(false)}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenModal;
