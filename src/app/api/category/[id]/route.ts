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

  if (!id) {
    return NextResponse.json(
      { message: 'Category ID is required' },
      { status: 400 }
    )
  }

  await prisma.category.delete({
    where: { id: id, userId: parseInt(userSession?.user.id, 10) },
  })

  return NextResponse.json({ isDeleted: true })
}
