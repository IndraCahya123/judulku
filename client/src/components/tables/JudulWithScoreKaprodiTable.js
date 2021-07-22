import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import AddData from "../buttons/AddData";
import Response from "../Response";

function JudulWithScoreKaprodiTable(props) {
  const { dataJudul, setChangeForm, changeForm } = props;
  const date = new Date(); console.log(dataJudul);
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
                <th>Nilai Akhir</th>
                <th>Hasil Sistem</th>
                <th>Respon</th>
                <th>Terakhir diubah</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataJudul.map((item, index) => {
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.judul.substring(0, 20)}...</td>
                    <td>{item.mahasiswa.Profile.name}</td>
                    <td className="text-center">
                      <span
                        style={{
                          padding: "3px 5px",
                          borderRadius: "5px",
                          fontSize: 10,
                          color: "#fff",
                        }}
                        className="bg-primary"
                      >
                        {item.DetailJudul.score}
                      </span>
                    </td>
                    <td>
                      <SystemResult score={item.DetailJudul.score} />
                    </td>
                    <td>
                      <Response response={item.DetailJudul.kaprodiStatus} />
                    </td>
                    <td>{date.toDateString(item.updatedAt).substring(3)}</td>
                    <td className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() =>
                          setChangeForm({
                            ...changeForm,
                            change: true,
                            isEdit: true,
                            setValue: false,
                            dataEdit: item,
                          })
                        }
                        disabled={
                          item.DetailJudul.kaprodiStatus == null ||
                          item.DetailJudul.kaprodiStatus === "diterima"
                            ? true
                            : false
                        }
                      >
                        <FontAwesomeIcon icon={faEdit} title="Edit respon" />
                      </button>
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
                            isEdit: false,
                            setValue: false,
                            dataEdit: item,
                          })
                        }
                        disabled={
                          item.DetailJudul.kaprodiStatus === "diterima"
                            ? true
                            : false
                        }
                      >
                        <FontAwesomeIcon icon={faComment} title="Beri Respon" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}

const SystemResult = (props) => {
  const { score } = props;

  if (score > 0.2 && score <= 0.399) {
    return (
      <span
        style={{
          padding: "3px 5px",
          borderRadius: "5px",
          fontSize: 10,
          color: "#fff",
        }}
        className="bg-warning"
      >
        Revisi Judul
      </span>
    );
  } else if (score < 0.199) {
    return (
      <span
        style={{
          padding: "3px 5px",
          borderRadius: "5px",
          fontSize: 10,
          color: "#fff",
        }}
        className="bg-danger"
      >
        Ganti Judul
      </span>
    );
  } else {
    return (
      <span
        style={{
          padding: "3px 5px",
          borderRadius: "5px",
          fontSize: 10,
          color: "#fff",
        }}
        className="bg-success"
      >
        Judul ACC
      </span>
    );
  }
};

export default JudulWithScoreKaprodiTable;
