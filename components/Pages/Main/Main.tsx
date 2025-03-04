"use client";

import { MainLayout } from "@components/common/Layout/MainLayout";
import { LoadingSpinner } from "@components/common/Loading/LoadingSpinner";
import styled from "@emotion/styled";
import { emberHTTP } from "@helpers/http";
import { Address } from "@prisma-ember/models/AddressModel";
import { useCallback, useEffect, useState } from "react";
import BookSVG from "@svg/book.svg";
import BinSVG from "@svg/bin.svg";
import { rgba } from "polished";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
/**
 * As this is single page i won't implement any redux/recoil/mobx/zustand state management tool
 * Also we can move everything to own folders like a big guys, but it's one component.
 */
export const Main = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteSpinner, setDeleteSpinner] = useState<string>();

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

  const handleDelete = useCallback(async (id: string) => {
    try {
      setDeleteSpinner(id);
      const { status, data } = await emberHTTP<{
        status: number;
        data: Address;
      }>("/api/address/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (status === 200) {
        setAddress((prev) => [...prev.filter((item) => item.id !== data.id)]);
        enqueueSnackbar({
          message: "Success",
          variant: "success",
          autoHideDuration: 500,
        });
      }
    } catch (e) {
      enqueueSnackbar({
        message: "Something went wrong, please try again later",
        variant: "error",
        autoHideDuration: 500,
      });
    }
    setDeleteSpinner(undefined);
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
            {address.map(({ id, address, country, zip }) => {
              return (
                <div className="card" key={id}>
                  <span className="country">{country}</span>
                  <div className="address">
                    <h3>{address}</h3>
                    <span>{zip}</span>
                  </div>
                  <button onClick={async () => await handleDelete(String(id))}>
                    {deleteSpinner ? <LoadingSpinner /> : <BinSVG />}
                  </button>
                </div>
              );
            })}
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
