export const mergeCommentsWithPostTitles = async () => {
    const [commentsRes, postsRes] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/comments'),
        fetch('https://jsonplaceholder.typicode.com/posts'),
    ]);
    const comments = await commentsRes.json();
    const posts = await postsRes.json();
    const postMap = Object.fromEntries(posts.map((p) => [p.id, p.title]));

    return comments.map((c) => ({
        ...c,
        postTitle: postMap[c.postId] || 'Unknown',
    }));
};

export const getMergedCommentsFromStorage = (comments) => {
    const edits = JSON.parse(localStorage.getItem('editedComments') || '{}');
    return comments.map((c) => {
        if (edits[c.id]) {
            return {
                ...c,
                ...edits[c.id],
            };
        }
        return c;
    });
};
  