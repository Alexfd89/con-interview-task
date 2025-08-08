import { Layout } from "antd";
import { SourcesList } from "./components/List/SourcesList";
import { SourcesSidebar } from "./components/Sidebar/SourcesSidebar";
import "./Sources.css";

export const Sources = () => {
  return (
    <Layout hasSider>
      <Layout.Sider width={280} className="sources-sidebar">
        <SourcesSidebar />
      </Layout.Sider>
      <Layout.Content className="sources-container">
        <SourcesList />
      </Layout.Content>
    </Layout>
  );
};
