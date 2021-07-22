import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";

import { BaseUrl } from "../../api/config";

import JudulBaakTable from "../tables/JudulBaakTable";
import DetailJudul from "./DetailJudul";

function JudulBaakCard() {
  const [changeForm, setChangeForm] = useState({
    change: false,
    dataDetailJudul: null,
  });

  const [data, setData] = useState({
    judul: [],
  });

  const { isFetching, refetch } = useQuery(
    "GetAllJudulMahasiswaForBAAKTable",
    async () => {
      const res = await BaseUrl.get("/judul/baak");
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
        <DetailJudul changeForm={changeForm} setChangeForm={setChangeForm} refetch={refetch} />
      ) : (
        <JudulBaakTable
          changeForm={changeForm}
          setChangeForm={setChangeForm}
          data={data}
          isFetching={isFetching}
        />
      )}
    </motion.div>
  );
}

export default JudulBaakCard;
