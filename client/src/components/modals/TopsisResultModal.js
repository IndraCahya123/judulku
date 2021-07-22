import { Table } from "react-bootstrap";

import Submit from "../buttons/Submit";

function TopsisResultModal(props) {
  const { setTableState, changeForm, setChangeForm } = props;
  const { dataJudul, dataTopsis, dataCriteria } = changeForm.reportData;
  console.log("report: ", dataTopsis);

  const nextAction = () => {
    setChangeForm({
      ...changeForm,
      change: false,
      seeReport: false,
      reportData: null,
    });
    setTableState({
      noValue: false,
      withValue: false,
      withScore: true,
    });
  };

  return (
    <div className="d-flex flex-column w-100">
      <div className="top w-100 d-flex justify-content-between align-items-center">
        <span style={{ fontSize: 28, fontWeight: "bolder" }}>Laporan Nilai Akhir Judul</span>
        <Submit title="Lanjutkan" action={() => nextAction()} />
      </div>
      <hr className="w-100 mb-3" />
      <div className="matriks-table w-100 mb-3">
        <p style={{ fontSize: 22, fontWeight: "bolder" }}> Matriks</p>
        <Matriks
          dataJudul={dataJudul}
          dataTopsis={dataTopsis}
          dataCriteria={dataCriteria}
        />
      </div>
      <div className="matriks-normalisasi-table w-100 mb-3">
        <p style={{ fontSize: 22, fontWeight: "bolder" }}>
          Matriks Normalisasi
        </p>
        <MatriksNormalisasi
          dataJudul={dataJudul}
          dataTopsis={dataTopsis}
          dataCriteria={dataCriteria}
        />
      </div>
      <div className="matriks-normalisasi-terbobot-table w-100 mb-3">
        <p style={{ fontSize: 22, fontWeight: "bolder" }}>
          Matriks Normalisasi Terbobot
        </p>
        <MatriksNormalisasiTerbobot
          dataJudul={dataJudul}
          dataTopsis={dataTopsis}
          dataCriteria={dataCriteria}
        />
      </div>
      <div className="jarak-ideal-positif-table w-100 mb-3">
        <p style={{ fontSize: 22, fontWeight: "bolder" }}>
          Jarak Ideal Positif
        </p>
        <JarakIdealPositif dataJudul={dataJudul} dataTopsis={dataTopsis} />
      </div>
      <div className="jarak-ideal-negatif-table w-100 mb-3">
        <p style={{ fontSize: 22, fontWeight: "bolder" }}>Jarak Ideal Negatif</p>
        <JarakIdealNegatif dataJudul={dataJudul} dataTopsis={dataTopsis} />
      </div>
      <div className="nilai-akhir-table w-100 mb-3">
        <p style={{ fontSize: 22, fontWeight: "bolder" }}>Nilai Akhir</p>
        <NilaiAkhir dataJudul={dataJudul} dataTopsis={dataTopsis} />
      </div>
    </div>
  );
}

const Matriks = (props) => {
  const { dataJudul, dataTopsis, dataCriteria } = props;
  return (
    <Table stripped bordered>
      <thead>
        <tr>
          <th></th>
          {dataCriteria.map((criteria) => {
            return <th>{criteria.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataJudul.map((judul, indexJudul) => {
          return (
            <tr>
              <td>{judul.judul.substring(0, 15)} ...</td>
              {dataCriteria.map((_, indexCriteria) => {
                return (
                  <td className="text-center">
                    {dataTopsis.matriks[indexJudul][indexCriteria]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const MatriksNormalisasi = (props) => {
  const { dataJudul, dataTopsis, dataCriteria } = props;
  return (
    <Table stripped bordered>
      <thead>
        <tr>
          <th></th>
          {dataCriteria.map((criteria) => {
            return <th>{criteria.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataJudul.map((judul, indexJudul) => {
          return (
            <tr>
              <td>{judul.judul.substring(0, 15)} ...</td>
              {dataCriteria.map((_, indexCriteria) => {
                return (
                  <td className="text-center">
                    {
                      dataTopsis.matriksTernormalisasi[indexJudul][
                        indexCriteria
                      ]
                    }
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const MatriksNormalisasiTerbobot = (props) => {
  const { dataJudul, dataTopsis, dataCriteria } = props;
  return (
    <Table stripped bordered>
      <thead>
        <tr>
          <th></th>
          {dataCriteria.map((criteria) => {
            return <th>{criteria.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataJudul.map((judul, indexJudul) => {
          return (
            <tr>
              <td>{judul.judul.substring(0, 15)} ...</td>
              {dataCriteria.map((_, indexCriteria) => {
                return (
                  <td className="text-center">
                    {
                      dataTopsis.matriksNormalisasiTerbobot[indexJudul][
                        indexCriteria
                      ]
                    }
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const JarakIdealPositif = (props) => {
  const { dataJudul, dataTopsis } = props;
  return (
    <Table stripped bordered>
      <thead>
        <tr>
          <th></th>
          <th>Jarak Ideal Positif</th>
        </tr>
      </thead>
      <tbody>
        {dataJudul.map((judul, indexJudul) => {
          return (
            <tr>
              <td>{judul.judul.substring(0, 25)} ...</td>
              <td>{dataTopsis.jarakIdealPositif[indexJudul]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const JarakIdealNegatif = (props) => {
  const { dataJudul, dataTopsis } = props;
  return (
    <Table stripped bordered>
      <thead>
        <tr>
          <th></th>
          <th>Jarak Ideal Negatif</th>
        </tr>
      </thead>
      <tbody>
        {dataJudul.map((judul, indexJudul) => {
          return (
            <tr>
              <td>{judul.judul.substring(0, 25)} ...</td>
              <td>{dataTopsis.jarakIdealNegatif[indexJudul]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const NilaiAkhir = (props) => {
  const { dataJudul, dataTopsis } = props;
  return (
    <Table stripped bordered>
      <thead>
        <tr>
          <th></th>
          <th>Nilai Akhir</th>
        </tr>
      </thead>
      <tbody>
        {dataJudul.map((judul, indexJudul) => {
          return (
            <tr>
              <td>{judul.judul.substring(0, 25)} ...</td>
              <td>{dataTopsis.nilaiAkhir[indexJudul]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TopsisResultModal;
