"use client";

import { MainLayout } from "@components/common/Layout/MainLayout";
import { LoadingSpinner } from "@components/common/Loading/LoadingSpinner";
import styled from "@emotion/styled";
import { emberHTTP } from "@helpers/http";
import { Address } from "@prisma-ember/models/AddressModel";
import { useEffect, useState } from "react";

/**
 * As this is single page i won't implement any redux/recoil/mobx/zustand state management tool
 */
export const Main = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { status, data } = await emberHTTP<{
        status: number;
        data: Address[];
      }>("/api/address/get");

      if (status === 200) {
        setAddress(data);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <MainLayout>
      <Container>{loading ? <LoadingSpinner /> : address.length}</Container>
    </MainLayout>
  );
};

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
