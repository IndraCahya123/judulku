import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faDownload,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import AddData from "../buttons/AddData";
import ValueState from "../ValueState";

function JudulNoValueKaprodiTable(props) {
  const date = new Date();
  const { dataJudul, changeForm, setChangeForm } = props;
  return (
    <div className="d-flex flex-column" style={{ marginTop: 25, overflow: "auto", minHeight: 380 }}>
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
                    <button type="button" className="edit-mhs-btn pure-btn">
                      <a href={`data:application/pdf;base64,${item.judulBase64}`} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faDownload} title="Download" />
                      </a>
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
                          dataDetailJudul: item
                        })
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
  );
}

export default JudulNoValueKaprodiTable;
