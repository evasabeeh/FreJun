import { useEffect, useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import CommentsTable from './components/CommentsTable';
import { mergeCommentsWithPostTitles, getMergedCommentsFromStorage } from './utils/fetchData';
import { saveEditsToStorage } from './utils/storage';

const App = () => {
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const merged = await mergeCommentsWithPostTitles();
      const withLocalEdits = getMergedCommentsFromStorage(merged);
      setComments(withLocalEdits);
    };
    fetchData();
  }, []);

  const handleEdit = (id, field, value) => {
    setComments((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      );
      saveEditsToStorage(id, field, value);
      return updated;
    });
  };

  const filteredComments = useMemo(() => {
    return comments.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [comments, searchQuery]);

  return (
    <div className="max-w-6xl mb-10 md:mb-5 mx-auto shadow-[0px_21px_31px_-3px_rgba(0,_0,_0,_0.35)] rounded-xl overflow-hidden bg-background-white">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CommentsTable
        comments={filteredComments}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default App;