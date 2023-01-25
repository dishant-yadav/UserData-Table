import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Group,
  FileInput,
  Input,
  TextInput,
  Space,
  Text,
} from "@mantine/core";
import {
  ArrowUpTrayIcon,
  AtSymbolIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const AddUser = () => {
  const createUser = async () => {
    const userData = {
      name: "Task4545",
      email: "task.45454@yahoo.com",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/99.jpg",
    };

    const requestOptions = {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const resData = await fetch(
      "https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users",
      requestOptions
    );
    const resDataJSON = await resData.json();

    console.log(resDataJSON);

    if (resData.ok) {
      console.log("Success");
    } else {
      console.log("Error");
    }
  };

  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  return (
    <>
      <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        title="Add Details"
        transition="slide-down"
        transitionDuration={400}
        transitionTimingFunction="ease"
      >
        <TextInput
          mt="xs"
          label="Name"
          placeholder="John Doe"
          inputWrapperOrder={["label", "input", "description", "error"]}
          icon={<AtSymbolIcon width={15} height={15} />}
          withAsterisk
          required
        />
        <TextInput
          mt="xs"
          label="Email"
          placeholder="john.doe@gmail.com"
          inputWrapperOrder={["label", "input", "description", "error"]}
          icon={<UserIcon width={20} height={15} />}
          withAsterisk
          required
        />
        <FileInput
          mt="xs"
          placeholder="Pick Image"
          label="Your Avatar"
          size="md"
          description="Only PNG or JPEG formats"
          radius="md"
          withAsterisk
          required
          //   error={"Enter a valid image"}
          value={image}
          onChange={setImage}
          accept="image/png,image/jpeg"
          icon={<ArrowUpTrayIcon width={15} height={15} />}
        />
        <Group position="right" mx={"xs"} mt={"xs"}>
          <Button color="indigo" variant="outline">
            Reset
          </Button>
          <Button
            color="indigo"
            onClick={async () => {
              await createUser();
              console.log("Clicked");
            }}
          >
            Submit
          </Button>
        </Group>
      </Modal>
      <Group position="apart" mx={"xl"} mt={4}>
        <Text
          size={36}
          fw={700}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{ fontFamily: "Greycliff CF, sans-serif" }}
        >
          Users List
        </Text>
        <Button onClick={() => setOpened(true)}>Add User</Button>
      </Group>
    </>
  );
};

export default AddUser;
