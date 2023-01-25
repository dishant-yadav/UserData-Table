import { useEffect, useState } from "react";
import { MantineProvider, Text } from "@mantine/core";
import UserTable from "./components/UserTable";

const App = () => {
  // function to extract name from email address
  const getNameFromEmail = (email: string) => {
    let name = email.substring(0, email.indexOf("@"));
    let names = name.split(/[^a-zA-Z]+/);
    let firstName = "";
    let lastName = "";
    for (let i = 0; i < names.length - 1; i++) {
      firstName += names[i] + " ";
    }
    lastName = names[names.length - 1];

    return { firstName: firstName.trim(), lastName: lastName };
  };

  const [users, setUsers] = useState([
    {
      createdAt: "",
      name: "",
      email: "",
      avatar: "",
      id: "",
    },
  ]);

  const getUserData = async () => {
    // feching data from URL
    const userData = await fetch(
      "https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users"
    );
    const userDataJSON = await userData.json();

    // extracting name from email address in two parts namely first and last name
    for (let user of userDataJSON) {
      const { firstName, lastName } = getNameFromEmail(user.email);
      user.name = `${firstName} ${lastName}`;
    }
    setUsers(userDataJSON);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UserTable data={users} />
    </MantineProvider>
  );
};

export default App;
