import { useState, useEffect } from "react";
import { Button, Divider, List, Modal, Skeleton, Typography } from "antd";
import {
  useDeleteSourceSearchHistory,
  useGetSourceSearchHistory,
  useSourceFilters,
} from "../../hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { SourceSearchHistory } from "../../types";
import InfiniteScroll from "react-infinite-scroll-component";

export const SourceSearchHistoryList = () => {
  const { updateFilters } = useSourceFilters();
  const { mutate: deleteHistory } = useDeleteSourceSearchHistory();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<SourceSearchHistory[]>([]);

  const {
    data: response,
    isPending,
    isFetching,
  } = useGetSourceSearchHistory({ page, limit: 20 });

  // Update items when response changes
  useEffect(() => {
    if (response?.data) {
      setData((prevState) =>
        page === 1 ? response.data : [...prevState, ...response.data]
      );
    }
  }, [response, page]);

  const onClick = (value: string) => {
    updateFilters({
      search: value,
    });
  };

  const onDelete = (
    e: React.MouseEvent<HTMLElement>,
    history: SourceSearchHistory
  ) => {
    e.stopPropagation();

    return Modal.confirm({
      title: "Delete Search History",
      content: `Are you sure you want to delete "${history.value}" from history?`,
      onOk: () => deleteHistory(history.id),
      okText: "Delete",
      cancelText: "Cancel",
      centered: true,
    });
  };

  const onLoadMore = () => {
    if (isFetching || isPending) return;
    setPage((prevState) => prevState + 1);
  };

  const hasMore = data.length < (response?.total || 0);

  return (
    <div id="scrollableDiv" className="source-search-history-list">
      <InfiniteScroll
        dataLength={data.length}
        next={onLoadMore}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          size="small"
          rowKey="id"
          header={
            <Typography.Text className="p-16" strong>
              Search History
            </Typography.Text>
          }
          loading={isPending}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              onClick={() => onClick(item.value)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                description={<Typography.Text>{item.value}</Typography.Text>}
              />
              <Button
                size="small"
                shape="circle"
                onClick={(e) => onDelete(e, item)}
                type="text"
                icon={<DeleteOutlined />}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
