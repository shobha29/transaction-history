import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

import { forwardArrow, exclamationMark, checkMark } from "../../asserts";

import "./styles.scss";

const TransactionHistory = (props) => {
  const { history = {} } = props || {};
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url:
        "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2",
    })
      .then((res) => {
        setTransactionList(res.data.transactions);
      })
      .catch((err) => {
        alert("Error while fetching data");
        console.log("err is ", err);
      });
  }, []);

  const Card = (item) => {
    const transaction = item.item;

    const transactionDate = new Date(transaction.startDate).getTime();

    return (
      <div
        className={
          transaction.direction === 1
            ? "card-container right-card"
            : "card-container left-card"
        }
      >
        <div className="card">
          <div className="top">
            <p className="top-left">{`₹ ${transaction.amount}`}</p>

            {transaction.status === 1 ? (
              <div className="top-right">
                <img src={exclamationMark} alt="forward-arrow" />
                <p>
                  {transaction.direction === 1
                    ? "You requested"
                    : "Request received"}
                </p>
              </div>
            ) : (
              <div className="top-right">
                <img src={checkMark} alt="forward-arrow" />
                <p>
                  {transaction.direction === 1 ? "You paid" : "You received"}
                </p>
              </div>
            )}
          </div>

          <div className="bottom">
            {transaction.status === 1 ? (
              transaction.direction === 1 ? (
                <div className="btn-container">
                  <div className="btn">
                    <p>Pay</p>
                  </div>
                  <div className="btn">
                    <p>Decline</p>
                  </div>
                </div>
              ) : (
                <div className="btn">
                  <p>Cancel</p>
                </div>
              )
            ) : (
              <div className="transaction-id">
                <p>Transaction ID</p>
                <p>A1234156256787382783899</p>
              </div>
            )}
            <img
              src={forwardArrow}
              alt="forward-arrow"
              onClick={() =>
                history?.push("/transaction-summary", { transaction })
              }
            />
          </div>
        </div>
        <div className="transaction-date-time">
          <p>{moment(transactionDate).format("DD MMM YYYY, hh:mm A")}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {transactionList.length !== 0 &&
        transactionList.map((item) => <Card item={item} />)}
    </div>
  );
};

export default TransactionHistory;
