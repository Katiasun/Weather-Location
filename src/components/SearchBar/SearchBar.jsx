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
    setValue(address.label, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: address.label });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectLocation({ lat, lng });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  return (
    <div className={styles.searchBar}>
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: handleSelect,
          onInputChange: () => setValue(inputValue),
        }}
      ></GooglePlacesAutocomplete>
    </div>
  );
}
