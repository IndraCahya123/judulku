import { Modal, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { useState } from "react";

import { BaseUrl } from "../../api/config";

import Submit from "../buttons/Submit";

function EditComment(props) {
  const { comment, refetch, changeForm, setChangeForm } = props;

  const [message, setMessage] = useState(comment.message);

  const updateComment = useMutation("UpdateCommentCache", async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      comment: message,
    };

    await BaseUrl.patch(`/comment/${comment.id}`, body, config);

    success()
  });

  const success = () => {
    refetch();
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p style={{ fontSize: 30, fontWeight: "bolder", marginBottom: 15 }}>
          Edit Comment
        </p>
        <Form>
          <Form.Row>
            <Form.Control
              as="textarea"
              row="8"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Row>
        </Form>
        {updateComment.isError && (
          <p className="text-danger my-2">
            {updateComment.error?.response?.data?.message}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Submit title="Simpan" action={() => updateComment.mutate()} />
        <Submit title="Batal" action={() => props.onHide()} />
      </Modal.Footer>
    </Modal>
  );
}

export default EditComment;
