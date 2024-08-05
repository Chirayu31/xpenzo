import prisma from '@/utils/prismaClient'
import {
  startOfDay,
  startOfMonth,
  startOfYear,
} from '@/utils/transactionUtility'
import { AddTransactionModalSchema } from '@/validation/transactions'
import { TransactionType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = AddTransactionModalSchema.safeParse(body)

  if (result.success) {
    const transaction = await prisma.transaction.create({
      data: {
        description: result.data.description,
        type: TransactionType.EXPENSE,
        amount: result.data.amount,
        groupId: result.data.group_id,
        categoryId: result.data.category_id,
        createdById: 0,
      },
    })

    return NextResponse.json({ isCreated: true, id: transaction.id })
  }
  return NextResponse.json({ message: result.error.message }, { status: 422 })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const timeline = searchParams.get('timeline')

  let startDate: Date | undefined

  const now = new Date()

  switch (timeline) {
    case 'd':
      startDate = startOfDay(now)
      break
    case 'm':
      startDate = startOfMonth(now)
      break
    case 'y':
      startDate = startOfYear(now)
      break
    case 'all':
      startDate = undefined
      break
    default:
      return NextResponse.json(
        { message: 'Invalid timeline parameter' },
        { status: 400 }
      )
  }

  const transactions = await prisma.transaction.findMany({
    where: startDate ? { createdAt: { gte: startDate } } : undefined,
  })

  return NextResponse.json(transactions)
}

export async function PUT(req: NextRequest) {
  const data = await req.json()

  if (!data.id) {
    return NextResponse.json(
      { message: 'Transaction ID is required' },
      { status: 400 }
    )
  }
  const result = AddTransactionModalSchema.safeParse(data)

  if (!result.success) {
    return NextResponse.json({ message: result.error.message }, { status: 422 })
  }

  const updateData = {
    description: result.data.description,
    amount: result.data.amount,
    groupId: result.data.group_id,
    categoryId: result.data.category_id,
    type: TransactionType.EXPENSE,
  }

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: Number(data.id) },
      data: updateData,
    })

    return NextResponse.json(updatedTransaction)
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error updating transaction', error: error.message },
      { status: 500 }
    )
  }
}
