import React from "react";
import moment from "moment";

import "./styles.scss";

const TransactionDetail = (props) => {
  const transaction = props.location.state.data;

  const startDate = new Date(transaction.startDate).getTime();
  const endDate = new Date(transaction.endDate).getTime();

  const direction = ["Sent", "Received"];
  const type = ["Pay", "Collect"];
  const status = ["Pending", "Confirmed", "Expired", "Reject", "Cancel"];

  return (
    <div className="transaction-detail-container">
      <div className="inner-container">
        <div className="row">
          <p className="title">Amount</p>
          <p className="content">{`₹ ${transaction.amount}`}</p>
        </div>

        <div className="row">
          <p className="title">Direction</p>
          <p className="content">{direction[transaction.direction - 1]}</p>
        </div>

        <div className="row">
          <p className="title">Type</p>
          <p className="content">{type[transaction.type - 1]}</p>
        </div>

        <div className="row">
          <p className="title">Status</p>
          <p className="content">{status[transaction.status - 1]}</p>
        </div>

        <div className="row">
          <p className="title">Start Date</p>
          <p className="content">
            {moment(startDate).format("DD MMM YYYY, hh:mm A")}
          </p>
        </div>

        <div className="row">
          <p className="title">End Date</p>
          <p className="content">
            {moment(endDate).format("DD MMM YYYY, hh:mm A")}
          </p>
        </div>

        {transaction.description && (
          <div className="row">
            <p className="title">Description</p>
            <p className="content">{transaction.description}</p>
          </div>
        )}

        <div className="row">
          <p className="title">Customer vPayId</p>
          <p className="content">{transaction.customer.vPayId}</p>
        </div>

        <div className="row">
          <p className="title">Customer vPay</p>
          <p className="content">{transaction.customer.vPay}</p>
        </div>

        <div className="row">
          <p className="title">Partner vPayId</p>
          <p className="content">{transaction.partner.vPayId}</p>
        </div>
        <div className="row">
          <p className="title">Partner vPay</p>
          <p className="content">{transaction.partner.vPay}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
