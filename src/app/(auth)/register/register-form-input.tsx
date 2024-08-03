import { useState } from "react"

import { Visibility, VisibilityOff } from "@mui/icons-material"
import ClearIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
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
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"

import ButtonIcon from "src/components/base/styles/button-icon"
import { RegisterRequest } from "src/models/forms/register"

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

    return { inputNameTypography, tooltipTypopgraphy, placeholderTypography }
}

type RegisterFormInputProps = {
    register: UseFormRegister<RegisterRequest>
    errors: FieldErrors<RegisterRequest>
    watchFormField: UseFormWatch<RegisterRequest>
    setFormValue: UseFormSetValue<RegisterRequest>
    inputName: keyof RegisterRequest // must be lowercase
}

function RegisterFormInput(props: RegisterFormInputProps) {
    const { register, watchFormField, setFormValue, errors, inputName } = props
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { t } = useTranslation()

    const handlePasswordVisibility = () => setShowPassword(!showPassword)
    const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

    const { inputNameTypography, tooltipTypopgraphy, placeholderTypography } = useGetAllTypographies(inputName)

    return (
        // Set Grid to half width if inputName is firstname or lastname else full width
        <Grid xs={inputName === "firstname" || inputName === "lastname" ? 6 : 12}>
            <FormControl fullWidth error={Boolean(errors[inputName.toString()])}>
                {/* Form Input Label And Visibility Button */}
                <Box display="flex" gap={2} p={1} justifyContent="space-between" alignItems="center">
                    {/* Input Label */}
                    <Typography
                        variant="h6"
                        gutterBottom
                        component="label"
                        htmlFor={`${inputName}-input`}
                        fontWeight={500}
                    >
                        {t(inputNameTypography)}
                    </Typography>

                    {/* Password Field Visibility Button */}
                    {inputName === "password" || inputName === "confirmPassword" ? (
                        <ButtonIcon
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: -0.8, mb: 1 }}
                            onClick={
                                inputName === "password" ? handlePasswordVisibility : handleConfirmPasswordVisibility
                            }
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
                    type={getInputType(inputName, inputName === "password" ? showPassword : showConfirmPassword)}
                    id={`${inputName}-input`}
                    placeholder={placeholderTypography}
                    autoComplete={inputName}
                    required
                    startAdornment={getStartAdornment(inputName)}
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
                />
                {errors[inputName.toString()] && (
                    <FormHelperText>{t(errors[inputName.toString()].message as string)}</FormHelperText>
                )}
            </FormControl>
        </Grid>
    )
}

export default RegisterFormInput
