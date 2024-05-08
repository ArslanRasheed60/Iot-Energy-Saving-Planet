/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from "antd";
import OrderListData from "assets/data/order-list.data.json";
import { FileExcelOutlined, DeleteOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import dayjs from "dayjs";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/DateConstant";
import utils from "utils";
import { subscribeToTopic, client } from "../../../../mqttService";
import * as XLSX from "xlsx";

const { Option } = Select;

const paymentStatusList = ["temperature", "humidity", "light", "motion"];

const Orders = () => {
  const [list, setList] = useState([
    {
      id: "#123",
      name: "temperature",
      date: 1573430400,
      place: "Room",
      value: 677,
    },
    {
      id: "#5331",
      name: "humidity",
      date: 1573430400,
      place: "Room",
      value: 677,
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  // const handleShowStatus = (value) => {
  //   if (value !== "All") {
  //     const key = "name";
  //     const data = utils.filterArray(list.slice(0, 50), key, value);
  //     setFilteredList(data);
  //   } else {
  //     setFilteredList(list.slice(0, 50));
  //   }
  // };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Sensor",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.name}</span>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (_, record) => (
        <span>{dayjs.unix(record.date).format(DATE_FORMAT_DD_MM_YYYY)}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
    },
    {
      title: "Room",
      dataIndex: "room",
      render: (_, record) => (
        <>
          <span>{record.place}</span>
        </>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "room"),
    },
    {
      title: "Values",
      dataIndex: "value",
      render: (_, record) => (
        <span className="font-weight-semibold">{record.value}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "value"),
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  // const handleReload = (e) => {
  //   setFilteredList(list.slice(0, 50));
  // };

  const handleReset = () => {
    setList([]);
  };

  const handleDownload = () => {
    // Create a new workbook and a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(list);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Sheet");

    // Generate a buffer and trigger a download
    XLSX.writeFile(workbook, "record.xlsx");
  };

  useEffect(() => {
    const topic = "Home/Room";

    const handleMessage = (message) => {
      const messageList = JSON.parse(message.toString());
      setList((prevMessages) => {
        const newMessages = messageList.filter(
          (msg) => !prevMessages.find((prevMsg) => prevMsg.id === msg.id)
        );
        return [...newMessages, ...prevMessages].slice(0, 30); // This line ensures no duplicate data and limits array size
      });
    };

    subscribeToTopic(topic, handleMessage);

    return () => {
      client.unsubscribe(topic); // Make sure your MQTT service has an unsubscribe method
      // client.end(); // Optionally end the client if not used elsewhere
    };
  }, []);

  return (
    <Card>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mobileFlex={false}
      >
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            {/* <Button
              type="primary"
              icon={<ReloadOutlined />}
              block
              onClick={handleReload}
            >
              Reload
            </Button> */}
          </div>
          <div className="mb-3">
            {/* <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={handleShowStatus}
              placeholder="Status"
            >
              <Option value="All">All Devices</Option>
              {paymentStatusList.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))}
            </Select> */}
          </div>
        </Flex>
        <div className="d-flex">
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={handleReset}
            className="mx-2"
          >
            Reset All
          </Button>
          <Button
            type="primary"
            icon={<FileExcelOutlined />}
            block
            onClick={handleDownload}
          >
            Export All
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: "checkbox",
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
        />
      </div>
    </Card>
  );
};

export default Orders;
