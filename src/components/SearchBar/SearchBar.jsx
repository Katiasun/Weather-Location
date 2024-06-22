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

  const handleSelect = async (address) => {
    setValue(address.label, false);
    clearSuggestions();

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
  };
}
