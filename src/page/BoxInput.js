import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import "./BoxInput.css";
import TableForm from "../component/TableForm";
import InputForm from "../component/InputForm";
import { Card } from "antd";

const mapStateToProps = (state) => ({
  data: state,
});
const mapDispatchToProps = (dispatch) => ({
  set_data: (data) => dispatch({ type: "SET_DATA", data }),
  delete_data: (rowkey) => dispatch({ type: "DELETE_DATA", rowkey }),
  delete_select: (rowkey) => dispatch({ type: "DELETE_SELECT", rowkey }),
  add_data: (data) => dispatch({ type: "ADD_DATA", data }),
});

function BoxInput(props) {
  const { data, set_data, add_data, delete_data, delete_select } = props;
  const [editData, setEditData] = useState({});
  const gethandleEdit = (dataa) => {
    setEditData(dataa);
  };
  console.log("all data", data);
  return (
    <div>
      <Card className="lading-card">
        <InputForm
          data={data}
          handleSubmitedit={set_data}
          handleSubmit={add_data}
          editData={editData}
          setEditData={setEditData}
        />
      </Card>

      <Card className="lading-card list-card">
        <TableForm
          data={data}
          handleDelete={delete_data}
          delete_select={delete_select}
          gethandleEdit={gethandleEdit}
        />
      </Card>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxInput);
