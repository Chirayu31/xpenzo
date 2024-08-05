import prisma from '@/utils/prismaClient'
import { AddCategoryModalSchema } from '@/validation/category'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = AddCategoryModalSchema.safeParse(body)

  if (result.success) {
    const category = await prisma.category.create({
      data: {
        title: result.data.title,
        type: result.data.type,
        userId: 0,
      },
    })

    return NextResponse.json({ isCreated: true, id: category.id })
  }
  return NextResponse.json({ message: result.error.message }, { status: 422 })
}

export async function GET(req: NextRequest) {
  const categories = await prisma.category.findMany({
    where: { userId: 0 },
  })

  return NextResponse.json(categories)
}
