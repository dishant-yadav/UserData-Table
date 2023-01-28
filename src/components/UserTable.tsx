import { useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Center,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface UserTableProps {
  data: {
    createdAt: string;
    avatar: string;
    email: string;
    id: string;
    name: string;
  }[];
}

const UserTable = ({ data }: UserTableProps) => {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<string[]>(["0"]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    // condition to check for empty email
    if (item.email) {
      return (
        <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
          <td>
            <Checkbox
              checked={selection.includes(item.id)}
              onChange={() => toggleRow(item.id)}
              transitionDuration={0}
            />
          </td>
          <td>
            <Group spacing="sm">
              <Avatar size={26} src={item.avatar} radius={26} />
              <Text size="sm" fw={700}>
                {item.name.trim()}
              </Text>
            </Group>
          </td>
          <td>{item.email.trim()}</td>
        </tr>
      );
    }
  });

  return (
    <ScrollArea>
      {data.length > 0 ? (
        <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== data.length
                  }
                  transitionDuration={0}
                />
              </th>
              <th>User</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : (
        <Center style={{ height: 200 }}>
          <Text fw={500} fz="xl">
            No Data to Show
          </Text>
        </Center>
      )}
    </ScrollArea>
  );
};

export default UserTable;
