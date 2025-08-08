import { theme } from "antd";

const colorPrimary = "#0c3b93";

export const themeConfig = {
  token: {
    colorPrimary,
  },
  components: {
    Layout: {
      siderBg: "#1f1f1f",
    },
    Pagination: {
      itemActiveBg: "white",
      colorPrimary: "black",
    },
  },
  algorithm: theme.darkAlgorithm,
};
