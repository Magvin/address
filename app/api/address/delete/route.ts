import { prismaEmber } from "@prisma-ember/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      throw Error("ID IS NOT PROVIDED");
    }
    const response = await prismaEmber.address.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      data: response,
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error on GET Address" });
  }
}

export type DELETEAddressResponse = Awaited<ReturnType<typeof POST>>;
