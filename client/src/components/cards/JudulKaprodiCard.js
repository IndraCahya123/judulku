import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";

import { BaseUrl } from "../../api/config";

import ResponseJudulForm from "../forms/ResponseJudulForm";
import DetailJudul from "./DetailJudul";
import AddData from "../buttons/AddData";
import Loading from "../Loading";
import JudulNoValueKaprodiTable from "../tables/JudulNoValueKaprodiTable";
import JudulWithValueKaprodiTable from "../tables/JudulWithValueKaprodiTable";
import PenilaianForm from "../forms/PenilaianForm";

function JudulKaprodiCard() {
  const [changeForm, setChangeForm] = useState({
    change: false,
    isEdit: false,
    dataEdit: null,
    seeDetail: false,
    dataDetailJudul: null,
  });

  const [data, setData] = useState({
    judul: [],
    criteria: []
  });

  const [tableState, setTableState] = useState({
    noValue: true,
    withValue: false,
    withScore: false,
  });

  const { isFetching, refetch } = useQuery(
    "GetAllJudulMahasiswaForKaprodiTable",
    async () => {
      const res = await BaseUrl.get("/judul/kaprodi");
      const res2 = await BaseUrl.get("/criteria")
      setData({
        judul: res.data.data.judul,
        criteria: res2.data.data.criteria
      });
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper d-flex flex-column"
      style={{ position: "relative", padding: "70px 30px 20px" }}
    >
      {isFetching ? (
        <Loading />
      ) : data.judul.length === 0 ? (
        <AddData disableButton={true} />
      ) : changeForm.change ? (
        <PenilaianForm
          changeForm={changeForm}
          setChangeForm={setChangeForm}
          setTableState={setTableState}
          refetch={refetch}
        />
      ) : (
        <>
          <Navigation tableState={tableState} setTableState={setTableState} />
          <TableContent
            dataTable={data.judul}
            tableState={tableState}
            changeForm={changeForm}
            setChangeForm={setChangeForm}
            criteria={data.criteria}
          />
        </>
      )}
    </motion.div>
  );
}

const Navigation = (props) => {
  const { tableState, setTableState } = props;

  const activeNavStyle = {
    fontWeight: "bolder",
    borderBottom: "2px solid #060707",
    padding: "0 25px",
  };

  return (
    <div className="d-flex">
      <button
        type="button"
        className="pure-btn"
        style={
          tableState.noValue ? { ...activeNavStyle } : { padding: "0 25px" }
        }
        onClick={() =>
          setTableState({ noValue: true, withValue: false, withScore: false })
        }
      >
        Judul Mahasiswa yang Belum Dinilai
      </button>
      <button
        type="button"
        className="pure-btn"
        style={
          tableState.withValue ? { ...activeNavStyle } : { padding: "0 25px" }
        }
        onClick={() =>
          setTableState({ noValue: false, withValue: true, withScore: false })
        }
      >
        Judul Mahasiswa yang Sudah Dinilai
      </button>
      <button
        type="button"
        className="pure-btn"
        style={
          tableState.withScore ? { ...activeNavStyle } : { padding: "0 25px" }
        }
        onClick={() =>
          setTableState({ noValue: false, withValue: false, withScore: true })
        }
      >
        Judul Mahasiswa yang Sudah Dianalisa
      </button>
    </div>
  );
};

const TableContent = (props) => {
  const { dataTable, tableState, changeForm, setChangeForm } = props;

  if (tableState.withValue) {
    return (
      <JudulWithValueKaprodiTable
        dataJudul={dataTable.judulWithValue}
        changeForm={changeForm}
        setChangeForm={setChangeForm}
        criteria={props.criteria}
      />
    );
  } else if (tableState.withScore) {
    return "data akhir";
  } else {
    return (
      <JudulNoValueKaprodiTable
        dataJudul={dataTable.judulNoValue}
        changeForm={changeForm}
        setChangeForm={setChangeForm}
      />
    );
  }
};

export default JudulKaprodiCard;
