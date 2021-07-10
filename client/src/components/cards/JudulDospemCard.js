import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";

import { BaseUrl } from "../../api/config";

import JudulDospemTable from "../tables/JudulDospemTable";
import ResponseJudulForm from "../forms/ResponseJudulForm";
import DetailJudul from "./DetailJudul";

function JudulDospemCard() {
  const [changeForm, setChangeForm] = useState({
    change: false,
    isEdit: false,
    dataEdit: null,
    seeDetail: false,
    dataDetailJudul: null,
  });

  const [data, setData] = useState({
    judul: [],
  });

  const { isFetching, refetch } = useQuery(
    "GetAllJudulMahasiswaForDospemTable",
    async () => {
      const res = await BaseUrl.get("/judul/dospem");
      setData({
        judul: res.data.data.judul,
      });
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-white-wrapper"
      style={{ position: "relative", padding: "70px 30px 20px" }}
    >
      {changeForm.change ? (
        <ResponseJudulForm
          changeForm={changeForm}
          setChangeForm={setChangeForm}
          refetch={refetch}
        />
      ) : changeForm.seeDetail ? (
        <DetailJudul
          changeForm={changeForm}
          setChangeForm={setChangeForm}
          refetch={refetch}
        />
      ) : (
        <JudulDospemTable
          changeForm={changeForm}
          setChangeForm={setChangeForm}
          data={data}
          isFetching={isFetching}
        />
      )}
    </motion.div>
  );
}

export default JudulDospemCard;
