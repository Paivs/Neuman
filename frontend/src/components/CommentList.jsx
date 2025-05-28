"use client";

import { fetchCommentsByDocumentVersionId } from "@/lib/comment";
import { useEffect, useState } from "react";

export function CommentList({ versionId, trigger }) {
  const [comments, setComments] = useState([]);

  async function fetchComments() {
    const data = await fetchCommentsByDocumentVersionId(versionId);
    setComments(data);
  }
  useEffect(() => {
    fetchComments();
  }, [versionId]);

  useEffect(() => {
    fetchComments();
  }, [trigger]);

  if (!comments.length)
    return <p className="text-gray-400">Nenhum comentário ainda.</p>;

  return (
    <ul className="space-y-3">
      {comments.map((comment) => (
        <li key={comment.id} className="p-3 bg-[#111827] rounded ">
          <p className="text-sm text-gray-300">{comment.content}</p>
          <p className="text-xs text-gray-500 mt-1">
            Por <span className="font-bold"> {comment.author?.name || "Desconhecido"}</span> em{" "}
            {new Date(comment.created_at).toLocaleString("pt-BR")}
          </p>
        </li>
      ))}
    </ul>
  );
}
