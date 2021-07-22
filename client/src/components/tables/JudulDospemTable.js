import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEdit,
  faDownload,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Base64 from 'Base64';

import Loading from "../Loading";
import AddData from "../buttons/AddData";
import Response from "../Response";

function JudulDospemTable(props) {
  const { changeForm, setChangeForm, data, isFetching } = props;

  const date = new Date();

  const getJudulFile = (data) => {
    const base64 = Base64.atob(data);
    
    return base64
  }

  if (isFetching) {
    return <Loading />;
  } else {
    if (data.judul.length === 0) {
      return <AddData disableButton={true} />;
    } else {
      return (
        <div className="table-kaprodi-data d-flex flex-column my-3">
          <div className="criteria-header d-flex justify-content-start align-items-center">
            <span
              style={{ fontSize: 25, fontWeight: "bold", marginBottom: 15 }}
            >
              Data Judul yang Diajukan
            </span>
          </div>
          <hr className="w-100" style={{ marginTop: "-10px" }} />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Nama Mahasiswa</th>
                <th>Respon</th>
                <th>Terakhir diubah</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.judul.map((item, index) => {
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.judul}</td>
                    <td>{item.mahasiswa.Profile.name}</td>
                    <td>
                      <Response response={item.detail.dospemStatus} />
                    </td>
                    <td>{date.toDateString(item.updatedAt).substring(3)}</td>
                    <td className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() => {
                          setChangeForm({
                            ...changeForm,
                            change: true,
                            isEdit: true,
                            dataEdit: item,
                          });
                        }}
                        disabled={
                          item.detail.dospemStatus == null ||
                          item.detail.dospemStatus === "diterima"
                            ? true
                            : false
                        }
                      >
                        <FontAwesomeIcon icon={faEdit} title="Edit" />
                      </button>
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() => getJudulFile(item.judulBase64)}
                      >
                        <a href={`data:application/pdf;base64,${item.judulBase64}`} download={`${item.judul}.pdf`}>
                          <FontAwesomeIcon icon={faDownload} title="Download" />
                        </a>
                      </button>
                      <button
                        type="button"
                        className="edit-mhs-btn pure-btn"
                        onClick={() =>
                          setChangeForm({
                            ...changeForm,
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
                            dataEdit: item,
                          })
                        }
                        disabled={
                          item.detail.dospemStatus === "diterima" ? true : false
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
        </div>
      );
    }
  }
}

export default JudulDospemTable;
