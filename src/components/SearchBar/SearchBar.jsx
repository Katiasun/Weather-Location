import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import styles from "./styles.module.css";

export default function SearchBar({ onSelectLocation }) {
  const { ready, value, setValue, clearSuggestions } = usePlacesAutocomplete();

  // Address selection processing function to get the geocode and call onSelectLocation
  async function handleSelect(address) {
    setValue(address.label, false); // Set the input value and prevent further suggestions
    clearSuggestions(); // Clear the suggestions list

    try {
      const results = await getGeocode({ address: address.label }); // Get geocode results for the address
      const { lat, lng } = await getLatLng(results[0]); // Extract latitude and longitude
      onSelectLocation({ lat, lng }, address.label); // Pass the coordinates to the parent component
    } catch (error) {
      console.log("Error: " + error); // Log any errors
    }
  }

  return (
    <div className={styles.searchBar}>
      {ready && (
        <GooglePlacesAutocomplete
          selectProps={{
            value,
            onChange: handleSelect,
            onInputChange: (inputValue) => setValue(inputValue),
            isClearable: true,
          }}
        ></GooglePlacesAutocomplete>
      )}
      {!ready && <div>Loading...</div>}
    </div>
  );
}
