"use client";

import { MainLayout } from "@components/common/Layout/MainLayout";
import styled from "@emotion/styled";
import { emberHTTP } from "@helpers/http";
import { Address } from "@prisma-ember/models/AddressModel";
import { useEffect, useState } from "react";
import BookSVG from "@svg/book.svg";
import { rgba } from "polished";
import { SnackbarProvider } from "notistack";
import { LoadingSpinner } from "@components/common/Loading/LoadingSpinner";
import { Card } from "@components/Pages/Main/Card/Card";
import { useAddressContext } from "@providers/AddressContext";

/**
 * As this is single page i won't implement any redux/recoil/mobx/zustand state management tool
 * Also we can move everything to own folders like a big guys, but it's one component.
 */
export const Main = () => {
  const { addresses, setAddresses } = useAddressContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { status, data } = await emberHTTP<{
        status: number;
        data: Address[];
      }>("/api/address/get");

      if (status === 200) {
        setAddresses(data);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Container>
          <LoadingSpinner />
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SnackbarProvider />
      <Container>
        <div className="addressBook">
          <div className="contactHeader">
            <BookSVG />
            <h1>My Address Book</h1>
          </div>
          <div className="addresses">
            {addresses.map((address) => (
              <Card
                key={address.id}
                {...{
                  ...address,
                }}
              />
            ))}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 24px;
  color: ${({ theme }) => theme.colors.black};

  .addresses {
    display: grid;
    gap: 24px;
  }
  .card {
    box-shadow: 1px 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.1);
    border-radius: 8px;
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 24px;
    align-items: center;

    &:hover,
    &:focus {
      .right {
        opacity: 1;
        pointer-event: all;
        transition: opacity 0.5s;
      }
    }

    .left {
      display: inherit;
      gap: 8px;
    }
    .right {
      opacity: 0;
      pointer-event: none;
      display: inherit;
      gap: 8px;
    }

    gap: 8px;
    button {
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      svg {
        width: 24px;
        height: 24px;
      }
    }

    .country {
      display: inline-block;
      font-weight: 500;
      width: fit-content;
      font-size: 12px;
      line-height: 16px;
      background: ${({ theme }) => theme.colors.gray100};
      padding: 4px 8px;
      border-radius: 8px;
    }
    .address {
      font-size: 14px;
      line-height: 20px;
      display: inherit;
      gap: inherit;
      span {
        color: ${({ theme }) => rgba(theme.colors.black, 0.5)};
        font-weight: 300;
      }
    }
  }

  .addressBook {
    display: grid;
    align-items: center;
    .contactHeader {
      display: flex;
      gap: 8px;
      align-items: inherit;
      h1 {
        font-size: 16px;
        line-height: 120px;
      }
    }
  }
`;
