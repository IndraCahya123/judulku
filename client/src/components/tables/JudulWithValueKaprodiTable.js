import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import AddData from "../buttons/AddData";
import Submit from "../buttons/Submit";
import ValueState from "../ValueState";

import { topsis } from "../../utils/topsis";

function JudulWithValueKaprodiTable(props) {
  const { dataJudul, changeForm, setChangeForm, criteria } = props;
  const date = new Date();

  const disableBtn = () => {
    if (dataJudul.length === 0 || dataJudul.length < 2) {
      return true;
    } else {
      return false;
    }
  };

  const action = () => {
    let judulWithValue = [];

    const bobot = criteria.map(item => item.value)

    for (let i = 0; i < dataJudul.length; i++) {
      let parsing = JSON.parse(dataJudul[i].DetailJudul.value);
      let modified = [];

      for (let x = 0; x < criteria.length; x++) {
        modified.push({ ...parsing[`kriteria${x}`] });
      }

      judulWithValue.push([...modified])
    }

    const finalScore = topsis(judulWithValue, bobot)

    const dataSend = dataJudul.map((item, index) => {
      return {
        id: item.DetailJudul.id,
        score: finalScore[index]
      }
    })

    console.log(dataSend);
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
                        // onClick={() =>
                        //   setChangeForm({
                        //     ...changeForm,
                        //     seeDetail: true,
                        //     dataDetailJudul: item,
                        //   })
                        // }
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
      <Submit
        title="Analisa"
        style={{ position: "absolute", bottom: 40, right: 40 }}
        disabled={disableBtn()}
        action={() => action()}
      />
    </>
  );
}

export default JudulWithValueKaprodiTable;
