import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";

import { BaseUrl } from "../../api/config";

import EditComment from "../modals/EditComment";

function CommentsCard(props) {
  const { comment, refetch, user, changeForm, setChangeForm } = props;

  const role = user.user.role;
  const isAuthor = user.user.id == comment.userId;

  const date = new Date();

  const [modal, setModal] = useState(false);

  const deleteComment = useMutation('DeleteCommentCache', async () => {
    await BaseUrl.delete(`/comment/${comment.id}`)
    refetch()
  })

  const confirmDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(`Hapus Komentar dengan id ${comment.id} ?`)

    if (confirmation) {
      deleteComment.mutate()
    } else {
      alert('Komentar tidak dihapus')
    }
  }
  return (
    <>
      <div className="d-flex flex-column">
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginBottom: 8 }}
        >
          <div className="d-flex flex-column">
            <span>
              <strong>From : {comment.User.Profile.name}</strong>
            </span>
            <span>{date.toDateString(comment.updatedAt)}</span>
          </div>
          {role != "mahasiswa" && isAuthor ? (
            <div className="d-flex">
              <button
                type="button"
                className="pure-btn"
                style={{ marginRight: 5 }}
                onClick={() => setModal(true)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                type="button"
                className="pure-btn"
                style={{ marginRight: 5 }}
                onClick={() => confirmDelete()}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ) : null}
        </div>
        <div>
          <span>{comment.message}</span>
        </div>
      </div>
      <EditComment
        show={modal}
        onHide={() => setModal(false)}
        refetch={refetch}
        comment={comment}
        changeForm={changeForm}
        setChangeForm={setChangeForm}
      />
    </>
  );
}

export default CommentsCard;
