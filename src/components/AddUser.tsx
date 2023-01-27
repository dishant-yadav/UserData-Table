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
  const nameRegex = /[^a-zA-Z]/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const [opened, setOpened] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [userData, setUserData] = useState<Object>({
    name: "",
    email: "",
    avatar: "",
  });
  const [name, setName] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [email, setEmail] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [image, setImage] = useState<File>(new File(["", ""], ""));

  const submitImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "imageupload");
    data.append("cloud_name", "dj4mlinfo");

    try {
      const resData = await fetch(
        "https://api.cloudinary.com/v1_1/dj4mlinfo/image/upload/",
        {
          method: "POST",
          body: data,
        }
      );
      const resDataJSON = await resData.json();
      const { secure_url } = resDataJSON;
      return secure_url;
    } catch {
      console.error("Error");
    }
  };

  const handleSubmit = async () => {
    const imageURI = await submitImage();
    setUserData({ name: name, email: email, avatar: imageURI });
  };

  const createUser = async () => {
    const requestOptions = {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resData = await fetch(
      "https://63d36305c1ba499e54c061d3.mockapi.io/api/v1/users/",
      requestOptions
    );
    return resData.ok;
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setImage(new File(["", ""], ""));
  };

  useEffect(() => {
    createUser();
  }, [userData]);

  return (
    <>
      <Modal
        opened={opened}
        centered
        onClose={() => {
          resetForm();
          setError(false);
          setOpened(false);
        }}
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
          icon={<AtSymbolIcon width={15} height={15} color={"black"} />}
          withAsterisk
          required
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        {error && !name && (
          <Text size={12} fw={400} color="red">
            Please enter name
          </Text>
        )}
        {error && name && name?.toString().match(nameRegex) && (
          <Text size={12} fw={400} color="red">
            Please enter a valid name
          </Text>
        )}
        <TextInput
          mt="xs"
          label="Email"
          placeholder="john.doe@gmail.com"
          inputWrapperOrder={["label", "input", "description", "error"]}
          icon={<UserIcon width={20} height={15} color={"black"} />}
          withAsterisk
          required
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
        {error && !email && (
          <Text size={12} fw={400} color="red">
            Please enter email
          </Text>
        )}
        {error && email && !email?.toString().match(emailRegex) && (
          <Text size={12} fw={400} color="red">
            Please enter a valid email
          </Text>
        )}
        <FileInput
          mt="xs"
          placeholder="Pick Image"
          label="Your Avatar"
          size="md"
          description="Only PNG or JPEG formats"
          radius="md"
          withAsterisk
          required
          value={image}
          // @ts-ignore
          onChange={setImage}
          accept="image/png,image/jpeg"
          icon={<ArrowUpTrayIcon width={15} height={15} color={"black"} />}
        />
        {error && !image.name && (
          <Text size={12} fw={400} color="red">
            Please enter image
          </Text>
        )}
        <Group position="right" mx={"xs"} mt={"xl"}>
          <Button
            color="indigo"
            variant="outline"
            onClick={() => {
              setError(false);
              resetForm();
            }}
          >
            Reset
          </Button>
          <Button
            color="indigo"
            onClick={async () => {
              if (
                !name ||
                !email ||
                !image.name ||
                name?.toString().match(nameRegex) ||
                !email?.toString().match(emailRegex)
              ) {
                setError(true);
              } else {
                setError(false);
                await handleSubmit();
                setOpened(false);
                resetForm();
              }
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
