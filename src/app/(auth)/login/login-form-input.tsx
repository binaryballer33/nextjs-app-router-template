import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import type { LoginRequest } from "src/types/forms/login"

import { useState } from "react"

import { useTranslation } from "react-i18next"

import ClearIcon from "@mui/icons-material/Clear"
import KeyIcon from "@mui/icons-material/Key"
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded"

import { Visibility, VisibilityOff } from "@mui/icons-material"
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

import ButtonIcon from "src/components/base/styles/button-icon"

type LoginFormInputProps = {
    errors: FieldErrors<LoginRequest>
    inputName: keyof LoginRequest // must be lowercase
    placeholder: string
    register: UseFormRegister<LoginRequest>
    setFormValue: UseFormSetValue<LoginRequest>
    watchFormField: UseFormWatch<LoginRequest>
}

function LoginFormInput(props: LoginFormInputProps) {
    const { errors, inputName, placeholder, register, setFormValue, watchFormField } = props
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
            <FormControl error={Boolean(errors[inputName.toString()])} fullWidth>
                {/* Form Input Label And Button */}
                <Box alignItems="center" display="flex" gap={2} justifyContent="space-between" p={1}>
                    {/* Input Label */}
                    <Typography
                        component="label"
                        fontWeight={500}
                        gutterBottom
                        htmlFor={`${inputName}-input`}
                        variant="h6"
                    >
                        {t(inputNameForTypography)}
                    </Typography>

                    {/* Password Field Visibility Button */}
                    {inputName === "password" && (
                        <ButtonIcon
                            color="secondary"
                            onClick={handlePasswordVisibility}
                            sx={{ mb: 1, mr: -0.8 }}
                            variant="outlined"
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
                    autoComplete={inputName}
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
                    id={`${inputName}-input`}
                    placeholder={`Write your ${placeholder}`}
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
                    type={getType(inputName)}
                />
                {errors[inputName.toString()] && (
                    <FormHelperText>{t(errors[inputName.toString()].message as string)}</FormHelperText>
                )}
            </FormControl>
        </Grid>
    )
}

export default LoginFormInput
