import { useQuery, useMutation } from "react-query";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";

import { BaseUrl } from "../../api/config";

import Submit from "../buttons/Submit";

function PenilaianForm(props) {
  const { changeForm, setChangeForm, refetch } = props;
  const { dataDetailJudul, isEdit } = changeForm;
  const [data, setData] = useState({ criteria: [] });
  const [form, setForm] = useState(null);

  const { isFetching } = useQuery(
    "GetAllDataCriteriaCache",
    async () => {
      const res = await BaseUrl.get("/criteria").then(
        (result) => result.data.data.criteria
      );
      setData({ criteria: res });
      return res;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const onChange = (e) => {
    const tempForm = { ...form };

    tempForm[e.target.name] = {
      value: parseInt(e.target.value),
    };

    setForm(tempForm);
  };

  const options = [
    {
      value: 1,
      desc : '(Sangat Lama)'
    },
    {
      value: 2,
      desc : '(Lama)'
    },
    {
      value: 3,
      desc : '(Cukup Baru)'
    },
    {
      value: 4,
      desc : '(Baru)'
    },
    {
      value: 5,
      desc : '(Sangat Baru)'
    },
  ];
  console.log(dataDetailJudul);

  const setJudulValue = useMutation("KaprodiSetJudulValueCache", async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      value: JSON.stringify(form),
    };

    await BaseUrl.patch(
      `/judul/${dataDetailJudul.DetailJudul.id}/kaprodi`,
      body,
      config
    );

    setChangeForm({ ...changeForm, change: false, isEdit: false, dataDetailJudul: null });
    refetch()
  });

  const onSubmit = (e) => {
    setJudulValue.mutate();
  };

  useEffect(() => {
    if (isEdit) {
      setForm(JSON.parse(dataDetailJudul.DetailJudul.value))
    } else {
      setForm(null)
    }
  },[])

  console.log(form);
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
          setChangeForm({ ...changeForm, change: false, isEdit: false, dataDetailJudul: null })
        }
      >
        <FontAwesomeIcon icon={faBackward} />
        <span style={{ fontWeight: "bold" }}> Back</span>
      </span>
      <div>
        <Form>
          {isFetching
            ? "load.."
            : data.criteria.map((item, index) => {
                return (
                  <Form.Row className="mb-4">
                    <Form.Label>{item.name}</Form.Label>
                    <Form.Control
                      as="select"
                      name={`kriteria${index}`}
                      onChange={(e) => onChange(e)}
                      key={item.id}
                    >
                      <option selected={isEdit ? false : true} disabled>
                        Pilih Nilai
                      </option>
                      {options.map((option) => {
                        return (
                          <>
                            <option selected={isEdit ? (option.value == form[`kriteria${index}`].value ? true : false) : false} value={option.value}>{option.value + ' ' + option.desc}</option>
                          </>
                        );
                      })}
                    </Form.Control>
                  </Form.Row>
                );
              })}
          <Form.Row>
            {setJudulValue.isError && (
              <p className="text-danger my-2">
                {setJudulValue?.error?.response?.data?.message}
              </p>
            )}
            <Submit title="Simpan" style={{ marginTop: 30 }} action={(e) => onSubmit(e)} load={setJudulValue.isLoading} />
          </Form.Row>
        </Form>
      </div>
    </>
  );
}

export default PenilaianForm;
