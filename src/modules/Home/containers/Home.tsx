import { Button, Flex, Input, Modal, Span } from "@icstark/ui";
import React from "react";
import Navbar from "../../../components/Navbar";
import FuzzySearch from "fuzzy-search";

function Home(props: any) {
  const [search, setSearch] = React.useState("");
  const [addModal, setAddModal] = React.useState(false);
  const [modal, setModal] = React.useState<any>({
    item: {},
    data: {},
    show: false,
  });
  const [form, setForm] = React.useState<any>({ values: {}, errors: {} });
  const [task, setTask] = React.useState<any>(
    JSON.parse(localStorage.getItem("task") || "[]") || []
  );
  const onChange = ({ target }: any) => {
    setForm({
      ...form,
      values: { ...form.values, [target.name]: target.value },
    });
  };

  const onBlur = ({ target }: any) => {
    if (target.name === "phone") {
      if (target.value) {
        if (target.value.length !== 10) {
          setForm({
            ...form,
            errors: { ...form.errors, [target.name]: "enter 10 digits" },
          });
        } else {
          setForm({ ...form, errors: { ...form.errors, [target.name]: "" } });
        }
      } else {
        setForm({
          ...form,
          errors: { ...form.errors, [target.name]: "This field is required" },
        });
      }
    } else if (!target.value) {
      setForm({
        ...form,
        errors: { ...form.errors, [target.name]: "This field is required" },
      });
    } else {
      setForm({ ...form, errors: { ...form.errors, [target.name]: "" } });
    }
  };

  const onSubmit = () => {
    const { title, note } = form.values;

    if (title && note) {
      setTask([...task, { title: title, note: note }]);
      setForm({
        values: { title: "", note: "" },
        errors: { title: "", note: "" },
      });
      localStorage.setItem(
        "task",
        JSON.stringify([...task, { title: title, note: note }])
      );
      setAddModal(false);
    }
  };

  const onDelete = (item: any) => {
    let index = task.indexOf(item);
    let data = [...task];
    data.splice(index, 1);
    setTask(data);
    localStorage.setItem("task", JSON.stringify(data));
  };

  const onUpdateModal = (item: any) => {
    setModal({ ...modal, show: true, data: item, item });
  };

  const onChangeModal = ({ target }: any) => {
    setModal({
      ...modal,
      data: { ...modal.data, [target.name]: target.value },
    });
  };

  const onUpdate = () => {
    const { title, note } = modal.data;
    let data = [...task];
    let index = data.indexOf(modal.item);
    data[index] = { title, note };
    setTask(data);
    setModal({ ...modal, show: false });
    localStorage.setItem("task", JSON.stringify(data));
  };

  let searcher = new FuzzySearch(task, ["title", "note"], {
    caseSensitive: false,
  });
  let result = searcher.search(search);

  return (
    <>
      <Navbar
        search={search}
        setSearch={({ target }: any) => setSearch(target.value)}
        {...props}
      />

      <Flex
        width={1}
        justifyContentCenter
        alignItemsCenter
        style={{ padding: "40px 10px" }}
        column
      >
        <Flex width={1} justifyContentFlexEnd>
          <Button variant="primary" onClick={() => setAddModal(true)}>
            Add New Task
          </Button>
        </Flex>
        <Flex width={1} wrap>
          {result.map((item: any) => {
            return (
              <Flex
                column
                justifyContentSpaceBetween
                style={{
                  border: "1px solid gray",
                  width: 200,
                  minHeight: 100,
                  borderRadius: 10,
                  padding: 10,
                  margin: 10,
                }}
              >
                <Span fontSize={18}>{item.title}</Span>
                <Span fontSize={14}>{item.note}</Span>
                <Flex width={1} justifyContentFlexEnd>
                  <Button
                    variant="xxs danger"
                    style={{ margin: 5 }}
                    onClick={() => onDelete(item)}
                  >
                    delete
                  </Button>
                  <Button
                    style={{ margin: 5 }}
                    variant="xxs primary"
                    onClick={() => onUpdateModal(item)}
                  >
                    update
                  </Button>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Modal toggleModal={addModal} setToggleModal={() => setAddModal(false)}>
        <Flex
          column
          style={{
            margin: "30px 10px",
          }}
        >
          <Input
            placeholder={"Title"}
            type={"text"}
            name="title"
            onChange={onChange}
            onBlur={onBlur}
            value={form.values["title"]}
            style={{ border: "none", margin: "10px" }}
          />
          <Input
            placeholder={"Take a note..."}
            type={"text"}
            name="note"
            onChange={onChange}
            onBlur={onBlur}
            value={form.values["note"]}
            style={{ border: "none", margin: "10px" }}
          />
          <Flex justifyContentFlexEnd>
            <Button onClick={onSubmit}>Submit</Button>
          </Flex>
        </Flex>
      </Modal>
      <Modal
        toggleModal={modal.show}
        setToggleModal={() => setModal({ ...modal, show: false })}
      >
        <Flex
          column
          style={{
            margin: "30px 10px",
          }}
        >
          <Input
            placeholder={"Title"}
            type={"text"}
            name="title"
            onChange={onChangeModal}
            value={modal.data["title"]}
            style={{ border: "none", margin: "10px" }}
          />
          <Input
            placeholder={"Take a note..."}
            type={"text"}
            name="note"
            onChange={onChangeModal}
            value={modal.data["note"]}
            style={{ border: "none", margin: "10px" }}
          />
          <Flex justifyContentFlexEnd>
            <Button onClick={onUpdate}>Submit</Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}

export default Home;
