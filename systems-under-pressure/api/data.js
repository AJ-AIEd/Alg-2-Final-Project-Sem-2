const STORE_BUCKET = "systems-under-pressure-tracker";
const STORE_OBJECT = "state.json";

const emptyStore = () => ({
  groups: [],
  progress_items: [],
  group_notes: [],
  checkpoints: [],
});

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

const storage = async (path, options = {}) => {
  const { url, key } = config();
  const response = await fetch(`${url}/storage/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";
  const data = text && contentType.includes("application/json") ? JSON.parse(text) : text;
  if (!response.ok) {
    const err = new Error(data?.message || data?.error || response.statusText);
    err.status = response.status;
    err.details = data;
    throw err;
  }
  return data;
};

const ensureBucket = async () => {
  try {
    await storage(`bucket/${STORE_BUCKET}`);
  } catch (error) {
    const missingBucket = error.status === 404 || String(error.message || "").toLowerCase().includes("bucket not found");
    if (!missingBucket) throw error;
    await storage("bucket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: STORE_BUCKET, name: STORE_BUCKET, public: false }),
    });
  }
};

const loadStore = async () => {
  await ensureBucket();
  try {
    const data = await storage(`object/${STORE_BUCKET}/${STORE_OBJECT}`);
    if (typeof data === "string") return data ? JSON.parse(data) : emptyStore();
    return data && typeof data === "object" ? data : emptyStore();
  } catch (error) {
    const missingObject = error.status === 404 || String(error.message || "").toLowerCase().includes("object not found");
    if (missingObject) {
      const store = emptyStore();
      await saveStore(store);
      return store;
    }
    throw error;
  }
};

const saveStore = async (store) => {
  await ensureBucket();
  await storage(`object/${STORE_BUCKET}/${STORE_OBJECT}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "x-upsert": "true",
    },
    body: JSON.stringify(store, null, 2),
  });
};

const sortByUpdated = (rows = []) =>
  [...rows].sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));

const normalizeGroup = (store, group) => ({
  ...group,
  progress_items: store.progress_items.filter((item) => item.group_id === group.id),
  group_notes: sortByUpdated(store.group_notes.filter((note) => note.group_id === group.id)),
  checkpoints: store.checkpoints.filter((checkpoint) => checkpoint.group_id === group.id),
});

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

const touchGroup = (store, groupId, updatedAt) => {
  const group = store.groups.find((row) => row.id === groupId);
  if (group) group.updated_at = updatedAt;
};

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const action = url.searchParams.get("action");

    if (req.method === "GET" && action === "groups") {
      const store = await loadStore();
      return json(res, 200, { groups: sortByUpdated(store.groups) });
    }

    if (req.method === "POST" && action === "createGroup") {
      const body = await readBody(req);
      const groupName = String(body.group_name || "").trim();
      if (!groupName) return json(res, 400, { error: "Group name is required" });

      const store = await loadStore();
      const existing = store.groups.find((group) => group.group_name.toLowerCase() === groupName.toLowerCase());
      if (existing) return json(res, 200, { group: existing });

      const now = new Date().toISOString();
      const group = {
        id: crypto.randomUUID(),
        group_name: groupName,
        student_names: body.student_names || "",
        scenario_id: body.scenario_id || null,
        custom_title: body.custom_title || "",
        custom_focus: body.custom_focus || "",
        created_at: now,
        updated_at: now,
      };
      store.groups.push(group);
      await saveStore(store);
      return json(res, 200, { group });
    }

    if (req.method === "PATCH" && action === "updateGroup") {
      const body = await readBody(req);
      if (!body.group_id) return json(res, 400, { error: "group_id is required" });
      const store = await loadStore();
      const group = store.groups.find((row) => row.id === body.group_id);
      if (!group) return json(res, 404, { error: "Group not found" });
      ["group_name", "student_names", "scenario_id", "custom_title", "custom_focus"].forEach((key) => {
        if (body[key] !== undefined) group[key] = body[key];
      });
      group.updated_at = new Date().toISOString();
      await saveStore(store);
      return json(res, 200, { group });
    }

    if (req.method === "GET" && action === "group") {
      const groupId = url.searchParams.get("group_id");
      if (!groupId) return json(res, 400, { error: "group_id is required" });
      const store = await loadStore();
      const group = store.groups.find((row) => row.id === groupId);
      if (!group) return json(res, 404, { error: "Group not found" });
      return json(res, 200, { group: normalizeGroup(store, group) });
    }

    if (req.method === "PATCH" && action === "progress") {
      const body = await readBody(req);
      const now = new Date().toISOString();
      const store = await loadStore();
      const existing = store.progress_items.find((row) => row.group_id === body.group_id && row.item_key === body.item_key);
      const row = {
        id: existing?.id || crypto.randomUUID(),
        group_id: body.group_id,
        class_phase: body.class_phase,
        item_key: body.item_key,
        completed: !!body.completed,
        updated_at: now,
      };
      if (existing) Object.assign(existing, row);
      else store.progress_items.push(row);
      touchGroup(store, row.group_id, now);
      await saveStore(store);
      return json(res, 200, { ok: true });
    }

    if (req.method === "PATCH" && action === "note") {
      const body = await readBody(req);
      const noteAuthor = String(body.note_author || "").trim();
      if (!noteAuthor) return json(res, 400, { error: "Student name is required before saving a note" });
      const now = new Date().toISOString();
      const store = await loadStore();
      const existing = store.group_notes.find((row) =>
        row.group_id === body.group_id &&
        row.class_phase === body.class_phase &&
        row.note_author.toLowerCase() === noteAuthor.toLowerCase()
      );
      const row = {
        id: existing?.id || crypto.randomUUID(),
        group_id: body.group_id,
        class_phase: body.class_phase,
        note_author: noteAuthor,
        note_text: body.note_text || "",
        updated_at: now,
      };
      if (existing) Object.assign(existing, row);
      else store.group_notes.push(row);
      touchGroup(store, row.group_id, now);
      await saveStore(store);
      return json(res, 200, { ok: true });
    }

    if (req.method === "PATCH" && action === "checkpoint") {
      const body = await readBody(req);
      const now = new Date().toISOString();
      const store = await loadStore();
      const existing = store.checkpoints.find((row) => row.group_id === body.group_id && row.checkpoint_number === body.checkpoint_number);
      const row = {
        ...(existing || {}),
        id: existing?.id || crypto.randomUUID(),
        group_id: body.group_id,
        checkpoint_number: body.checkpoint_number,
        status: body.status || "In progress",
        student_summary: body.student_summary || "",
        updated_at: now,
      };
      if (existing) Object.assign(existing, row);
      else store.checkpoints.push(row);
      touchGroup(store, row.group_id, now);
      await saveStore(store);
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && action === "teacher") {
      ensureTeacher(req);
      const store = await loadStore();
      return json(res, 200, { groups: sortByUpdated(store.groups).map((group) => normalizeGroup(store, group)) });
    }

    if (req.method === "PATCH" && action === "teacherFeedback") {
      ensureTeacher(req);
      const body = await readBody(req);
      const now = new Date().toISOString();
      const store = await loadStore();
      const existing = store.checkpoints.find((row) => row.group_id === body.group_id && row.checkpoint_number === body.checkpoint_number);
      const row = {
        ...(existing || {}),
        id: existing?.id || crypto.randomUUID(),
        group_id: body.group_id,
        checkpoint_number: body.checkpoint_number,
        status: body.status || "Feedback given",
        strengths: body.strengths || "",
        next_steps: body.next_steps || "",
        concerns: body.concerns || "",
        teacher_notes: body.teacher_notes || "",
        updated_at: now,
      };
      if (existing) Object.assign(existing, row);
      else store.checkpoints.push(row);
      touchGroup(store, row.group_id, now);
      await saveStore(store);
      return json(res, 200, { ok: true });
    }

    if (req.method === "DELETE" && action === "deleteGroup") {
      ensureTeacher(req);
      const groupId = url.searchParams.get("group_id");
      if (!groupId) return json(res, 400, { error: "group_id is required" });
      const store = await loadStore();
      store.groups = store.groups.filter((group) => group.id !== groupId);
      store.progress_items = store.progress_items.filter((item) => item.group_id !== groupId);
      store.group_notes = store.group_notes.filter((note) => note.group_id !== groupId);
      store.checkpoints = store.checkpoints.filter((checkpoint) => checkpoint.group_id !== groupId);
      await saveStore(store);
      return json(res, 200, { ok: true });
    }

    return json(res, 404, { error: "Unknown API route" });
  } catch (error) {
    return json(res, error.status || 500, { error: error.message, details: error.details });
  }
}
