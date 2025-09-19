import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // ✅ Check required fields
  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: "Email and password are required" },
      { status: 400 }
    );
  }

  // ✅ Call Supabase login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // ✅ Handle errors
  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 401 }
    );
  }

  // ✅ Make sure user exists
  if (!data || !data.user) {
    return NextResponse.json(
      { success: false, error: "Invalid login credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true, user: data.user });
}
