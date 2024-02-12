test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    // Clean up
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response).toStrictEqual([]);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    // Post two notes
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    for (let i = 0; i < 2; i++) {
        await fetch(`${SERVER_URL}/postNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title + i,
                content: content + i,
            }),
        });
    }

    // Get all notes
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(2);

    // Clean up
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
});

test("/deleteNote - Delete a note", async () => {
    // Post note
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const noteId = (await postNoteRes.json()).insertedId;

    // Delete note
    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const deleteNoteBody = await deleteNoteRes.json();

    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
    // Post note
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const noteId = (await postNoteRes.json()).insertedId;

    // Patch note
    const newTitle = "NewNoteTitleTest";
    const newContent = "NewNoteTitleContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: newTitle,
            content: newContent,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);

    // Clean up
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
});

test("/patchNote - Patch with just title", async () => {
    // Post note
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const noteId = (await postNoteRes.json()).insertedId;

    // Patch note
    const newTitle = "NewNoteTitleTest";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: newTitle,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);

    // Clean up
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
});

test("/patchNote - Patch with just content", async () => {
    // Post note
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const noteId = (await postNoteRes.json()).insertedId;

    // Patch note
    const newContent = "NewNoteContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: newContent,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);

    // Clean up
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
});

test("/deleteAllNotes - Delete one note", async () => {
    // Post one note
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    // Delete all notes
    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe("1 note(s) deleted.");
});

test("/deleteAllNotes - Delete three notes", async () => {
    // Post three notes
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    for (let i = 0; i < 3; i++) {
        await fetch(`${SERVER_URL}/postNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title + i,
                content: content + i,
            }),
        });
    }

    // Delete all notes
    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe("3 note(s) deleted.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    // Post note
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const noteId = (await postNoteRes.json()).insertedId;

    // Update note color
    const color = "#FF0000";

    const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            color: color,
        }),
    });

    const updateNoteColorBody = await updateNoteColorRes.json();

    expect(updateNoteColorRes.status).toBe(200);
    expect(updateNoteColorBody.response).toBe('Note color updated successfully.');

    // Clean up
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
});