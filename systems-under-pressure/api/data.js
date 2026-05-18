const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const readBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

const config = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    const missing = [];
    if (!url) missing.push("SUPABASE_URL");
    if (!key) missing.push("SUPABASE_SERVICE_ROLE_KEY");
    const err = new Error(`Missing environment variables: ${missing.join(", ")}`);
    err.status = 500;
    throw err;
  }
  return { url: url.replace(/\/$/, ""), key };
};

const supabase = async (path, options = {}) => {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const err = new Error(data?.message || response.statusText);
    err.status = response.status;
    err.details = data;
    throw err;
  }
  return data;
};

const ensureTeacher = (req) => {
  const expected = process.env.TEACHER_PASSCODE;
  if (!expected) {
    const err = new Error("Missing TEACHER_PASSCODE environment variable");
    err.status = 500;
    throw err;
  }
  if (req.headers["x-teacher-passcode"] !== expected) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
};

const normalizeGroup = (group, progress = [], notes = [], checkpoints = []) => ({
  ...group,
  progress_items: progress.filter((item) => item.group_id === group.id),
  group_notes: notes.filter((note) => note.group_id === group.id),
  checkpoints: checkpoints.filter((checkpoint) => checkpoint.group_id === group.id),
});

export default async function handler(req, res) {
  try {
    const action = new URL(req.url, `https://${req.headers.host}`).searchParams.get("action");

    if (req.method === "GET" && action === "groups") {
      const groups = await supabase("groups?select=*&order=updated_at.desc");
      return json(res, 200, { groups });
    }

    if (req.method === "POST" && action === "createGroup") {
      const body = await readBody(req);
      const groupName = String(body.group_name || "").trim();
      if (!groupName) return json(res, 400, { error: "Group name is required" });
      const payload = {
        group_name: groupName,
        student_names: body.student_names || "",
        updated_at: new Date().toISOString(),
      };
      const existing = await supabase(`groups?group_name=eq.${encodeURIComponent(groupName)}&select=*`);
      const group = existing?.[0] || (await supabase("groups", { method: "POST", body: JSON.stringify(payload) }))[0];
      return json(res, 200, { group });
    }

    if (req.method === "GET" && action === "group") {
      const groupId = new URL(req.url, `https://${req.headers.host}`).searchParams.get("group_id");
      if (!groupId) return json(res, 400, { error: "group_id is required" });
      const [groups, progress, notes, checkpoints] = await Promise.all([
        supabase(`groups?id=eq.${groupId}&select=*`),
        supabase(`progress_items?group_id=eq.${groupId}&select=*`),
        supabase(`group_notes?group_id=eq.${groupId}&select=*`),
        supabase(`checkpoints?group_id=eq.${groupId}&select=*`),
      ]);
      if (!groups[0]) return json(res, 404, { error: "Group not found" });
      return json(res, 200, { group: normalizeGroup(groups[0], progress, notes, checkpoints) });
    }

    if (req.method === "PATCH" && action === "progress") {
      const body = await readBody(req);
      const row = {
        group_id: body.group_id,
        class_phase: body.class_phase,
        item_key: body.item_key,
        completed: !!body.completed,
        updated_at: new Date().toISOString(),
      };
      await supabase("progress_items?on_conflict=group_id,item_key", { method: "POST", body: JSON.stringify(row) });
      await supabase(`groups?id=eq.${row.group_id}`, { method: "PATCH", body: JSON.stringify({ updated_at: row.updated_at }) });
      return json(res, 200, { ok: true });
    }

    if (req.method === "PATCH" && action === "note") {
      const body = await readBody(req);
      const row = {
        group_id: body.group_id,
        class_phase: body.class_phase,
        note_text: body.note_text || "",
        updated_at: new Date().toISOString(),
      };
      await supabase("group_notes?on_conflict=group_id,class_phase", { method: "POST", body: JSON.stringify(row) });
      await supabase(`groups?id=eq.${row.group_id}`, { method: "PATCH", body: JSON.stringify({ updated_at: row.updated_at }) });
      return json(res, 200, { ok: true });
    }

    if (req.method === "PATCH" && action === "checkpoint") {
      const body = await readBody(req);
      const row = {
        group_id: body.group_id,
        checkpoint_number: body.checkpoint_number,
        status: body.status || "In progress",
        student_summary: body.student_summary || "",
        updated_at: new Date().toISOString(),
      };
      await supabase("checkpoints?on_conflict=group_id,checkpoint_number", { method: "POST", body: JSON.stringify(row) });
      await supabase(`groups?id=eq.${row.group_id}`, { method: "PATCH", body: JSON.stringify({ updated_at: row.updated_at }) });
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && action === "teacher") {
      ensureTeacher(req);
      const [groups, progress, notes, checkpoints] = await Promise.all([
        supabase("groups?select=*&order=updated_at.desc"),
        supabase("progress_items?select=*"),
        supabase("group_notes?select=*"),
        supabase("checkpoints?select=*"),
      ]);
      return json(res, 200, { groups: groups.map((group) => normalizeGroup(group, progress, notes, checkpoints)) });
    }

    if (req.method === "PATCH" && action === "teacherFeedback") {
      ensureTeacher(req);
      const body = await readBody(req);
      const row = {
        group_id: body.group_id,
        checkpoint_number: body.checkpoint_number,
        status: body.status || "Feedback given",
        strengths: body.strengths || "",
        next_steps: body.next_steps || "",
        concerns: body.concerns || "",
        teacher_notes: body.teacher_notes || "",
        updated_at: new Date().toISOString(),
      };
      await supabase("checkpoints?on_conflict=group_id,checkpoint_number", { method: "POST", body: JSON.stringify(row) });
      await supabase(`groups?id=eq.${row.group_id}`, { method: "PATCH", body: JSON.stringify({ updated_at: row.updated_at }) });
      return json(res, 200, { ok: true });
    }

    return json(res, 404, { error: "Unknown API route" });
  } catch (error) {
    return json(res, error.status || 500, { error: error.message, details: error.details });
  }
}
