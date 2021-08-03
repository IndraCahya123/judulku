import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useQuery } from "react-query";

import { UserContext } from "../../context/userContext";

import { BaseUrl } from "../../api/config";

import EmptyComment from "./EmptyComment";
import CommentsCard from "./CommentsCard";
import Loading from '../Loading';

function DetailJudul(props) {
  const { changeForm, setChangeForm } = props;

  const { dataDetailJudul } = changeForm;

  const [user] = useContext(UserContext);

  const date = new Date();

  const [judul, setJudul] = useState({
    data: null
  })

  const {isFetching, refetch} = useQuery("GetDetailJudulCache", async () => {
    const res = await BaseUrl.get(`/judul/detail/${dataDetailJudul.id}`)

    setJudul({
      data: res.data.data.judul
    })
  }, {
    refetchOnWindowFocus: false
  })

  if (isFetching) {
    return <Loading />
  } else {
    return (
      <>
        <span
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 24,
            left: 24,
          }}
          onClick={() => {
            setChangeForm({
              ...changeForm,
              change: false,
              isEdit: false,
              dataEdit: null,
              seeDetail: false,
              seeReport: false,
              dataDetailJudul: null,
            });
          }}
        >
          <FontAwesomeIcon icon={faBackward} />
          <span style={{ fontWeight: "bold" }}> Back</span>
        </span>
        <div className="d-flex justify-content-between">
          <div style={{ width: "40%" }} className="d-flex flex-column">
            <span style={{ marginBottom: 10 }}>
              Judul : <br /> <strong>{judul.data.judul}</strong>
            </span>
            <ContentByRole
              role={user.user.role}
              dataDetailJudul={judul.data}
            />
            <span style={{ marginBottom: 10 }}>
              Dibuat tanggal : <br />{" "}
              <strong>{date.toDateString(judul.data.createdAt)}</strong>
            </span>
          </div>
          <div style={{ width: "55%" }} className="d-flex flex-column">
            <span
              style={{ marginBottom: 20, fontSize: 30, fontWeight: "bolder" }}
            >
              Komentar Judul
            </span>
            {judul.data.comments.length === 0 ? (
              <EmptyComment />
            ) : (
              judul.data.comments.map((comment) => {
                return (
                  <>
                    <CommentsCard
                      comment={comment}
                      key={comment.id}
                      refetch={refetch}
                      user={user}
                      changeForm={changeForm}
                      setChangeForm={setChangeForm}
                    />
                  </>
                );
              })
            )}
          </div>
        </div>
      </>
    );
  }
}

const ContentByRole = (props) => {
  const { role, dataDetailJudul } = props;

  switch (role) {
    case "mahasiswa":
      return (
        <span style={{ marginBottom: 10 }}>
          Dosen Pembimbing : <br />{" "}
          <strong>{dataDetailJudul.dospem.Profile.name}</strong>
        </span>
      );

    case "dospem":
      return (
        <span style={{ marginBottom: 10 }}>
          Nama Mahasiswa : <br />{" "}
          <strong>{dataDetailJudul.mahasiswa.Profile.name}</strong>
        </span>
      );

    case "kaprodi":
      return (
        <>
          <span style={{ marginBottom: 10 }}>
            Nama Mahasiswa : <br />{" "}
            <strong>{dataDetailJudul.mahasiswa.Profile.name}</strong>
          </span>
          <span style={{ marginBottom: 10 }}>
            Dosen Pembimbing : <br />{" "}
            <strong>{dataDetailJudul.dospem.Profile.name}</strong>
          </span>
        </>
      );

    default:
      return (
        <span style={{ marginBottom: 10 }}>
          Dosen Pembimbing : <br />{" "}
          <strong>{dataDetailJudul.dospem.Profile.name}</strong>
        </span>
      );
  }
};

export default DetailJudul;
