import { MantineProvider, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";

const App = () => {
  const getNameFromEmail = (email: string) => {
    var name = email.substring(0, email.indexOf("@"));
    var names = name.split(/[^a-zA-Z]+/);
    var firstName = "";
    var lastName = "";
    for (var i = 0; i < names.length - 1; i++) {
      firstName += names[i] + " ";
    }
    lastName = names[names.length - 1];

    return { firstName: firstName.trim(), lastName: lastName };
  };

  const [users, setUsers] = useState([
    {
      createdAt: "2023-01-16T10:34:58.213Z",
      name: "",
      email: "Arnaldo.Krajcik44@yahoo.com",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/993.jpg",
      id: "1",
    },
    {
      createdAt: "2023-01-15T17:44:44.292Z",
      name: "",
      email: "Andrew.Graham34@gmail.com",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1223.jpg",
      id: "2",
    },
    {
      createdAt: "2023-01-16T05:52:48.949Z",
      name: "",
      email: "Hudson_Mayert43@yahoo.com",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1206.jpg",
      id: "3",
    },
    {
      createdAt: "2023-01-16T01:42:34.764Z",
      name: "",
      email: "Adolfo.OHara@yahoo.com",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/942.jpg",
      id: "4",
    },
    {
      createdAt: "2023-01-15T19:36:46.105Z",
      name: "",
      email: "Jarrett.Bogisich@yahoo.com",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1181.jpg",
      id: "5",
    },
    {
      createdAt: "2023-01-16T07:47:40.063Z",
      name: "",
      email: "Xander54@hotmail.com",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/277.jpg",
      id: "6",
    },
    {
      createdAt: "2023-01-16T03:54:53.729Z",
      name: "",
      email: "somethingelse@yahoo.com",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/993.jpg",
      id: "7",
    },
  ]);

  // useEffect(() => {
  //   setUsers(users);
  // }, []);

  const xyz = () => {
    for (let user of users) {
      const { firstName, lastName } = getNameFromEmail(user.email);
      user.name = `${firstName} ${lastName}`;
    }
    console.log(users);
  };

  xyz();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UserTable data={users} />
    </MantineProvider>
  );
};

export default App;
