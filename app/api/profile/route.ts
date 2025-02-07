import { NextResponse } from 'next/server';
import User from "../../models/schema";
import { connectMongoDB } from "../../../lib/mongodb";

export async function GET(request: Request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
      password:user.password || '',
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await connectMongoDB();

  const { email, name, phone, address ,password } = await request.json();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, phone, address,password  },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}