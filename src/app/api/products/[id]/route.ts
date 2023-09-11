import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { Products } from "@/Interfaces/types";

export async function PUT(request: Request, { params }: any) {
  try {
    const productData = await request.json();

    const filePath = path.join(process.cwd(), "/product-fixtures.json");

    const data = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(data);

    const productIndex = products.findIndex(
      (p: Products) => p.id === params.id
    );

    if (productIndex === -1) {
      return NextResponse.json({ message: "404", success: false });
    }

    // only extract the fields we need and take the rest from original data, for security reasons.
    const { name, color, type, price } = productData;

    products[productIndex] = {
      ...products[productIndex],
      name,
      color,
      type,
      price
    };

    const updatedData = JSON.stringify(products, null, 2);
    fs.writeFileSync(filePath, updatedData);
    return NextResponse.json({ message: "success", success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "fail", success: false });
  }
}
