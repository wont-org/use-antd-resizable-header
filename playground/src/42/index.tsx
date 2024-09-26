import ProTable from "@ant-design/pro-table";
import { useAntdResizableHeader } from "@wont/use-antd-resizable-header";
import { Button, Tooltip } from "antd";
import { useState } from "react";

const columns: any[] = [
  {
    title: "SN",
    dataIndex: "sn",
    key: "sn",
    align: "center",
    width: 90,
  },
  {
    title: "类型",
    dataIndex: "deviceType",
    key: "deviceType",
    align: "center",
    width: 90,
  },
  {
    title: "设备",
    dataIndex: "dis",
    key: "dis",
    align: "center",
    width: 200,
    // hideInTable: true,
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    align: "center",
    width: 90,
    ellipsis: false, // ellipsis 跟 tooltip冲突
    render: (text: any) => {
      return (
        <Tooltip title={text}>
          <div>{text}</div>
        </Tooltip>
      );
    },
  },
];

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: "John Brown",
    age: i + 1,
    street: "Lake Park",
    building: "C",
    number: 2035,
    remark: "Lake Street 42",
    companyName: "SoftLake Co",
    gender: "M",
  });
}

const getCols = (_more, col = []) => {
  if (_more) {
    return col.map((item = {}, index) => ({
      ...item,
      width: index === col.length - 1 ? undefined : item.width,
    }));
  }
  const shortCols = col.slice(0, 3);
  return shortCols.map((item = {}, index) => ({
    ...item,
    width: index === shortCols.length - 1 ? undefined : item.width,
  }));
};
const ResizableTable = () => {
  const [more, setMore] = useState(false);
  const cols = getCols(more, columns);
  console.log("cols :>> ", cols);
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns: cols,
  });
  return (
    <>
      <div>
        <h1>Hello!</h1>
        <div>
          <Button onClick={() => setMore(!more)}>
            {more ? "列变少" : "列变多"}
          </Button>
        </div>
        <ProTable
          columns={resizableColumns}
          components={components}
          dataSource={data}
          scroll={{ x: tableWidth }}
          toolBarRender={false}
          search={false}
        />
      </div>
    </>
  );
};

export default ResizableTable;
