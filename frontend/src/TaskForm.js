import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
} from 'antd';
import './TaskForm.css';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const TaskForm = ({ tasks, saveTask }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [task, setTask] = useState({});
  const [taskIndex, setTaskIndex] = useState(-1);

  useEffect(() => {
    if (taskId) {
      const index = tasks.findIndex(t => t.id === parseInt(taskId));
      setTaskIndex(index);
      setTask(tasks[index]);
      form.setFieldsValue(tasks[index]);
    }
  }, [taskId, tasks, form]);

  const onFinish = (values) => {
    console.log(values)
    saveTask({
      ...task,
      ...values,
    });
    navigate('/');
  };


  return (
    <div className="task-form">
      <h1>{taskId ? 'Edit Task' : 'New Task'}</h1>
      <Form
        form={form}
        {...formItemLayout}
        variant="filled"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input Title of the task!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input description for the task!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: 'Please input!',
            },
          ]}
        >
          <Select>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="in progress">In Progress</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[
            {
              required: true,
              message: 'Please input the due date for the task!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Save Task
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default TaskForm;



