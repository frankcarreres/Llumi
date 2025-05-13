import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import menuItem from "./styles";
import MDTypography from "admin/components/MDTypography";
import MDBox from "admin/components/MDBox";

// Material Dashboard 2 React components

// custom styles for the NotificationItem

const NotificationItem = forwardRef(({ icon, title, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <MDBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title}
      </MDTypography>
    </MDBox>
  </MenuItem>
));

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default NotificationItem;
