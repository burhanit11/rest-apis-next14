import connect from "@/lib/db";
import { Category } from "@/lib/modals/category";
import { User } from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");
    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "ID  Not found" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user Id" }), {
        status: 400,
      });
    }

    await connect();
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "ID  Not found" }), {
        status: 400,
      });
    }

    const category = await Category.find({
      user: new Types.ObjectId(userId),
    });

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in Fetching Categories : " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    const { title } = await request.json();

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid  Or missing user Id" }),
        {
          status: 400,
        }
      );
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "ID  Not found" }), {
        status: 400,
      });
    }

    const newCategory = new Category({
      title,
      user: new Types.ObjectId(userId),
    });
    return new NextResponse(JSON.stringify());
  } catch (error: any) {
    return new NextResponse(
      "Error in createing  Categories : " + error.message,
      {
        status: 500,
      }
    );
  }
};
