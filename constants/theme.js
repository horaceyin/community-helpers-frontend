export const COLORS = {
  primary: "#001F2D",
  lightPrimary: "#f1f4ff",
  secondary: "#4D626C",
  error: "#ff0033",
  white: "#FFF",
  gray: "#74858C",
  dark: "#161719",
  darkText: "#626262",
  body: "#405792",
  bg: "#ECECEC",
  pending: "#4f4ae0",
  ongoing: "#ffa142",
  done: "#4ff06d",
  tabSelected: "#e32f45",
  tabNotSelected: "#748c94",
  tabButton: "#4a8ba1",
  tabBar: "#ECECEC",
  plusSelected: "#748c94",
  plusNotSelected: "#d27f26",
  green: "#3dff71",
};

//plusNotSelected: ff9c23

//primary: "#6360DC",

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  xxLarge: 32,
};

export const SPACING = 10;

export const FONTS = {
  bold: "InterBold",
  semiBold: "InterSemiBold",
  medium: "InterMedium",
  regular: "InterRegular",
  light: "InterLight",
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};
