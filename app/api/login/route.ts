import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, password, type } = await req.json();

  let result;
  if (type === "signup") {
    result = await supabase.auth.signUp({ email, password });
  } else {
    result = await supabase.auth.signInWithPassword({ email, password });
  }

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 400 });
  }

  return NextResponse.json({ user: result.data.user });
}
