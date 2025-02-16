import prisma from '@/utils/prismaClient'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import authOptions from '../../auth/[...nextauth]/authOptions'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const userSession = await getServerSession(authOptions)

  if (!id || !userSession?.user?.id) {
    return NextResponse.json(
      { message: 'Category ID is required' },
      { status: 400 }
    )
  }
  const userId = parseInt(userSession?.user.id, 10)

  const category = await prisma.category.findUnique({
    where: { id: id, userId: userId },
  })

  if (!category) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 })
  }

  if (category.isDefault) {
    return NextResponse.json(
      { message: 'Default category cannot be deleted' },
      { status: 400 }
    )
  }

  const defaultCategory = await prisma.category.findFirst({
    where: { userId: userId, isDefault: true, type: category.type },
  })

  if (!defaultCategory) {
    return NextResponse.json(
      { message: 'Default category not found' },
      { status: 500 }
    )
  }

  await prisma.transaction.updateMany({
    where: { categoryId: id },
    data: { categoryId: defaultCategory.id },
  })

  await prisma.category.delete({
    where: { id: id, userId: userId },
  })

  return NextResponse.json({ isDeleted: true })
}
