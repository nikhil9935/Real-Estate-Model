
import SpinLoader from "./Spinner";
import ErrorTable from "./ErrorTable";
import MyLayout from "../modules/Layout/Layout";

const BulkErrorContainer = ({ loading, bulkErrors, columns }) => {
  return (
    <MyLayout>
      <div className="bulk-error-container">
        <div className="table-container">
          {loading ? <SpinLoader /> : <ErrorTable dataSource={bulkErrors} columns={columns} />}
        </div>
      </div>
    </MyLayout>
  );
};

export default BulkErrorContainer;