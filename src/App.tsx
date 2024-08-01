import React, { useState, useEffect } from "react";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import { Customer } from "./types/Customer";
import "./styles/App.css";
import { fetchCustomers } from "./utils/fetchCustomers";

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  useEffect(() => {
    loadMoreCustomers();
  }, []);

  const loadMoreCustomers = async () => {
    const start = customers.length;
    const newCustomers = await fetchCustomers(start, 5);

    setCustomers((prev) => {
      const existingCustomerIds = new Set(prev.map((customer) => customer.id));
      const filteredNewCustomers = newCustomers.filter(
        (customer) => !existingCustomerIds.has(customer.id)
      );
      console.log(filteredNewCustomers);
      return [...prev, ...filteredNewCustomers];
    });
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="App">
      <div className="app-header">This here is the heading</div>
      <div className="app-main-container">
        <CustomerList
          customers={customers}
          onCustomerClick={handleCustomerClick}
          loadMoreCustomers={loadMoreCustomers}
        />
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
      </div>
    </div>
  );
};

export default App;
