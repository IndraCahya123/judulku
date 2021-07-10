function Response(props) {
  const { response } = props;

  switch (response) {
    case null:
      return (
        <span
          style={{
            padding: "3px 5px",
            borderRadius: "5px",
            fontSize: 10,
            color: "#fff",
          }}
          className="bg-secondary"
        >
          Belum ada respon
        </span>
      );
    case "diterima":
      return (
        <span
          style={{
            padding: "3px 5px",
            borderRadius: "5px",
            fontSize: 10,
            color: "#fff",
          }}
          className="bg-success"
        >
          Judul ACC
        </span>
      );
    case "revisi":
      return (
        <span
          style={{
            padding: "3px 5px",
            borderRadius: "5px",
            fontSize: 10,
            color: "#000",
          }}
          className="bg-warning"
        >
          Revisi
        </span>
      );
    case "ditolak":
      return (
        <span
          style={{
            padding: "3px 5px",
            borderRadius: "5px",
            fontSize: 10,
            color: "#fff",
          }}
          className="bg-danger"
        >
          Ditolak
        </span>
      );

    default:
      return (
        <span
          style={{
            padding: "3px 5px",
            borderRadius: "5px",
            fontSize: 10,
            color: "#fff",
          }}
          className="bg-secondary"
        >
          Belum ada respon
        </span>
      );
  }
}

export default Response;
