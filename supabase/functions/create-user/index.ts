// Supabase Edge Function: create-user
// Lets a signed-in ADMIN create learner accounts from the in-app admin panel.
// Deploy: Supabase dashboard → Edge Functions → Deploy new function →
// name it exactly "create-user" → paste this file → Deploy.
// (The service-role key is available to functions automatically; it never
// reaches the browser.)

import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, serviceKey);

    // 1) Identify the caller from their JWT and require the admin role.
    const auth = req.headers.get("Authorization") ?? "";
    const token = auth.replace("Bearer ", "");
    const { data: caller, error: callerErr } = await admin.auth.getUser(token);
    if (callerErr || !caller?.user) return json({ error: "Not signed in." }, 401);

    const { data: prof } = await admin
      .from("profiles")
      .select("role")
      .eq("id", caller.user.id)
      .single();
    if (prof?.role !== "admin")
      return json({ error: "Only the administrator can create accounts." }, 403);

    // 2) Validate input.
    const { email, password, full_name } = await req.json();
    if (!email || !password || !full_name)
      return json({ error: "email, password and full_name are required." }, 400);
    if (
      String(password).length < 10 ||
      !/[a-zA-Z]/.test(password) ||
      !/[0-9]/.test(password)
    )
      return json(
        { error: "Password must be 10+ characters with letters and numbers." },
        400
      );

    // 3) Create the account, pre-confirmed (the admin vouches for the email).
    const { data, error } = await admin.auth.admin.createUser({
      email: String(email).trim(),
      password: String(password),
      email_confirm: true,
      user_metadata: { full_name: String(full_name).trim() },
    });
    if (error) return json({ error: error.message }, 400);

    return json({ ok: true, id: data.user?.id });
  } catch (e) {
    return json({ error: (e as Error).message ?? "Unexpected error." }, 500);
  }
});
