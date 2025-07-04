import CommentRow from './CommentRow';

const CommentsTable = ({ comments, currentPage, setCurrentPage, onEdit }) => {
    const perPage = 10;
    const totalPages = Math.ceil(comments.length / perPage);
    const paginated = comments.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <div className="p-5 bg-card-white">
            <table className="w-full">
                <thead className="bg-hover-white">
                    <tr className="text-center">
                        <th className="p-1 border">Email</th>
                        <th className="p-1 border">Name</th>
                        <th className="p-1 border w-2/5">Body</th>
                        <th className="p-1 border">Post</th>
                    </tr>
                </thead>
                <tbody className="bg-white text-xs text-left">
                    {paginated.map((c) => (
                        <CommentRow key={c.id} comment={c} onEdit={onEdit} />
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Prev
                </button>
                <span className="mt-2">Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CommentsTable;