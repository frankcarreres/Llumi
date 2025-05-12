import { createTheme } from "@mui/material/styles";
import breakpoints from "./base/breakpoints";
import colors from "./base/colors";
import typography from "./base/typography";
import boxShadows from "./base/boxShadows";
import borders from "./base/borders";
import boxShadow from "./functions/boxShadow";
import linearGradient from "../../../assets/theme/functions/linearGradient";
import hexToRgb from "../../../assets/theme/functions/hexToRgb";
import pxToRem from "../../../assets/theme/functions/pxToRem";
import rgba from "../../../assets/theme/functions/rgba";
import dialogActions from "./components/dialog/dialogActions";
import dialogContentText from "./components/dialog/dialogContentText";
import dialogContent from "./components/dialog/dialogContent";
import dialogTitle from "./components/dialog/dialogTitle";
import { button, dialog, input, link, menu, select } from "framer-motion/m";
import svgIcon from "./components/svgIcon";
import icon from "./components/icon";
import buttonBase from "./components/buttonBase";
import popover from "./components/popover";
import autocomplete from "./components/form/autocomplete";
import radio from "./components/form/radio";
import checkbox from "./components/form/checkbox";
import formLabel from "./components/form/formLabel";
import formControlLabel from "./components/form/formControlLabel";
import stepIcon from "./components/stepper/stepIcon";
import stepLabel from "./components/stepper/stepLabel";
import stepConnector from "./components/stepper/stepConnector";
import step from "./components/stepper/step";
import stepper from "./components/stepper";
import tab from "./components/tabs/tab";
import tabs from "./components/tabs";
import appBar from "./components/appBar";
import tooltip from "./components/tooltip";
import avatar from "./components/avatar";
import slider from "./components/slider";
import breadcrumbs from "./components/breadcrumbs";
import linearProgress from "./components/linearProgress";
import tableCell from "./components/table/tableCell";
import tableHead from "./components/table/tableHead";
import tableContainer from "./components/table/tableContainer";
import divider from "./components/divider";
import switchButton from "./components/form/switchButton";
import menuItem from "./components/menu/menuItem";
import textField from "./components/form/textField";
import inputOutlined from "./components/form/inputOutlined";
import inputLabel from "./components/form/inputLabel";
import iconButton from "./components/iconButton";
import cardContent from "./components/card/cardContent";
import cardMedia from "./components/card/cardMedia";
import card from "./components/card";
import listItemText from "./components/list/listItemText";
import listItem from "./components/list/listItem";
import list from "./components/list";
import sidenav from "./components/sidenav";
import container from "./components/container";
import globals from "./base/globals";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
