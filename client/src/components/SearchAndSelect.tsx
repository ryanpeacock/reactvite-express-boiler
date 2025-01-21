import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";

type SearchSelectProps = {
  handleOnChange: (value: string) => void;
};

const SearchSelect = ({ handleOnChange }: SearchSelectProps) => {
  const onChange = (value: { label: string; value: string } | null): void => {
    if (!value) {
      handleOnChange("");
      return;
    }

    handleOnChange(value.value);
  };

  const fetchUsernames = async (inputValue: string) => {
    console.log({ inputValue });
    if (!inputValue) return [];
    try {
      const response = await fetch(`/api/search-movies?search=${inputValue}`);
      const data = await response.json();
      if (data.error) {
        return [];
      }
      return data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const debouncedFetchUsernames = debounce(
    (
      inputValue: string,
      callback: (options: { label: string; value: string }[]) => void
    ) => {
      fetchUsernames(inputValue).then(callback);
    },
    800
  );

  return (
    <div className="w-72">
      <AsyncSelect
        cacheOptions
        loadOptions={debouncedFetchUsernames}
        onChange={onChange}
        placeholder="Search for usernames..."
        isClearable
      />
    </div>
  );
};

export default SearchSelect;
