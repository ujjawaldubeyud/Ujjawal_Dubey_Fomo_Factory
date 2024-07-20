import React, { useEffect } from "react";
import "./global.css";
import RowComponent from "./rowComponent";
import axiosInstance from "../axiosConfig";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../Redux/rootReducer";
import TokenModal from "./tokenModal";

const TokenTableEntry = () => {
  const dispatch = useDispatch();
  const tokenList = useTypedSelector((state) => state.tableData.tokenData);
  const selectedToken = useTypedSelector(
    (state) => state.tableData.tokenToShow
  );

  const FetchDataFromMongo = async () => {
    try {
      const { data: tokenData } = await axiosInstance.get("get/token/mongo");
      dispatch({ type: "SET_TOKEN_DATA", payload: tokenData });
    } catch (error) {
      console.error("Failed to Fetch Data From API");
    }
  };

  const SetDataToMongo = async () => {
   try {
     const response = await axiosInstance.get("/get/token/data");
     console.log(response.data)
     
   } catch (error) {
     console.error("Failed to Fetch Data From API");
   }
 };

  useEffect(() => {
   FetchDataFromMongo();
   SetDataToMongo();
   const interval = setInterval(() => {
   FetchDataFromMongo();
   SetDataToMongo();
   }, 150000)
   return () => clearInterval(interval)
  }, []);

  return (
    <>
      <div className="header">Token Tracker</div>

      <div className="table">
        <RowComponent
          code={"Token"}
          rate={"Market Rate"}
          volume={"Volume Traded"}
          cap={"Total Market Cap"}
          isHeader={true}
        />
        {tokenList?.map((item: any) => {
          return (
            <RowComponent
              code={item[selectedToken]["INR"]["FROMSYMBOL"]}
              rate={item[selectedToken]["INR"]["PRICE"].toFixed(2)}
              volume={item[selectedToken]["INR"]["VOLUME24HOUR"].toFixed(2)}
              cap={item[selectedToken]["INR"]["MKTCAP"].toFixed(2)}
              isHeader={false}
            />
          );
        })}
        <TokenModal />
      </div>
    </>
  );
};

export default TokenTableEntry;
