// examples/Footers/CenteredFooter.js
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function CenteredFooter() {
  return (
    <MKBox component="footer" py={3}>
      <MKTypography variant="body2" color="inherit" align="center">
        © {new Date().getFullYear()} Llumí. Todos los derechos reservados.
      </MKTypography>
    </MKBox>
  );
}

export default CenteredFooter;
