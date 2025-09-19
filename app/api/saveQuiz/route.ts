import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { userId, quizId, answers, score } = await req.json();

  const { data, error } = await supabase
    .from("quiz_results")
    .insert([{ user_id: userId, quiz_id: quizId, answers, score }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
