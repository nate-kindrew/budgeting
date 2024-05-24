import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    position: "fixed",
                    bottom: 0,
                    width: "100%"
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    marginBottom: "16px"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: "8px 0",
                    width: "250px"
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    justifyContent: "flex-end"
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    " + .MuiInputBase-root": {
                        marginTop: "12px",
                        marginRight: "12px"
                    }
                }
            }
        }
    }
})

export default theme;