import React, { useState } from "react";
import { Row, Col, Button, Avatar, Dropdown, Table, Menu, Tag } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import ChartWidget from "components/shared-components/ChartWidget";
import AvatarStatus from "components/shared-components/AvatarStatus";
import GoalWidget from "components/shared-components/GoalWidget";
import Card from "components/shared-components/Card";
import Flex from "components/shared-components/Flex";
import {
  VisitorChartData,
  AnnualStatisticData,
  ActiveMembersData,
  NewMembersData,
  RecentTransactionData,
} from "./DefaultDashboardData";
import ApexChart from "react-apexcharts";
import { apexLineChartDefaultOption, COLOR_2 } from "constants/ChartConstant";
import { SPACER } from "constants/ThemeConstant";
import {
  UserAddOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  StopOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { useSelector } from "react-redux";
import AnalyticDashboard from "./index2";

const MembersChart = (props) => <ApexChart {...props} />;

const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors: [COLOR_2],
  },
};

const latestTransactionOption = [
  {
    key: "Refresh",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <ReloadOutlined />
        <span className="ml-2">Refresh</span>
      </Flex>
    ),
  },
  {
    key: "Print",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <PrinterOutlined />
        <span className="ml-2">Print</span>
      </Flex>
    ),
  },
  {
    key: "Export",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <FileExcelOutlined />
        <span className="ml-2">Export</span>
      </Flex>
    ),
  },
];

const newJoinMemberOptions = [
  {
    key: "Add all",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <PlusOutlined />
        <span className="ml-2">Add all</span>
      </Flex>
    ),
  },
  {
    key: "Disable all",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <StopOutlined />
        <span className="ml-2">Disable all</span>
      </Flex>
    ),
  },
];

const CardDropdown = ({ items }) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <a
        href="/#"
        className="text-gray font-size-lg"
        onClick={(e) => e.preventDefault()}
      >
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

const tableColumns = [
  {
    title: "Customer",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div className="d-flex align-items-center">
        <Avatar
          size={30}
          className="font-size-sm"
          style={{ backgroundColor: record.avatarColor }}
        >
          {utils.getNameInitial(text)}
        </Avatar>
        <span className="ml-2">{text}</span>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: () => <div className="text-right">Status</div>,
    key: "status",
    render: (_, record) => (
      <div className="text-right">
        <Tag
          className="mr-0"
          color={
            record.status === "Approved"
              ? "cyan"
              : record.status === "Pending"
              ? "blue"
              : "volcano"
          }
        >
          {record.status}
        </Tag>
      </div>
    ),
  },
];

export const DefaultDashboard = () => {
  const [visitorChartData] = useState(VisitorChartData);
  const [annualStatisticData] = useState(AnnualStatisticData);
  const [activeMembersData] = useState(ActiveMembersData);
  const [newMembersData] = useState(NewMembersData);
  const [recentTransactionData] = useState(RecentTransactionData);
  const { direction } = useSelector((state) => state.theme);

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={16}>
            {annualStatisticData.map((elm, i) => (
              <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                <StatisticWidget
                  title={elm.title}
                  value={elm.value}
                  status={elm.status}
                  subtitle={elm.subtitle}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <GoalWidget
            title="Monthly Target"
            value={87}
            extra={<Button type="primary">Learn More</Button>}
          />
        </Col>
      </Row>
      <AnalyticDashboard />
    </>
  );
};

export default DefaultDashboard;
