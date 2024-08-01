import React from "react";
import { Customer } from "../types/Customer";
import "../styles/CustomerCard.css";

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
  isSelected: boolean;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={`customer-card ${isSelected && "selected-card"}`}
      onClick={onClick}
    >
      <div className="customer-card-info">
        <h3>{customer.name}</h3>
        <p>
          {customer.title.length < 185
            ? customer.title
            : customer.title.slice(0, 185) + "..."}
        </p>
      </div>
    </div>
  );
};

export default CustomerCard;
