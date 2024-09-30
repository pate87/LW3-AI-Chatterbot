import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Ensure this matches your .env file

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Ensure you are using a valid model
      // model: "gpt-4o-mini", // Ensure you are using a valid model
      messages: body.messages,
    });

    if (completion && completion.choices && completion.choices.length > 0) {
      const theResponse = completion.choices[0].message;
      return NextResponse.json({ output: theResponse }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed to retrieve a valid response from OpenAI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in OpenAI call:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Failed to call OpenAI" },
      { status: 500 }
    );
  }
}
