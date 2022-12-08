// CRUD

let route = "http://localhost:3000/api/v1/";

function getAllNotes() {
  fetch(route)
    .then((res) => res.json())
    .then((data) => displayAllNotes(data.data));
}

function displayAllNotes(notes) {
  let wrapper = document.getElementById("wrapper");
  let tr = "";
  for (var i in notes) {
    tr += `<tr>
    <div class="settings">
      <td><button class="delete center" onclick='deleteNote(${notes[i].id})'><span class="material-symbols-outlined">
cancel
</span></button></td>
<td>${notes[i].name}</td>
</div>
      </tr>`;
  }
  wrapper.innerHTML = tr;
}

getAllNotes();

document
  .querySelector("#save")
  .addEventListener("click", async function addNote() {
    try {
      const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: document.querySelector("#note").value,
        }),
      });

      const data = await response.json();
      data.status == "201"
        ? console.log({ method: "POST", res: "Created" })
        : console.log({ method: "POST", res: data });
    } catch (error) {
      console.log(error);
    }

    getAllNotes();
  });

async function updateNote(id) {
  try {
    const response = await fetch(`${route}${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById(id).value,
      }),
    });

    const data = await response.json();
    data.status == "204"
      ? console.log({ method: "PATCH", id: id, res: "Updated" })
      : console.log({ method: "PATCH", id: id, res: data });
  } catch (error) {
    console.log(error);
  }

  getAllNotes();
}

async function deleteNote(id) {
  try {
    const response = await fetch(`${route}${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    data.status == "204"
      ? console.log({ method: "DELETE", id: id, res: "Deleted" })
      : console.log({ method: "DELETE", id: id, res: data });
  } catch (error) {
    console.log(error);
  }

  getAllNotes();
}
