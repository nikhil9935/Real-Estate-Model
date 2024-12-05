
import { Card, Typography, Button } from "./AntdComponents";
import SignUpForm from "./SignUpForm";

const { Text } = Typography;

const SignUpCard = ({ formik, navigate }) => {
  return (
    <Card
      title="Sign Up"
      style={{
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#e6f7ff",
        width: 400,
        margin: "auto",
        marginTop: 100,
      }}
    >
      <SignUpForm formik={formik} />
      <Text style={{ textAlign: "center", marginTop: 16, padding: 50 }}>
        Already have an account? <Button type="link" onClick={() => navigate("/login")}>Login</Button>
      </Text>
      <br></br> <br></br>
    </Card>
  );
};

export default SignUpCard;
