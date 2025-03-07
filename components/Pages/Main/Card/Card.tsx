import { Address } from "@prisma-ember/models/AddressModel";
import BinSVG from "@svg/bin.svg";
import EditSVG from "@svg/edit.svg";
import { onHandleDelete } from "@helpers/handleDelete";
import { useAddressContext } from "@providers/AddressContext";
import { emberHTTP } from "@helpers/http";
import Modal, { useModal } from "@components/common/Modal/Modal";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

export const Card = ({ id, country, address, zip }: Address) => {
  const { removeAddress, updateAddress } = useAddressContext();
  const { isOpen, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<Omit<Address, "id">>({
    defaultValues: {
      country,
      address,
      zip,
    },
  });

  const handleEdit = async (data: Omit<Address, "id">) => {
    try {
      setLoading(true);
      const { status, data: response } = await emberHTTP<{
        status: number;
        data: Address;
      }>("/api/address/edit", {
        method: "PUT",
        body: JSON.stringify({ id, ...data }),
      });

      if (status === 200) {
        updateAddress(String(id), response);
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
    setLoading(false);
  };

  return (
    <>
      <div className="card" key={id}>
        <div className="left">
          <span className="country">{country}</span>
          <div className="address">
            <h3>{address}</h3>
            <span>{zip}</span>
          </div>
        </div>
        <div className="right">
          <button
            onClick={async () =>
              await onHandleDelete({
                id: String(id),
                remove: removeAddress,
              })
            }
          >
            <BinSVG />
          </button>
          <button onClick={openModal}>
            <EditSVG />
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <StyledForm onSubmit={handleSubmit(handleEdit)}>
          <input
            {...register("country", { required: "Country is required" })}
          />
          <input
            {...register("address", { required: "Country is required" })}
          />
          <input {...register("zip", { required: "Country is required" })} />
          <button type="submit">{loading ? "Loading..." : "Save"}</button>
        </StyledForm>
      </Modal>
    </>
  );
};

const StyledForm = styled.form`
  padding: 24px;
  display: grid;
  gap: 16px;
`;
