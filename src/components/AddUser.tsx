import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  FileInput,
  TextInput,
  Text,
} from "@mantine/core";
import {
  ArrowUpTrayIcon,
  AtSymbolIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const AddUser = () => {
  const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [submit, setSubmit] = useState(false);
  const [opened, setOpened] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
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
    data.append("upload_preset", "imageuploader");
    data.append("cloud_name", "xyz");

    try {
      const resData = await fetch(
        "https://api.cloudinary.com/v1_1/xyz/image/upload/",
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

  const createUser = async (userData: Object) => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !image.name ||
      (name?.toString() + " ").match(nameRegex) ||
      !email?.toString().match(emailRegex)
    ) {
      setError(true);
    } else {
      setSubmit(true);
      const imageURI = await submitImage();
      const userData = {
        name,
        avatar: imageURI,
        email,
      };
      setOpened(false);
      await createUser(userData);
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setImage(new File(["", ""], ""));
    setError(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        centered
        onClose={() => {
          resetForm();
          setError(false);
          setOpened(false);
          setSubmit(false);
        }}
        title="Add Details"
        transition="slide-down"
        transitionDuration={400}
        transitionTimingFunction="ease"
      >
        <form onSubmit={async (e: any) => await handleSubmit(e)}>
          <TextInput
            mt="xs"
            label="Name"
            placeholder="John Doe"
            inputWrapperOrder={["label", "input", "description", "error"]}
            icon={<AtSymbolIcon width={15} height={15} color={"black"} />}
            withAsterisk
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          {error && !name && (
            <Text size={12} fw={400} color="red">
              Please enter name
            </Text>
          )}
          {error && name && (name?.toString() + " ").match(nameRegex) && (
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
              type="reset"
              color="indigo"
              variant="outline"
              onClick={() => {
                resetForm();
              }}
            >
              Reset
            </Button>
            <Button type="submit" color="indigo" disabled={submit}>
              Submit
            </Button>
          </Group>
        </form>
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
        <Button
          onClick={() => {
            setOpened(true);
            setSubmit(false);
          }}
        >
          Add User
        </Button>
      </Group>
    </>
  );
};

export default AddUser;
