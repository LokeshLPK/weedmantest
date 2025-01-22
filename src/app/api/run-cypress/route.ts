import { exec } from "child_process";
import { NextResponse } from "next/server";

const runCypress = () => {
  return new Promise((res, rej) => {
    exec("npx cypress run", (error, stdout) => {
      if (error) {
        rej({ error });
      } else {
        console.log("cypress", stdout);
        res({});
      }
    });
  });
};

export async function GET() {
  try {
    await runCypress();
    return NextResponse.json({ status: 200 });
  }  catch (error: unknown) {
    // Handle the unknown error type
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    // Log the full error for debugging (consider using a proper logging system in production)
    console.error("Cypress test error:", error);

    // Send error message using NextResponse
    return NextResponse.json(
      { 
        status: 500, 
        message: "Failed to run Cypress tests", 
        error: errorMessage 
      }, 
      { status: 500 }
    );
  }
}
