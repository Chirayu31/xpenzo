import prisma from '@/utils/prismaClient'
import { AddSplitsSchema, UpdateSplitsSchema } from '@/validation/transactions'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const transactionId = parseInt(params.id)
    if (isNaN(transactionId)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const parseResult = AddSplitsSchema.safeParse(body)

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parseResult.error.issues },
        { status: 400 }
      )
    }

    const { splits } = parseResult.data

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      select: { groupId: true },
    })

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }

    const newSplits = await prisma.transactionSplit.createMany({
      data: splits.map((split) => ({
        transactionId,
        amount: split.amount,
        userId: split.userId,
        groupId: transaction.groupId!,
      })),
    })

    return NextResponse.json(newSplits, { status: 201 })
  } catch (error) {
    console.error('Error adding splits:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const transactionId = parseInt(params.id)
    if (isNaN(transactionId)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const parseResult = UpdateSplitsSchema.safeParse(body)

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parseResult.error.issues },
        { status: 400 }
      )
    }

    const { splits } = parseResult.data

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      select: { groupId: true },
    })

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }

    const updatedSplits = await prisma.$transaction(async (prisma) => {
      await prisma.transactionSplit.deleteMany({
        where: { transactionId },
      })

      await prisma.transactionSplit.createMany({
        data: splits.map((split) => ({
          transactionId,
          amount: split.amount,
          userId: split.userId,
          groupId: transaction.groupId!,
        })),
      })

      return prisma.transactionSplit.findMany({
        where: { transactionId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
    })

    return NextResponse.json(updatedSplits)
  } catch (error) {
    console.error('Error updating splits:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
