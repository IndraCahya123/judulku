import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";

import { BaseUrl } from "../../api/config";

import DetailJudul from "./DetailJudul";
import AddData from "../buttons/AddData";
import Loading from "../Loading";
import JudulNoValueKaprodiTable from "../tables/JudulNoValueKaprodiTable";
import JudulWithValueKaprodiTable from "../tables/JudulWithValueKaprodiTable";
import JudulWithScoreKaprodiTable from "../tables/JudulWithScoreKaprodiTable";
import PenilaianForm from "../forms/PenilaianForm";
import ResponseJudulForm from "../forms/ResponseJudulForm";
import TopsisResultModal from "../modals/TopsisResultModal";

function JudulKaprodiCard() {
  const [changeForm, setChangeForm] = useState({
    change: false,
    isEdit: false,
    setValue: true,
    dataEdit: null,
    seeDetail: false,
    dataDetailJudul: null,
    seeReport: false,
    reportData: null,
  });

  const [data, setData] = useState({
    judul: [],
    criteria: [],
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
      const res2 = await BaseUrl.get("/criteria");
      setData({
        judul: res.data.data.judul,
        criteria: res2.data.data.criteria,
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
        changeForm.setValue ? (
          <PenilaianForm
            changeForm={changeForm}
            setChangeForm={setChangeForm}
            setTableState={setTableState}
            refetch={refetch}
          />
        ) : (
          <ResponseJudulForm
            changeForm={changeForm}
            setChangeForm={setChangeForm}
            setTableState={setTableState}
            refetch={refetch}
          />
        )
      ) : changeForm.seeReport ? (
        changeForm.seeDetail ? 
        <DetailJudul
        changeForm={changeForm}
        setChangeForm={setChangeForm}
        />
        :
        <TopsisResultModal
          tableState={tableState}
          setTableState={setTableState}
          changeForm={changeForm}
          setChangeForm={setChangeForm}
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
            refetch={refetch}
            setTableState={setTableState}
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
  const {
    dataTable,
    tableState,
    changeForm,
    setChangeForm,
    setTableState,
  } = props;

  if (tableState.withValue) {
    return (
      <JudulWithValueKaprodiTable
        dataJudul={dataTable.judulWithValue}
        changeForm={changeForm}
        setChangeForm={setChangeForm}
        criteria={props.criteria}
        refetch={props.refetch}
        setTableState={setTableState}
      />
    );
  } else if (tableState.withScore) {
    return (
      <JudulWithScoreKaprodiTable
        dataJudul={dataTable.judulWithScore}
        changeForm={changeForm}
        setChangeForm={setChangeForm}
      />
    );
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
