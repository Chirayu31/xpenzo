import { UpdateGroupMemberOperation } from '@/utils/constants'
import prisma from '@/utils/prismaClient'
import { UpdateGroupMemberSchema } from '@/validation/group'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const groupId = params.id

    if (!groupId) {
      return NextResponse.json({ error: 'Invalid group id' }, { status: 400 })
    }

    const body = await req.json()
    const result = await UpdateGroupMemberSchema.safeParseAsync(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.message }, { status: 400 })
    }

    const { userId, operation } = result.data

    if (operation === UpdateGroupMemberOperation.REMOVE) {
      const groupMember = await prisma.groupMember.deleteMany({
        where: { userId, groupId },
      })

      if (!groupMember.count) {
        return NextResponse.json(
          { error: 'User not found in group' },
          { status: 400 }
        )
      }

      return NextResponse.json({
        message: 'User removed from group',
        member: groupMember,
      })
    }

    const groupMember = await prisma.groupMember.create({
      data: { userId, groupId, role: 'MEMBER' },
    })

    return NextResponse.json({
      message: 'User added to group',
      member: groupMember,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const groupId = parseInt(params.id)

    if (isNaN(groupId) || groupId <= 0) {
      return NextResponse.json({ error: 'Invalid group ID' }, { status: 400 })
    }

    const groupDetails = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        transactions: {
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
          },
        },
        settlements: {
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
          },
        },
      },
    })

    if (!groupDetails) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    return NextResponse.json(groupDetails)
  } catch (error) {
    console.error('Error fetching group details:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
