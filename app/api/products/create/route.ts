import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: parseFloat(body.price),
        category: body.category,
        subCategory: body.subCategory,
        description: body.description,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(product);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}