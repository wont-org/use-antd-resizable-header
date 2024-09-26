import { Typography } from "antd";
import React from "react";

export const columns = [
  {
    title: "自动计算",
    dataIndex: "name1",
    // resizable: false,
    // key: 'name',
    width: 100,
    ellipsis: true,
    fixed: "left",
  },
  {
    title: "自动计算 mode Text",
    dataIndex: "name2",
    // key: 'name',
    width: 320,
    ellipsis: true,
  },
  {
    title: "刚好两个",
    dataIndex: "name3",
    // key: 'name',
    width: 320,
    ellipsis: true,
    align: "right",
  },
  {
    title: "刚好两个, 自定义render",
    dataIndex: "name4",
    // key: 'name',
    width: 320,
    ellipsis: true,
    align: "right",
  },
  {
    title: "maxSize 0, 自定义render",
    dataIndex: "name5",
    // key: 'name',
    width: 320,
    ellipsis: true,
    align: "right",
  },
  {
    title: "小于maxSize无更多",
    dataIndex: "maxSize",
    // key: 'name',
    width: 200,
    ellipsis: true,
    align: "right",
  },
  {
    title: "地方很大，但只展示一个",
    dataIndex: "age",
    // key: 'age',
    width: 300,
    ellipsis: true,
    align: "right",
  },
  {
    title: "自定义触发器",
    dataIndex: "moreRender",
    // key: 'age',
    width: 160,
    ellipsis: true,
    align: "right",
  },
  {
    title:
      "很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长",
    dataIndex: "address",
    // key: 'address',
    width: 200,
    ellipsis: true,
    align: "right",
  },
];
export const dataSource = [
  {
    id: "1",
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
    maxSize: "maxSize",
    moreRender: "moreRender",
  },
];
