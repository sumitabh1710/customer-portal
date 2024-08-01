import { Customer } from "../types/Customer";

export const fetchCustomers = async (
  start: number,
  limit: number
): Promise<Customer[]> => {
  try {
    const response = await fetch("/data/customers.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const allCustomers: Customer[] = await response.json();

    const customers = allCustomers.slice(start, start + limit);

    console.log(customers);

    return customers;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return [];
  }
};
