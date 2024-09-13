import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import type { RegisterRequest } from "src/types/forms/register"

import { useState } from "react"

import { useTranslation } from "react-i18next"

import ClearIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
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

// set the input type based on the inputName and showPassword state for the password fields
function getInputType(inputName: keyof RegisterRequest, isVisible: boolean) {
    if (inputName === "password" || inputName === "confirmPassword") return isVisible ? "text" : "password"
    if (inputName === "email") return "email"

    return "text"
}

// transform the inputName to a more readable format
function transformInputName(inputName: string): string {
    switch (inputName) {
        case "firstname":
            return "First Name"
        case "lastname":
            return "Last Name"
        case "confirmPassword":
            return "Confirm Password"
        default:
            return inputName.charAt(0).toUpperCase() + inputName.slice(1)
    }
}

// show email icon for email, key icon for password fields and edit icon for name fields
function getStartAdornment(inputName: keyof RegisterRequest) {
    switch (inputName) {
        case "email":
            return (
                <InputAdornment position="start">
                    <MailOutlineRoundedIcon fontSize="small" />
                </InputAdornment>
            )
        case "password":
        case "confirmPassword":
            return (
                <InputAdornment position="start">
                    <KeyIcon />
                </InputAdornment>
            )
        default:
            return (
                <InputAdornment position="start">
                    <EditIcon />
                </InputAdornment>
            )
    }
}

// does all the text transformations for the input fields to make them look better, keep that logic out of the component
function useGetAllTypographies(inputName: keyof RegisterRequest) {
    const inputNameTypography = transformInputName(inputName)

    const tooltipTypopgraphy = inputName === "confirmPassword" ? inputNameTypography.toLowerCase() : inputName

    const placeholderTypography =
        inputName === "confirmPassword"
            ? "Write your password again"
            : `Write your ${inputNameTypography.toLowerCase()}`

    return { inputNameTypography, placeholderTypography, tooltipTypopgraphy }
}

type RegisterFormInputProps = {
    errors: FieldErrors<RegisterRequest>
    inputName: keyof RegisterRequest // must be lowercase
    register: UseFormRegister<RegisterRequest>
    setFormValue: UseFormSetValue<RegisterRequest>
    watchFormField: UseFormWatch<RegisterRequest>
}

function RegisterFormInput(props: RegisterFormInputProps) {
    const { errors, inputName, register, setFormValue, watchFormField } = props
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { t } = useTranslation()

    const handlePasswordVisibility = () => setShowPassword(!showPassword)
    const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

    const { inputNameTypography, placeholderTypography, tooltipTypopgraphy } = useGetAllTypographies(inputName)

    return (
        // Set Grid to half width if inputName is firstname or lastname else full width
        <Grid xs={inputName === "firstName" || inputName === "lastName" ? 6 : 12}>
            <FormControl error={Boolean(errors[inputName.toString()])} fullWidth>
                {/* Form Input Label And Visibility Button */}
                <Box alignItems="center" display="flex" gap={2} justifyContent="space-between" p={1}>
                    {/* Input Label */}
                    <Typography
                        component="label"
                        fontWeight={500}
                        gutterBottom
                        htmlFor={`${inputName}-input`}
                        variant="h6"
                    >
                        {t(inputNameTypography)}
                    </Typography>

                    {/* Password Field Visibility Button */}
                    {inputName === "password" || inputName === "confirmPassword" ? (
                        <ButtonIcon
                            color="secondary"
                            onClick={
                                inputName === "password" ? handlePasswordVisibility : handleConfirmPasswordVisibility
                            }
                            sx={{ mb: 1, mr: -0.8 }}
                            variant="outlined"
                        >
                            {(inputName === "password" ? showPassword : showConfirmPassword) ? (
                                <Tooltip title={t(`hide ${inputName}`)}>
                                    <VisibilityOff sx={{ fontSize: 18 }} />
                                </Tooltip>
                            ) : (
                                <Tooltip title={t(`show ${tooltipTypopgraphy}`)}>
                                    <Visibility sx={{ fontSize: 18 }} />
                                </Tooltip>
                            )}
                        </ButtonIcon>
                    ) : null}
                </Box>

                {/* Field Input */}
                <FilledInput
                    hiddenLabel
                    {...register(inputName)}
                    autoComplete={inputName}
                    endAdornment={
                        // only show clear icon if textfield is not empty
                        watchFormField(inputName as keyof RegisterRequest) !== "" && (
                            <InputAdornment position="end">
                                <Tooltip title={`clear ${tooltipTypopgraphy}`}>
                                    {/* reset the input field */}
                                    <IconButton onClick={() => setFormValue(inputName as keyof RegisterRequest, "")}>
                                        <ClearIcon color="secondary" />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        )
                    }
                    id={`${inputName}-input`}
                    placeholder={placeholderTypography}
                    required
                    startAdornment={getStartAdornment(inputName)}
                    type={getInputType(inputName, inputName === "password" ? showPassword : showConfirmPassword)}
                />
                {errors[inputName.toString()] && (
                    <FormHelperText>{t(errors[inputName.toString()].message as string)}</FormHelperText>
                )}
            </FormControl>
        </Grid>
    )
}

export default RegisterFormInput
