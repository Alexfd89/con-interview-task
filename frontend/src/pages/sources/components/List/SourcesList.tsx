import { useEffect, useState } from "react";
import { Alert, List } from "antd";
import { SourcesListItem } from "./SourcesListItem";
import { useSourceFilters, useGetSources } from "../../hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { Source } from "../../types";

export const SourcesList = () => {
  const { filters } = useSourceFilters();
  const [data, setData] = useState<Source[]>([]);
  const [page, setPage] = useState(1);
  const {
    isPending,
    isFetching,
    data: response,
    isError,
    error,
  } = useGetSources({ limit: 12, page, ...filters });

  useEffect(() => {
    if (filters.search) {
      setPage(1);
      setData([]); // Clear data only when a new search is initiated
    }
  }, [filters.search]);

  useEffect(() => {
    if (response?.data) {
      setData((prevState) =>
        page === 1 ? response.data : [...prevState, ...response.data]
      );
    }
  }, [response?.data, page]);

  const onLoadMore = () => {
    if (isFetching || isPending) return;
    setPage((prevState) => prevState + 1);
  };

  if (isError) {
    return <Alert message={error?.message} type="error" showIcon />;
  }

  const hasMore = data.length < (response?.total || 0);

  return (
    <div id="sources-list">
      <InfiniteScroll
        dataLength={data.length}
        next={onLoadMore}
        hasMore={hasMore}
        loader={null}
        scrollableTarget="sources-list"
      >
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
          dataSource={data}
          rowKey="id"
          renderItem={(source) => (
            <List.Item>
              <SourcesListItem {...source} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
