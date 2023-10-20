import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";

export async function POST(request) {
    const { title, description } = await request.json();
    await connectMongoDB();
    const newTopic = await Topic.create({ title, description });
  
    // Create a response with the newly created topic data
    const responseData = {
      message: 'Topic created successfully',
      newTopic: newTopic, // Include the newly created topic data
    };
  
    return NextResponse.json(responseData, { status: 201 });
  }
  export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({topics});
}
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: "Topic deleted successfully"}, {status: 200});
}