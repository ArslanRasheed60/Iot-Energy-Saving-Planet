import React, { useState } from "react";
import { Row, Col, Card, Avatar, Select, Tag, Badge, List } from "antd";
import RegiondataWidget from "components/shared-components/RegiondataWidget";
import DonutChartWidget from "components/shared-components/DonutChartWidget";
import Flex from "components/shared-components/Flex";
import ChartWidget from "components/shared-components/ChartWidget";
import NumberFormat from "react-number-format";
import ApexChart from "react-apexcharts";
import {
  apexSparklineChartDefultOption,
  COLORS,
} from "constants/ChartConstant";
import utils from "utils";
import {
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  YoutubeFilled,
  DribbbleSquareFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import {
  regionData,
  sessionData,
  sessionLabels,
  conbinedSessionData,
  sessionColor,
  pagesViewData,
  socialMediaReferralData,
  uniqueVisitorsDataWeek,
  uniqueVisitorsDataDay,
  uniqueVisitorsDataMonth,
} from "./AnalyticDashboardData";
import { useSelector } from "react-redux";

const socialMediaReferralIcon = [
  <FacebookFilled style={{ color: "#1774eb" }} />,
  <TwitterSquareFilled style={{ color: "#1c9deb" }} />,
  <YoutubeFilled style={{ color: "#f00" }} />,
  <LinkedinFilled style={{ color: "#0077b4" }} />,
  <DribbbleSquareFilled style={{ color: "#e44a85" }} />,
];

const { Option } = Select;

const rederRegionTopEntrance = (
  <div className="mb-4">
    <div className="d-flex align-items-center">
      <Avatar size={20} src="/img/flags/us.png" />
      <h2 className="mb-0 ml-2 font-weight-bold">37.61%</h2>
    </div>
    <span className="text-muted">Top entrance region</span>
  </div>
);

export const AnalyticDashboard = () => {
  const [uniqueVisitorsData, setUniqueVisitorsData] = useState(
    uniqueVisitorsDataWeek
  );
  const { direction } = useSelector((state) => state.theme);

  const handleVisitorsChartChange = (value) => {
    console.log(value);
    switch (value) {
      case "day":
        setUniqueVisitorsData(uniqueVisitorsDataDay);
        break;
      case "week":
        setUniqueVisitorsData(uniqueVisitorsDataWeek);
        break;
      case "month":
        setUniqueVisitorsData(uniqueVisitorsDataMonth);
        break;
      default:
        setUniqueVisitorsData(uniqueVisitorsDataWeek);
        break;
    }
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xxl={12}>
          <ChartWidget
            series={uniqueVisitorsData.series}
            xAxis={uniqueVisitorsData.categories}
            title="Visits"
            height={410}
            type="bar"
            direction={direction}
            customOptions={{
              colors: [COLORS[1], COLORS[0]],
            }}
            extra={
              <Select
                defaultValue="week"
                size="small"
                style={{ width: 120 }}
                onChange={handleVisitorsChartChange}
              >
                <Option value="day">Day</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
              </Select>
            }
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xxl={6}>
          <Card title="Resources Saved">
            <List
              itemLayout="horizontal"
              dataSource={pagesViewData}
              renderItem={(item) => (
                <List.Item>
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div>
                      <h4 className="font-weight-bold mb-0">{item.title}</h4>
                      <span className="text-muted">{item.url}</span>
                    </div>
                    <div>
                      <Tag color="blue">
                        <span className="font-weight-bold">
                          <NumberFormat
                            value={item.amount}
                            thousandSeparator={true}
                            displayType="text"
                          ></NumberFormat>
                        </span>
                      </Tag>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AnalyticDashboard;
