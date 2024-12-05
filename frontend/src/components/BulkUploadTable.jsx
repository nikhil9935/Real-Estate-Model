
import { Table } from "./AntdComponents";
import MyLayout from "../modules/Layout/Layout";

const BulkUploadTable = ({ dataSource, columns, onViewErrorsClick }) => {
  return (
    <MyLayout>
      <div className="bulk-upload-container">
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </MyLayout>
  );
};

export default BulkUploadTable;
