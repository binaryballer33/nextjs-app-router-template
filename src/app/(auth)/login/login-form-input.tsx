import { useState } from "react"

import { Visibility, VisibilityOff } from "@mui/icons-material"
import ClearIcon from "@mui/icons-material/Clear"
import KeyIcon from "@mui/icons-material/Key"
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded"
import {
    Box,
    FilledInput,
    FormControl,
    FormHelperText,
    Unstable_Grid2 as Grid,
    IconButton,
    InputAdornment,
    Tooltip,
    Typography,
} from "@mui/material"
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"

import ButtonIcon from "src/components/base/styles/button-icon"
import type { LoginRequest } from "src/models/forms/login"

type LoginFormInputProps = {
    register: UseFormRegister<LoginRequest>
    errors: FieldErrors<LoginRequest>
    watchFormField: UseFormWatch<LoginRequest>
    setFormValue: UseFormSetValue<LoginRequest>
    inputName: keyof LoginRequest // must be lowercase
    placeholder: string
}

function LoginFormInput(props: LoginFormInputProps) {
    const { register, watchFormField, setFormValue, errors, inputName, placeholder } = props
    const [showPassword, setShowPassword] = useState(false)

    const { t } = useTranslation()

    const handlePasswordVisibility = () => setShowPassword(!showPassword)

    // make the first letter of the inputName uppercase
    const inputNameForTypography = inputName.charAt(0).toUpperCase() + inputName.slice(1)

    const getType = (typeInputName: keyof LoginRequest) => {
        if (typeInputName === "password") return showPassword ? "text" : "password"
        if (typeInputName === "email") return "email"
        return "text"
    }

    return (
        <Grid xs={12}>
            <FormControl fullWidth error={Boolean(errors[inputName.toString()])}>
                {/* Form Input Label And Button */}
                <Box display="flex" gap={2} p={1} justifyContent="space-between" alignItems="center">
                    {/* Input Label */}
                    <Typography
                        variant="h6"
                        gutterBottom
                        component="label"
                        htmlFor={`${inputName}-input`}
                        fontWeight={500}
                    >
                        {t(inputNameForTypography)}
                    </Typography>

                    {/* Password Field Visibility Button */}
                    {inputName === "password" && (
                        <ButtonIcon
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: -0.8, mb: 1 }}
                            onClick={handlePasswordVisibility}
                        >
                            {showPassword ? (
                                <Tooltip title={t("hide password")}>
                                    <VisibilityOff sx={{ fontSize: 18 }} />
                                </Tooltip>
                            ) : (
                                <Tooltip title={t("show password")}>
                                    <Visibility sx={{ fontSize: 18 }} />
                                </Tooltip>
                            )}
                        </ButtonIcon>
                    )}
                </Box>

                {/* Field Input */}
                <FilledInput
                    hiddenLabel
                    {...register(inputName)}
                    type={getType(inputName)}
                    id={`${inputName}-input`}
                    placeholder={`Write your ${placeholder}`}
                    autoComplete={inputName}
                    required
                    startAdornment={
                        inputName === "email" ? (
                            <InputAdornment position="start">
                                <MailOutlineRoundedIcon fontSize="small" />
                            </InputAdornment>
                        ) : (
                            <InputAdornment position="start">
                                <KeyIcon />
                            </InputAdornment>
                        )
                    }
                    endAdornment={
                        // only show clear icon if textfield is not empty
                        watchFormField(inputName as keyof LoginRequest) !== "" && (
                            <InputAdornment position="end">
                                <Tooltip title={`clear ${inputName}`}>
                                    {/* reset the input field */}
                                    <IconButton onClick={() => setFormValue(inputName as keyof LoginRequest, "")}>
                                        <ClearIcon color="secondary" />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        )
                    }
                />
                {errors[inputName.toString()] && (
                    <FormHelperText>{t(errors[inputName.toString()].message as string)}</FormHelperText>
                )}
            </FormControl>
        </Grid>
    )
}

export default LoginFormInput
