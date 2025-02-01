import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../models/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../nextauth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession({ req: request, ...authOptions });
    const sessionUser = await User.findOne({ email: session?.user?.email });
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();

    const users = await User.find();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users: ", error);
    return NextResponse.json(
      { message: "An error occurred while fetching users." },
      { status: 500 }
    );
  }
}