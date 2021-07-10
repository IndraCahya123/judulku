function ValueState(props) {
    const {value} = props

    if (value === null) {
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
              Belum ada nilai
            </span>
          );
    } else {
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
              Sudah dinilai
            </span>
          );
    }
}

export default ValueState
