import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import UserTable from "./components/UserTable";
import AddUser from "./components/AddUser";

const App = () => {
  // function to capitalize text
  const capitalizeText = (text: string) => {
    const capitalized =
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    return capitalized;
  };

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

    return {
      firstName: capitalizeText(firstName.trim()),
      lastName: capitalizeText(lastName),
    };
  };

  const [users, setUsers] = useState([
    {
      createdAt: "",
      name: "Loading...",
      email: "Loading...",
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
