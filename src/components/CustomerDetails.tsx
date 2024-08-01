import React, { useEffect, useState } from "react";
import { Customer } from "../types/Customer";
import { fetchPhotos } from "../utils/fetchPhotos";
import "../styles/CustomerDetails.css";

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>(customer.photos);

  useEffect(() => {
    setPhotos(customer.photos);
  }, [customer]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newPhotos = await fetchPhotos();
      setPhotos(newPhotos);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="customer-details new-scroll">
      <div className="customer-details-container">
        <h2>
          {customer.name}
          <span> details here</span>
        </h2>
        <p>{customer.title}</p>
        <p>{customer.address}</p>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <div className="each-photo">
              <img key={index} src={photo} alt={`Customer ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
