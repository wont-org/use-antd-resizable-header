import ProTable from "@ant-design/pro-table";
import { Tooltip } from "antd";
import { useAntdResizableHeader } from "@wont/use-antd-resizable-header";

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
    hideInTable: true,
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

const ResizableTable = () => {
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns,
  });
  return (
    <>
      <div>
        <h1>Hello!</h1>
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
