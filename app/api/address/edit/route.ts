import AddressModal from "@prisma-ember/models/AddressModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { id, ...rest } = await request.json();
    if (!id) {
      throw Error("ID IS NOT PROVIDED");
    }

    const response = await AddressModal.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
    return NextResponse.json({
      data: response,
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error on Edit Address" });
  }
}

export type EditAddressResponse = Awaited<ReturnType<typeof PUT>>;
