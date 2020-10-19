export default function getSelectedOptionsValueFromSelect(selectElement) {
  return Array.from(selectElement.options)
      .filter(option => option.selected)
      .map(option => option.value)
}