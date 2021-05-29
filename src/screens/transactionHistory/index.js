import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import _ from "lodash";

import {
  forwardArrow,
  exclamationMark,
  checkMark,
  backArrow,
  loader,
} from "../../asserts";

import "./styles.scss";

const TransactionHistory = (props) => {
  const { history = {} } = props || {};

  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2",
    })
      .then((res) => {
        const data = res.data.transactions;
        setTransactionList(
          Object.values(
            _.groupBy(data, (item) =>
              moment(item.startDate).format("DD MM YYYY")
            )
          )
        );

        setIsLoading(false);
      })
      .catch((err) => {
        alert("Error while fetching data");
        setIsLoading(false);
      });
  }, []);

  const Card = (item) => {
    const transaction = item.item;

    const transactionDate = new Date(transaction[0].startDate).getTime();
    return (
      <>
        <div className="date">
          <div className="horizontal-line left-line" />
          <p>{moment(transactionDate).format("D MMM YYYY")}</p>
          <div className="horizontal-line right-line" />
        </div>
        {transaction.map((data) => (
          <div
            className={
              data.direction === 1
                ? "card-container right-card"
                : "card-container left-card"
            }
          >
            <div className="card">
              <div className="top">
                <p className="top-left">{`₹ ${data.amount}`}</p>

                {data.status === 1 ? (
                  <div className="top-right">
                    <img src={exclamationMark} alt="forward-arrow" />
                    <p>
                      {data.direction === 1
                        ? "You requested"
                        : "Request received"}
                    </p>
                  </div>
                ) : (
                  <div className="top-right">
                    <img src={checkMark} alt="forward-arrow" />
                    <p>{data.direction === 1 ? "You paid" : "You received"}</p>
                  </div>
                )}
              </div>

              <div className="bottom">
                {data.status === 1 ? (
                  data.direction === 1 ? (
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
                    history?.push("/transaction-summary", { data })
                  }
                />
              </div>
            </div>
            <div className="transaction-date-time">
              <p>{moment(transactionDate).format("DD MMM YYYY, hh:mm A")}</p>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container">
      {isLoading ? (
        <img className="loader" src={loader} alt="loader" />
      ) : (
        <>
          <div className="header">
            <img src={backArrow} alt="back arrow" />
            <div className="user-detail">
              <div className="profile">J</div>
              <div className="name-phone">
                <p className="name">John Deo</p>
                <p className="phone">+91 7672 2345</p>
              </div>
            </div>
          </div>
          {transactionList.length !== 0 &&
            transactionList.map((item) => <Card item={item} />)}
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
