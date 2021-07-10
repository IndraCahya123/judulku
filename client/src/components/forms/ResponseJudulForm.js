import { Form } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "react-query";

import { BaseUrl } from "../../api/config";

import Submit from "../buttons/Submit";

function ResponseJudulForm(props) {
  const { changeForm, setChangeForm, refetch } = props;
  const { dataEdit } = changeForm;

  const [form, setForm] = useState({
    dospemResponse: "",
    comment: "",
  });

  const updateResponse = useMutation(
    "SetResponseJudulFromDospemCache",
    async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await BaseUrl.patch(`/judul/${dataEdit.id}/dospem`, form, config);

      refetch()
      setChangeForm({
        ...changeForm,
        change: false,
        isEdit: false,
        dataEdit: null,
      });
    }
  );

  const options = [
    {
      value: "diterima",
      label: "ACC Judul",
    },
    {
      value: "revisi",
      label: "Revisi Judul",
    },
    {
      value: "ditolak",
      label: "Ganti Judul",
    },
  ];

  const customSelectStyle = {
    control: (styles) => ({
      ...styles,
      borderRadius: 0,
      borderBottom: "1px solid #000",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      paddingLeft: 0,
    }),
  };

  return (
    <>
      <span
        style={{
          cursor: "pointer",
          position: "absolute",
          top: 24,
          left: 24,
        }}
        onClick={() =>
          setChangeForm({
            ...changeForm,
            change: false,
            isEdit: false,
            dataEdit: null,
          })
        }
      >
        <FontAwesomeIcon icon={faBackward} />
        <span style={{ fontWeight: "bold" }}> Back</span>
      </span>
      <Form className="w-50">
        <Form.Row style={{ margin: "15px 0" }}>
          <Select
            options={options}
            defaultValue={
              !changeForm.isEdit
                ? ""
                : dataEdit.detail.dospemStatus
            }
            placeholder={
              !changeForm.isEdit
                ? "Pilih Respon"
                : dataEdit.detail.dospemStatus
            }
            styles={customSelectStyle}
            onChange={(e) => setForm({ ...form, dospemResponse: e.value })}
          />
        </Form.Row>
        {form.dospemResponse === "revisi" ||
        form.dospemResponse === "ditolak" ? (
          <Form.Row style={{ margin: "15px 0" }}>
            <Form.Control
              as="textarea"
              row={5}
              placeholder="Berikan Komentar Anda"
              value={form.comment}
              onChange={(e) => setForm({...form, comment: e.target.value})}
            />
          </Form.Row>
        ) : null}
        <Form.Row
          className="d-flex flex-column w-100 justify-content-center align-items-center"
          style={{ margin: "15px 0" }}
        >
          {updateResponse.isError && (
            <p className="text-danger my-2">
              {updateResponse.error?.response?.data?.message}
            </p>
          )}
          <Submit title="Simpan" action={() => updateResponse.mutate()} />
        </Form.Row>
      </Form>
    </>
  );
}

export default ResponseJudulForm;
