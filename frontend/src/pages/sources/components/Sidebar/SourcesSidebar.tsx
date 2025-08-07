import { Flex } from "antd";
import { SourcesSearchForm } from "./SourcesSearchForm";
import { SourceSearchHistoryList } from "./SourceSearchHistoryList";

export const SourcesSidebar = () => {
  return (
    <Flex vertical>
      <div className="p-24">
        <SourcesSearchForm />
      </div>
      <SourceSearchHistoryList />
    </Flex>
  );
};
