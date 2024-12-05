
import { Table } from "./AntdComponents";

const ErrorTable = ({ dataSource, columns }) => {
  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default ErrorTable;