import { Form } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { useMutation } from "react-query";

import { UserContext } from "../../context/userContext";

import { BaseUrl } from "../../api/config";

import Submit from "../buttons/Submit";

function ResponseJudulForm(props) {
  const { changeForm, setChangeForm, refetch } = props;
  const { dataEdit } = changeForm;
  const [userLogged] = useContext(UserContext);

  const { role } = userLogged.user;

  const [form, setForm] = useState({
    dospemResponse: "",
    kaprodiResponse: "",
    comment: "",
  });

  const updateResponse = useMutation(
    "SetResponseJudulFromDospemAndKaprodiCache",
    async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (role === 'dospem') {
        const body = {
          dospemResponse: form.dospemResponse,
          comment: form.comment
        }
        await BaseUrl.patch(`/judul/${dataEdit.id}/dospem`, body, config);
      } else {
        const body = {
          kaprodiResponse: form.kaprodiResponse,
          comment: form.comment
        }
        await BaseUrl.patch(`/judul/${dataEdit.id}/kaprodi/set-response`, body, config);
      }


      refetch();
      setChangeForm({
        ...changeForm,
        change: false,
        isEdit: false,
        setValue: true,
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

  const hideComment = () => {
    if (
      form.dospemResponse === "revisi" ||
      form.dospemResponse === "ditolak" ||
      form.kaprodiResponse === "ditolak" ||
      form.kaprodiResponse === "revisi"
    ) {
      return true;
    } else {
      return false;
    }
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
            setValue: true,
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
                : role === "dospem"
                ? dataEdit.detail.dospemStatus
                : dataEdit.DetailJudul.kaprodiStatus
            }
            placeholder={
              !changeForm.isEdit
                ? "Pilih Respon"
                : role === "dospem"
                ? dataEdit.detail.dospemStatus
                : dataEdit.DetailJudul.kaprodiStatus
            }
            styles={customSelectStyle}
            onChange={(e) =>
              role === "dospem"
                ? setForm({ ...form, dospemResponse: e.value })
                : setForm({ ...form, kaprodiResponse: e.value })
            }
          />
        </Form.Row>
        {hideComment() ? (
          <Form.Row style={{ margin: "15px 0" }}>
            <Form.Control
              as="textarea"
              row={5}
              placeholder="Berikan Komentar Anda"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
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
