import { useCallback, useState } from "react";

function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return [value, toggleValue];
}

export default useToggle;
