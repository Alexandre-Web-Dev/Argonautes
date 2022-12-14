const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const select = "id, created_at, name";
const api = "liste";

async function addNote(content) {
  const data = await supabase.from(api).insert(content);
  return data;
}

async function getAllNote() {
  const data = await supabase.from(api).select(select);
  return data;
}

async function getNote(id) {
  const data = await supabase.from(api).select(select).eq("id", id);
  return data;
}

async function deleteNote(id) {
  const data = await supabase.from(api).delete().eq("id", id);
  return data;
}

module.exports = { addNote, getAllNote, getNote, deleteNote };
