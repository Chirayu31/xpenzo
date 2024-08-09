import prisma from '@/utils/prismaClient'
import { CreateSettlementSchema } from '@/validation/settlement'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parseResult = CreateSettlementSchema.safeParse(body)

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parseResult.error.issues },
        { status: 400 }
      )
    }

    const { payerId, payeeId, amount, groupId } = parseResult.data

    const groupMembers = await prisma.groupMember.findMany({
      where: {
        groupId,
        userId: { in: [payerId, payeeId] },
      },
    })

    if (groupMembers.length !== 2) {
      return NextResponse.json(
        { error: 'Both users must be members of the group' },
        { status: 400 }
      )
    }

    const newSettlement = await prisma.settlement.create({
      data: {
        payerId,
        payeeId,
        amount,
        groupId,
      },
      include: {
        payer: {
          select: {
            id: true,
            name: true,
          },
        },
        payee: {
          select: {
            id: true,
            name: true,
          },
        },
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(newSettlement, { status: 201 })
  } catch (error) {
    console.error('Error creating settlement:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
