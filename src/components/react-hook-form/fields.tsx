import RHFFilledInput from "@/components/react-hook-form/rhf-filled-input"

import RHFAutocomplete from "./rhf-autocomplete"
import RHFCheckbox, { RHFMultiCheckbox } from "./rhf-checkbox"
import RHFCode from "./rhf-code"
import RHFRadioGroup from "./rhf-radio-group"
import RHFRating from "./rhf-rating"
import RHFSelect, { RHFMultiSelect } from "./rhf-select"
import RHFSlider from "./rhf-slider"
import RHFSwitch, { RHFMultiSwitch } from "./rhf-switch"
import RHFTextField from "./rhf-text-field"

const Field = {
    Autocomplete: RHFAutocomplete,
    Checkbox: RHFCheckbox,
    Code: RHFCode,
    FilledInput: RHFFilledInput,
    MultiCheckbox: RHFMultiCheckbox,
    MultiSelect: RHFMultiSelect,
    MultiSwitch: RHFMultiSwitch,
    RadioGroup: RHFRadioGroup,
    Rating: RHFRating,
    Select: RHFSelect,
    Slider: RHFSlider,
    Switch: RHFSwitch,
    Text: RHFTextField,
    // CountrySelect: RHFCountrySelect,
    // MobileDateTimePicker: RHFMobileDateTimePicker,
    // DatePicker: RHFDatePicker,
    // Editor: RHFEditor,
    // Upload: RHFUpload,
    // UploadBox: RHFUploadBox,
    // UploadAvatar: RHFUploadAvatar,
}

export default Field
