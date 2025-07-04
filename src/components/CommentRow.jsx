import { useState } from 'react';

const EditableCell = ({ value, onSave }) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(value);

    return editing ? (
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
                onSave(text);
                setEditing(false);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onSave(text);
                    setEditing(false);
                }
            }}
            className="p-1 border rounded w-full"
            autoFocus
        />
    ) : (
        <div
            className="p-1 cursor-pointer"
            onClick={() => setEditing(true)}
        >
            {value}
        </div>
    );
};

const CommentRow = ({ comment, onEdit }) => {
    return (
        <tr>
            <td className="p-1 border">{comment.email}</td>
            <td className="p-1 border">
                <EditableCell
                    value={comment.name}
                    onSave={(val) => onEdit(comment.id, 'name', val)}
                />
            </td>
            <td className="p-1 border w-2/5">
                <EditableCell
                    value={comment.body}
                    onSave={(val) => onEdit(comment.id, 'body', val)}
                />
            </td>
            <td className="p-1 border">{comment.postTitle}</td>
        </tr>
    );
};

export default CommentRow;