import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";

import { BaseUrl } from "../../api/config";

import AddData from "../buttons/AddData";
import ValueState from "../ValueState";
import Submit from "../buttons/Submit";
import TopsisResultModal from "../modals/TopsisResultModal";

import { topsis } from "../../utils/topsis";
import { useState } from "react";

function JudulWithValueKaprodiTable(props) {
  const {
    dataJudul,
    changeForm,
    setChangeForm,
    criteria,
    refetch,
    setTableState,
  } = props;

  const date = new Date();

  const [showModal, setShowModal] = useState(false);
  const [topsisData, setTopsisData] = useState(null);

  const disableBtn = () => {
    if (dataJudul.length === 0 || dataJudul.length < 2) {
      return true;
    } else {
      return false;
    }
  };

  const kaprodiSetScore = useMutation(
    "KaprodiSetJudulScoreCache",
    async (data) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        data: JSON.stringify(data),
      };

      await BaseUrl.patch(`/judul/kaprodi/set-score`, body, config);

      refetch();
    }
  );

  const action = () => {
    let judulWithValue = [];

    const bobot = criteria.map((item) => item.value);

    for (let i = 0; i < dataJudul.length; i++) {
      let parsing = JSON.parse(dataJudul[i].DetailJudul.value);
      let modified = [];

      for (let x = 0; x < criteria.length; x++) {
        modified.push({ ...parsing[`kriteria${x}`] });
      }

      judulWithValue.push([...modified]);
    }

    const topsisResult = topsis(judulWithValue, bobot);

    const dataSend = dataJudul.map((item, index) => {
      return {
        id: item.DetailJudul.id,
        score: topsisResult.nilaiAkhir[index],
      };
    });
    
    kaprodiSetScore.mutate(dataSend);
    setTopsisData(topsisResult);

    setChangeForm({
      change: false,
      seeReport: true,
      reportData: {
        dataJudul,
        dataCriteria: criteria,
        dataTopsis: topsisResult
      }
    })
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ marginTop: 25 }}>
        {dataJudul.length === 0 ? (
          <AddData disableButton={true} />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Nama Mahasiswa</th>
                <th>Nilai</th>
                <th>Terakhir diubah</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataJudul.map((item, index) => {
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.judul}</td>
                    <td>{item.mahasiswa.Profile.name}</td>
                    <td className="text-center">
                      <ValueState value={item.DetailJudul.value} />
                    </td>
                    <td>{date.toDateString(item.updatedAt).substring(3)}</td>
                    <td className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() =>
                          setChangeForm({
                            ...changeForm,
                            change: false,
                            seeReport: true,
                            seeDetail: true,
                            dataDetailJudul: item,
                          })
                        }
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          title="Detail Judul"
                        />
                      </button>
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() =>
                          setChangeForm({
                            ...changeForm,
                            change: true,
                            isEdit: true,
                            dataDetailJudul: item,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faEdit} title="Edit nilai" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
      {kaprodiSetScore.isError && (
        <p className="text-danger my-2">
          {kaprodiSetScore?.error?.response?.data?.message}
        </p>
      )}
      <Submit
        title="Analisa"
        style={{ position: "absolute", bottom: 40, right: 40 }}
        disabled={disableBtn()}
        action={() => action()}
        load={kaprodiSetScore.isLoading}
      />
    </>
  );
}

export default JudulWithValueKaprodiTable;
