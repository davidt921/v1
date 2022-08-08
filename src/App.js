import { Col, Row, Layout, Progress, Button, Popover, Modal } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
// import First from './first';
import {
  EllipsisOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { uid } from "uid";

const dummy_data_todo = [
  {
    id: 1,
    title: "Group Task 1",
    desc: "January - March",
    tasks: [
      {
        taskID: "1",
        name: "Re-designed the zero-g doggie bags. No more spills!",
        progress_percentage: "100",
      },
      {
        taskID: "2",
        name: "Bundle interplanetary analytics for improved transmission",
        progress_percentage: "30",
      },
    ],

    created_by: "1",
    created_at: "2021-04-20T23:47:50.046Z",
    updated_at: "2021-04-20T23:47:50.046Z",
  },
  {
    id:2,
    title: "Group Task 2",
    desc: "April - June",
    tasks: [],
    created_by: "1",
    created_at: "2021-04-21T00:04:23.906Z",
    updated_at: "2021-04-21T00:04:23.906Z",
  },
  {
    id: 3,
    title: "Group Task 3",
    desc: "July - September",
    tasks: [
      {
        taskID: "3",
        name: "Data Migration: Performance & Culture End Game",
        progress_percentage: "60",
      },
    ],
    created_by: "1",
    created_at: "2021-04-21T00:04:23.906Z",
    updated_at: "2021-04-21T00:04:23.906Z",
  },
  {
    id: 4,
    title: "Group Task 4",
    desc: "October - December",
    tasks: [
      {
        taskID: "4",
        name: "Bundle interplanetary analytics for improved transmission",
        progress_percentage: "20",
      },
    ],
    created_by: "1",
    created_at: "2021-04-21T00:04:23.906Z",
    updated_at: "2021-04-21T00:04:23.906Z",
  },
];

export default function App() {
  const { Header, Content } = Layout;
  const [size, setSize] = useState("large");

  return (
    <Layout className="layout">
      <Header>
        <Row>
          <Col>
            <div class="head"> Product Roadmap</div>
          </Col>
          <Col>
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size={size}
            >
              Add New Group
            </Button>
          </Col>
        </Row>
      </Header>
      <br></br>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {dummy_data_todo.map((val, index) => {
            return <Task key={index} {...val} />;
          })}
        </Row>
      </Content>
    </Layout>
  );
}

function Task({
  id,
  tasks,
  title,
  desc,
  name,
  done,
  todo_id,
  created_at,
  updated_at,
  progress_percentage,
}) {
  const [formData, setFormData] = useState({
    name: "aaa",
    progress_percentage: "aaa",
  });

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("ok");

    //menambhakn task
    // let data = { ...dummy_data_todo};
    let data = dummy_data_todo.find((x) => x.id === id);
    data.tasks.push({
      taskID: uid(),
      name: formData.name,
      progress_percentage: formData.progress_percentage,
    });

    // data.push({taskID:uid(),name: formData.name, progress_percentage: formData.progress_percentage });
    // setTask(data);
  }

  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    let data = dummy_data_todo.find((x) => x.id === id);
    data.tasks.push({
      taskID: uid(),
      name: formData.name,
      progress_percentage: formData.progress_percentage,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const right = (taskID,dirID) => {
    let data = dummy_data_todo.find((x) => x.id === id);
    let data2 = data.tasks.find((x) => x.taskID === taskID)

    let data3 = dummy_data_todo.find((x) => x.id === dirID);
    data3.tasks.push(data2);
    
  }

  return (
    <Col className="gutter-row" span={6}>
      <div class={`cardbox${id}`}>
        <Row>
          <Col>
            <div class={`group${id}`}>{title}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div class="desc">{desc}</div>
          </Col>
        </Row>
        <Row class="1">
          <Col>
            {tasks.length > 0 ? (
              tasks.map((task, index) => {
                return (
                  <div class="card1">
                    <div class="ant-card ant-card-bordered">
                      <div class="ant-card-body">
                        <div class="isitask1">
                          <span>{task.name}</span>
                        </div>
                      </div>
                      <div class="ant-card-head">
                        <div class="ant-card-head-wrapper">
                          <div class="ant-card-head-title">
                            <Progress percent={task.progress_percentage} />
                          </div>
                          <div class="ant-card-extra">
                            <Popover
                              content={<button class="butright" onClick={() => right(task.taskID, id+1)}>Move Right</button>}
                              title="Title"
                              trigger="click"
                              visible={visible}
                              onVisibleChange={handleVisibleChange}
                            >
                              <EllipsisOutlined />
                            </Popover>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div class="card2">
                <div class="isitask2">
                  <span>No Task</span>
                </div>
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <div class="button1" onClick={showModal}>
              <PlusCircleOutlined /> New Task
            </div>

            <Modal
              title="New Task"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Submit"
            >
              <p>Task Name</p>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={formData.name}
                name="name"
              />
              <p>Percentage</p>
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                value={formData.progress_percentage}
                name="progress_percentage"
              />
              <button type="submit" class="btn btn-primary">
                save
              </button>
            </Modal>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
