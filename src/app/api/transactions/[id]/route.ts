import prisma from '@/utils/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID' },
        { status: 400 }
      )
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        category: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        splits: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
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

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error fetching transaction:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID' },
        { status: 400 }
      )
    }

    await prisma.transaction.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Transaction deleted successfully' })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
