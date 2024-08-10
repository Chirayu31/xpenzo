import prisma from '@/utils/prismaClient'
import { AddGroupSchema } from '@/validation/group'
import { NextRequest, NextResponse } from 'next/server'
import authOptions from '../auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const userSession = await getServerSession(authOptions)
  const result = AddGroupSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { message: 'Invalid data, ' + result.error.message },
      { status: 400 }
    )
  }

  try {
    await prisma.$transaction(async (prisma) => {
      const group = await prisma.group.create({
        data: {
          name: result.data.name,
        },
      })

      await prisma.groupMember.create({
        data: {
          userId: userSession?.user.id,
          groupId: group.id,
          role: 'ADMIN',
        },
      })

      await prisma.groupMember.createMany({
        data: result.data.userIds.map((userId: number) => ({
          userId,
          groupId: group.id,
          role: 'MEMBER',
        })),
      })
    })

    return NextResponse.json({ message: 'Group created successfully' })
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
