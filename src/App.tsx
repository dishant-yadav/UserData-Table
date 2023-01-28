import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import UserTable from "./components/UserTable";
import AddUser from "./components/AddUser";

const App = () => {
  const [users, setUsers] = useState<
    Array<{
      createdAt: string;
      name: string;
      email: string;
      avatar: string;
      id: string;
    }>
  >([
    {
      createdAt: "",
      name: "Loading...",
      email: "Loading...",
      avatar: "",
      id: "",
    },
  ]);

  // function to capitalize text
  const modifyText = (text: string) => {
    const capitalized =
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    // code to extract only letters
    const finalString = capitalized.replace(/[^a-zA-Z]/g, "");
    return finalString;
  };

  // function to extract name from email address
  function getNameFromEmail(email: string) {
    const name = email.substring(0, email.indexOf("@"));
    const names = name.split(/[._/]/);
    let firstName = "";
    let lastName = "";
    for (let i = 0; i < names.length - 1; i++) {
      firstName += names[i] + " ";
    }
    lastName = names[names.length - 1];

    return {
      firstName: modifyText(firstName.trim()),
      lastName: modifyText(lastName),
    };
  }

  const getUserData = async () => {
    // feching data from URL
    const userData = await fetch(
      "https://63d36305c1ba499e54c061d3.mockapi.io/api/v1/users/"
    );
    const userDataJSON = await userData.json();

    // extracting name from email address in two parts namely first and last name
    for (let user of userDataJSON) {
      if (!user.name) {
        const { firstName, lastName } = getNameFromEmail(user.email);
        user.name = `${firstName} ${lastName}`;
      }
    }
    setUsers(userDataJSON);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AddUser />
      <UserTable data={users} />
    </MantineProvider>
  );
};

export default App;
