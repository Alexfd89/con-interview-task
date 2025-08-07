import { Alert, List } from "antd";
import { SourcesListItem } from "./SourcesListItem";
import { useSourceFilters, useGetSources } from "../../hooks";

export const SourcesList = () => {
  const { filters, updateFilters } = useSourceFilters();
  const { isPending, data: response, isError, error } = useGetSources(filters);

  const onPaginationChange = (page: number, pageSize?: number) => {
    updateFilters({
      limit: pageSize,
      page,
    });
  };

  if (isError) {
    return <Alert message={error?.message} type="error" showIcon />;
  }

  return (
    <List
      loading={isPending}
      grid={{
        gutter: 24,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      pagination={{
        pageSize: filters.limit,
        current: filters.page,
        onChange: onPaginationChange,
        pageSizeOptions: [8, 12, 16, 20],
        total: response?.total || 0,
      }}
      dataSource={response?.data}
      rowKey="id"
      renderItem={(source) => (
        <List.Item>
          <SourcesListItem {...source} />
        </List.Item>
      )}
    />
  );
};
