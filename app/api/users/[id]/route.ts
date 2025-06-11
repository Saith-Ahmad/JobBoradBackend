import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectToDB } from '@/lib/db/db';

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  await connectToDB();
  try {
    const user = await User.findById(params.id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  await connectToDB();
  const body = await req.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  await connectToDB();
  try {
    const deletedUser = await User.findByIdAndDelete(params.id);
    if (!deletedUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
