import AddressModal from "@prisma-ember/models/AddressModel";
import { NextResponse } from "next/server";
export const config = {
  api: {
    externalResolver: true,
  },
};

export async function GET() {
  try {
    const response = await AddressModal.findMany();
    /**
     * We could potentially implement also pagination
     * but let's be skin for now
     */
    return NextResponse.json({
      data: response,
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error on GET Address" });
  }
}

export type GetAddressResponse = Awaited<ReturnType<typeof GET>>;
