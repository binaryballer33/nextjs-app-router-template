import RHFFilledInput from "src/components/react-hook-form/rhf-filled-input"

import RHFAutocomplete from "./rhf-autocomplete"
import RHFCheckbox, { RHFMultiCheckbox } from "./rhf-checkbox"
import RHFCode from "./rhf-code"
import RHFCountrySelect from "./rhf-country-select"
import RHFDatePicker, { RHFMobileDateTimePicker } from "./rhf-date-picker"
import RHFPhoneInput from "./rhf-phone-input"
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
    CountrySelect: RHFCountrySelect,
    DatePicker: RHFDatePicker,
    FilledInput: RHFFilledInput,
    MobileDateTimePicker: RHFMobileDateTimePicker,
    MultiCheckbox: RHFMultiCheckbox,
    MultiSelect: RHFMultiSelect,
    MultiSwitch: RHFMultiSwitch,
    Phone: RHFPhoneInput,
    RadioGroup: RHFRadioGroup,
    Rating: RHFRating,
    Select: RHFSelect,
    Slider: RHFSlider,
    Switch: RHFSwitch,
    Text: RHFTextField,
    // Editor: RHFEditor,
    // Upload: RHFUpload,
    // UploadBox: RHFUploadBox,
    // UploadAvatar: RHFUploadAvatar,
}

export default Field
