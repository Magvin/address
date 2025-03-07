"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Address } from "@prisma-ember/models/AddressModel";

interface AddressContextType {
  addresses: Address[];
  updateAddress: (id: string, updatedAddress: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setAddresses: (addresses: Address[]) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const updateAddress = (id: string, updatedAddress: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((address) => {
        const { id: internalID } = address;

        return internalID === Number(id)
          ? { ...address, ...updatedAddress }
          : address;
      })
    );
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((address) => address.id !== Number(id)));
  };

  return (
    <AddressContext.Provider
      value={{ addresses, updateAddress, removeAddress, setAddresses }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddressContext must be used within an AddressProvider");
  }
  return context;
};
