import prisma from '@/utils/prismaClient'
import { AddTransactionModalSchema } from '@/validation/transactions'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import authOptions from '../auth/[...nextauth]/authOptions'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const user = await getServerSession(authOptions)
  const userId = parseInt(user?.user.id)
  const result = AddTransactionModalSchema.safeParse(body)

  if (result.success) {
    const transaction = await prisma.transaction.create({
      data: {
        description: result.data.description,
        type: result.data.type!,
        amount: result.data.amount,
        groupId: result.data.group_id,
        categoryId: result.data.category_id,
        createdById: userId,
        createdAt: result.data.date,
      },
    })

    return NextResponse.json({ isCreated: true, id: transaction.id })
  }
  return NextResponse.json({ message: result.error.message }, { status: 422 })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const type = searchParams.get('type')
  const user = await getServerSession(authOptions)

  if (!startDate || !endDate) {
    return NextResponse.json(
      { message: 'Start date and end date are required' },
      { status: 400 }
    )
  }

  if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
    return NextResponse.json(
      { message: 'Invalid date format' },
      { status: 400 }
    )
  }

  if (new Date(startDate) > new Date(endDate)) {
    return NextResponse.json(
      { message: 'Start date cannot be after end date' },
      { status: 400 }
    )
  }

  const startOfDay = new Date(startDate)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(endDate)
  endOfDay.setHours(23, 59, 59, 999)

  const whereClause: any = {
    createdById: parseInt(user?.user.id) || 0,
    createdAt: {
      gte: startOfDay,
      lte: endOfDay,
    },
  }

  if (type) {
    whereClause.type = type
  }

  const transactions = await prisma.transaction.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
    },
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

  try {
    const updatedTransaction = await prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.findUnique({
        where: { id: Number(data.id) },
      })

      if (!transaction) {
        return NextResponse.json(
          { message: 'Transaction not found' },
          { status: 404 }
        )
      }

      const updatedTx = await prisma.transaction.update({
        where: { id: Number(data.id) },
        data: {
          description: result.data.description,
          amount: result.data.amount,
          categoryId: result.data.category_id,
          type: result.data.type,
          groupId: result.data.group_id,
        },
        include: {
          category: true,
          createdBy: {
            select: { id: true, name: true },
          },
          group: { select: { id: true, name: true } },
        },
      })

      return updatedTx
    })

    return NextResponse.json(updatedTransaction)
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error updating transaction', error: error.message },
      { status: 500 }
    )
  }
}
