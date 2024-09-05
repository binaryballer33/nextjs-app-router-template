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
    Code: RHFCode,
    Select: RHFSelect,
    Switch: RHFSwitch,
    Slider: RHFSlider,
    Rating: RHFRating,
    Text: RHFTextField,
    Phone: RHFPhoneInput,
    Checkbox: RHFCheckbox,
    RadioGroup: RHFRadioGroup,
    DatePicker: RHFDatePicker,
    MultiSelect: RHFMultiSelect,
    MultiSwitch: RHFMultiSwitch,
    Autocomplete: RHFAutocomplete,
    MultiCheckbox: RHFMultiCheckbox,
    CountrySelect: RHFCountrySelect,
    MobileDateTimePicker: RHFMobileDateTimePicker,
    // Editor: RHFEditor,
    // Upload: RHFUpload,
    // UploadBox: RHFUploadBox,
    // UploadAvatar: RHFUploadAvatar,
}

export default Field
