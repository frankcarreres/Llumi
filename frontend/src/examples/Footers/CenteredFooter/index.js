// examples/Footers/CenteredFooter.js
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function CenteredFooter() {
  return (
    <MKBox component="footer" py={3}>
      <MKTypography variant="body2" color="inherit" align="center" fontWeight="regular">
        Todos los derechos reservados. Copyright &copy; {new Date().getFullYear()} Llumí
      </MKTypography>
    </MKBox>
  );
}

export default CenteredFooter;
