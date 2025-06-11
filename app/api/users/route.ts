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

  try {
    const newUser = await User.create(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
