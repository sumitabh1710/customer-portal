import React, { useEffect, useState } from "react";
import { Customer } from "../types/Customer";
import CustomerCard from "./CustomerCard";
import "../styles/CustomerList.css";

interface CustomerListProps {
  customers: Customer[];
  onCustomerClick: (customer: Customer) => void;
  loadMoreCustomers: () => void;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onCustomerClick,
  loadMoreCustomers,
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - Math.round(scrollTop) === clientHeight) {
      setIsLoading(true);
      setTimeout(async () => {
        await loadMoreCustomers();
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const list = document.getElementById("customer-list");
    list?.addEventListener("scroll", handleScroll as any);
    return () => list?.removeEventListener("scroll", handleScroll as any);
  }, [customers]);

  const handleCardClick = (customer: Customer) => {
    setSelectedCustomerId(customer.id);
    onCustomerClick(customer);
  };

  return (
    <div id="customer-list" className="customer-list new-scroll">
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          isSelected={customer.id === selectedCustomerId}
          onClick={() => handleCardClick(customer)}
        />
      ))}
      {isLoading && <div className="list-loader">Loading ... </div>}
    </div>
  );
};

export default CustomerList;
