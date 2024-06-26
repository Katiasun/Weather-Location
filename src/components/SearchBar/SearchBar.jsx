import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import styles from "./styles.module.css";

export default function SearchBar({ onSelectLocation }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  async function handleSelect(address) {
    setValue(address.label, false); // Set the input value and prevent further suggestions
    clearSuggestions(); // Clear the suggestions list

    try {
      const results = await getGeocode({ address: address.label }); // Get geocode results for the address
      const { lat, lng } = await getLatLng(results[0]); // Extract latitude and longitude
      onSelectLocation({ lat, lng }); // Pass the coordinates to the parent component
    } catch (error) {
      console.log("Error: " + error); // Log any errors
    }
  }

  //Handles input change in the autocomplete input
  function handleInputChange(inputValue) {
    setValue(inputValue); // Set the input value for the autocomplete
  }

  return (
    <div className={styles.searchBar}>
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: handleSelect,
          onInputChange: handleInputChange,
          inputValue: value,
        }}
      ></GooglePlacesAutocomplete>
    </div>
  );
}
