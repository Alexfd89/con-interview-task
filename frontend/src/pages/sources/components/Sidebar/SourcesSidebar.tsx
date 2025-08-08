import { Flex } from "antd";
import { SourcesSearchForm } from "./SourcesSearchForm";
import { SourceSearchHistoryList } from "./SourceSearchHistoryList";
import { Logo } from "../../../../components/Logo";

export const SourcesSidebar = () => {
  return (
    <Flex vertical>
      <div className="p-16">
        <Flex vertical gap={16}>
          <Logo />
          <SourcesSearchForm />
        </Flex>
      </div>
      <SourceSearchHistoryList />
    </Flex>
  );
};
