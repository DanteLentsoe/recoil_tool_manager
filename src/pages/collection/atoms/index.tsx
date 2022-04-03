import { atom, useRecoilState, useRecoilValue } from "recoil";

const darkModeState = atom({
  key: "dark-mode",
  default: false,
});

const DarkModeActivation = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  return (
    <>
      <input
        type="checkBox"
        checked={isDarkMode}
        onChange={(event) => {
          setIsDarkMode(event.currentTarget.checked);
        }}
      />
    </>
  );
};

const Button = () => {
  const isDarkMode = useRecoilValue(darkModeState);
  return (
    <>
      <button
        style={{
          backgroundColor: isDarkMode ? "black" : "blue",
          color: isDarkMode ? "gray" : "white",
        }}>
        Dark Mode
      </button>
    </>
  );
};

const Atoms = () => {
  return (
    <div>
      <div>
        <DarkModeActivation />
      </div>

      <div>
        <Button />
      </div>
    </div>
  );
};

export default Atoms;
