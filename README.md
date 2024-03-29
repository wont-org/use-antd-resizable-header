# @wont/use-antd-resizable-header

> extend from https://github.com/hemengke1997/use-antd-resizable-header, cause no one approval pull request and publish, details [#81 feat: custom dragRender](https://github.com/hemengke1997/use-antd-resizable-header/pull/81)

> antd 表格头拖拽 Hook，兼容 Table ProTable

## 预览

![preview](./screenshots/new_preview.gif)

## 在线地址

[Demo 基于antd-v4](https://codesandbox.io/p/devbox/use-antd-resizable-header-cv8vgv?file=%2Fsrc%2FApp.tsx%3A34%2C9)

## 安装

```sh
npm i @wont/use-antd-resizable-header
```

or

```sh
yarn add @wont/use-antd-resizable-header
```

or

```sh
pnpm add @wont/use-antd-resizable-header
```

## API

### Properties

| Name             | Type                                                      | Default        | Description                                                                      |
| ---------------- | --------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| columns          | <<ColumnType \| ProColumnType> & {resizable?: boolean}>[] | undefined      | 基于antd table/pro-table 的 columns扩展了**resizable: boolean**，false则不可拖拽 |
| defaultWidth     | number                                                    | 120            | 某一列不能拖动，设置该列的最小展示宽度，默认 120                                 |
| minConstraints   | number                                                    | 60             | 拖动最小宽度 默认 defaultWidth/2                                                 |
| maxConstraints   | number                                                    | Infinity       | 拖动最大宽度 默认无穷                                                            |
| cache            | boolean                                                   | true           | 是否缓存宽度，避免渲染重置拖拽宽度                                               |
| columnsState     | ColumnsStateType                                          | undefined      | 列状态的配置，可以用来操作列拖拽宽度                                             |
| onResizeStart    | Function                                                  | undefined      | 开始拖拽时触发                                                                   |
| onResizeEnd      | Function                                                  | undefined      | 结束拖拽时触发                                                                   |
| tooltipRender    | Function                                                  | undefined      | 使用tooltip渲染表格头，当表格头文字溢出时展示tooltip                             |
| dragRender       | ReactNode                                                 | svg左右拖动dom | 控制表头拖拽节点                                                                 |
| dragWrapperStyle | CSSProperties                                             | undefined      | dragRender的父元素内联样式                                                       |

### Return

| Name             | Description                             |
| ---------------- | --------------------------------------- |
| resizableColumns | 拖拽 columns，用在 Table columns        |
| components       | 拖拽 components， 用在 Table components |
| tableWidth       | 表格宽度，用在 Table width              |
| resetColumns     | 重置宽度方法                            |

## 注意事项

- **默认拖动颜色为`#000`，可通过`global`或设置 css 变量`--arh-color`设置颜色**
- **至少一列不能拖动（width 不设置即可），[请保持至少一列的自适应](https://ant-design.gitee.io/components/table-cn/#components-table-demo-fixed-columns)**
- **若 column 未传入`dataIndex`，请传入一个唯一的`key`，否则按照将按照 column 的序号 index 计算唯一 key**
- **若 column 有副作用，请把依赖项传入 useMemo deps 中**

## 封装ProTable和Table

> v4和v5一致，仓库中playground基于v5

[在线地址 基于antd-v4](https://codesandbox.io/p/devbox/use-antd-resizable-header-cv8vgv?file=%2Fsrc%2FApp.tsx%3A34%2C9)

```tsx
import {
  type ParamsType,
  type ProColumns,
  ProTable,
  type ProTableProps,
} from "@ant-design/pro-components";
import { useAntdResizableHeader } from "@wont/use-antd-resizable-header";
import { Table } from "antd";
import { ElementType } from "react";

type ColumnsState = Parameters<
  typeof useAntdResizableHeader
>["0"]["columnsState"];
export type AntdResizableTableColumns<DataType> = ProColumns<DataType> & {
  resizable?: boolean;
};

export type AntdResizableTableProps<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = "text",
> = Omit<ProTableProps<DataType, Params, ValueType>, "columns"> & {
  columns: AntdResizableTableColumns<DataType>[];
  tableType?: "ProTable" | "Table";
  persistenceKey?: string;
  columnsState?: ColumnsState;
};

export type AntdResizableTableComponent = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = "text",
>(
  props: AntdResizableTableProps<DataType, Params, ValueType>
) => JSX.Element;

const tableMap = {
  ProTable,
  Table,
};

const AntdResizableTable: AntdResizableTableComponent = (props) => {
  const {
    tableType = "ProTable",
    columns,
    columnsState,
    ...tableProps
  } = props;

  const Component = tableMap[tableType] as ElementType<
    (typeof tableMap)[typeof tableType]
  >;
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns,
    columnsState,
    minConstraints: 80,
  });
  return (
    <Component
      {...tableProps}
      components={components}
      columns={resizableColumns}
      scroll={{ x: tableWidth }}
    />
  );
};

export default AntdResizableTable;
```

## ProTable

```tsx
import ProTable from "@ant-design/pro-table";
import { useAntdResizableHeader } from "@wont/use-antd-resizable-header";
import { Button, Table, Tooltip } from "antd";

function App() {
  const columns: ColumnsType<object> = [];
  const { components, resizableColumns, tableWidth, resetColumns } =
    useAntdResizableHeader({
      columns: useMemo(() => columns, []),
      // 保存拖拽宽度至本地localStorage
      columnsState: {
        persistenceKey: "localKey",
        persistenceType: "localStorage",
      },
      tooltipRender: (props) => <Tooltip {...props} />,
    });

  const proColumns: ProColumns[] = [];
  const {
    components: proComponents,
    resizableColumns: proResizableColumns,
    tableWidth: proTableWidth,
    resetColumns: proResetColumns,
  } = useAntdResizableHeader({
    columns: useMemo(() => proColumns, []),
    tooltipRender: (props) => <Tooltip {...props} />,
  });

  return (
    <>
      <Table
        columns={resizableColumns}
        components={components}
        dataSource={data}
        scroll={{ x: tableWidth }}
      />
      <ProTable
        columns={proResizableColumns}
        components={proComponents}
        dataSource={data}
        scroll={{ x: proTableWidth }}
      />
      <Button onClick={() => resetColumns()}>重置宽度</Button>
    </>
  );
}
```

## Table

```tsx
import { useAntdResizableHeader } from "@wont/use-antd-resizable-header";
import { Space, Table, Tag } from "antd";
import React, { useReducer } from "react";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
];

const Example: React.FC = () => {
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [deps, setDeps] = useState(0);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
      ellipsis: true,
      render: (text) => (
        <a onClick={() => setDeps((t) => t + 1)}>
          {text}
          {deps}
        </a>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      ellipsis: true,
      width: 200,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: 200,
      ellipsis: true,
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "render",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a
            onClick={() => {
              forceRender();
              alert("render");
            }}
          >
            render
          </a>
        </Space>
      ),
    },
  ];

  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns: useMemo(() => columns, [deps]),
    minConstraints: 50,
  });

  return (
    <Table
      columns={resizableColumns}
      components={components}
      dataSource={data}
      scroll={{ x: tableWidth }}
    />
  );
};
```

## 为什么需要 React.useMemo ?

### 如果不使用 useMemo

#### 组件 render => columns 引用变化 => use-antd-resiable-header render => 组件 render => columns 引用变化···

## 不使用 useMemo

可以采用其他阻止 render 的方案，如: `columns` 是 prop 或 组件外常量

## Table 特殊处理

### filter 按钮溢出隐藏了

#### 解决方案

```css
.ant-table-filter-trigger {
  margin-inline: 0;
}
```

## ProTable 特殊处理

### fixed

[ProTable 默认会给 fixed 列添加宽度](https://github.com/ant-design/pro-components/blob/master/packages/table/src/utils/genProColumnToColumn.tsx#L115-L116)，所以可能会造成 `至少一列宽度为0` 的条件无法满足。

#### 解决方案

1. 手动给 fixed 列添加宽度，然后不设置其余某一个非 fixed 列宽度
2. 不设置 fixed 列宽度（默认 200），然后其余某一列也不设置宽度

## 本地开发

```bash
# 开发调试工具库
pnpm i

pnpm run dev

# 预览调试 playground
cd playground

pnpm i

pnpm run dev
```

## MIT

[LICENSE](https://github.com/wont-org/use-antd-resizable-header/blob/master/LICENSE)
