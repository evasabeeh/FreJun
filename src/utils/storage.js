export const saveEditsToStorage = (id, field, value) => {
    const edits = JSON.parse(localStorage.getItem('editedComments') || '{}');
    const existing = edits[id] || {};
    edits[id] = { ...existing, [field]: value };
    localStorage.setItem('editedComments', JSON.stringify(edits));
};