import { emberHTTP } from "@helpers/http";
import { Address } from "@prisma-ember/models/AddressModel";
import { enqueueSnackbar } from "notistack";

type Props = {
  id: string;
  remove: (id: string) => void;
};

export const onHandleDelete = async ({ id, remove }: Props) => {
  try {
    const { status, data } = await emberHTTP<{
      status: number;
      data: Address;
    }>("/api/address/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    if (status === 200) {
      remove(id);
      enqueueSnackbar({
        message: "Success",
        variant: "success",
        autoHideDuration: 500,
      });
    }
  } catch (e) {
    console.error(e);
    enqueueSnackbar({
      message: "Something went wrong, please try again later",
      variant: "error",
      autoHideDuration: 500,
    });
  }
};
