import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

import { UserContext } from "../../context/userContext";

import EmptyComment from "./EmptyComment";
import CommentsCard from "./CommentsCard";

function DetailJudul(props) {
  const { changeForm, setChangeForm, refetch } = props;

  const { dataDetailJudul } = changeForm;

  const [user] = useContext(UserContext);

  const date = new Date();

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
            change: false,
            isEdit: false,
            dataEdit: null,
            seeDetail: false,
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
            Judul : <br /> <strong>{dataDetailJudul.judul}</strong>
          </span>
          <ContentByRole
            role={user.user.role}
            dataDetailJudul={dataDetailJudul}
          />
          <span style={{ marginBottom: 10 }}>
            Dibuat tanggal : <br />{" "}
            <strong>{date.toDateString(dataDetailJudul.createdAt)}</strong>
          </span>
        </div>
        <div style={{ width: "55%" }} className="d-flex flex-column">
          <span
            style={{ marginBottom: 20, fontSize: 30, fontWeight: "bolder" }}
          >
            Komentar Judul
          </span>
          {dataDetailJudul.comments.length === 0 ? (
            <EmptyComment />
          ) : (
            dataDetailJudul.comments.map((comment) => {
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
