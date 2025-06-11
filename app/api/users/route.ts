import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectToDB } from '@/lib/db/db';

export async function GET() {
  await connectToDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectToDB();

  const body = await req.json();
  const { name, email } = body;
  if (!email || !name) {
    return NextResponse.json({
      success: false,
      message: 'All fields are required',
    }, { status: 400 });
  }

  try {
    const newUser = await User.create({
      name,
      email,
    });

    return NextResponse.json({
      success: true,
      data: newUser,
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
